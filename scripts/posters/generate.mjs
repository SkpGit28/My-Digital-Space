#!/usr/bin/env node
/**
 * Generate one poster per graphic-design movement from a single line of copy,
 * using the Google Vertex AI Imagen API.
 *
 * Zero npm dependencies: plain fetch + node:crypto for service-account auth.
 *
 *   node scripts/posters/generate.mjs --project my-gcp-project
 *   node scripts/posters/generate.mjs --styles bauhaus,swiss-international
 *   node scripts/posters/generate.mjs --dry-run          # write prompts, call nothing
 *
 * Auth, first match wins:
 *   1. GOOGLE_ACCESS_TOKEN            an OAuth token you already have
 *   2. GOOGLE_APPLICATION_CREDENTIALS path to a service-account JSON key
 *   3. `gcloud auth print-access-token`
 *   4. VERTEX_API_KEY                 Vertex AI express mode API key
 */

import { createSign } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { HEADLINE, STYLE_IDS, getStyles } from './styles.mjs';

const SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

/* ------------------------------------------------------------------ args */

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      args._.push(token);
      continue;
    }
    const [flag, inline] = token.slice(2).split(/=(.*)/s);
    const next = argv[i + 1];
    if (inline !== undefined) {
      args[flag] = inline;
    } else if (next && !next.startsWith('--')) {
      args[flag] = next;
      i += 1;
    } else {
      args[flag] = true;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  console.log(`
Poster generator — Vertex AI Imagen

  --project <id>       GCP project id            (env GOOGLE_CLOUD_PROJECT)
  --location <region>  Vertex region             (default us-central1)
  --model <id>         Imagen model              (default imagen-4.0-generate-001)
  --styles <ids|all>   Comma-separated style ids (default all)
  --text "<line>"      Headline copy             (default the books line)
  --out <dir>          Output directory          (default output/posters)
  --samples <n>        Images per style          (default 1, ultra forces 1)
  --aspect <ratio>     Override aspect ratio     (default per style, 3:4)
  --seed <n>           Deterministic seed        (disables watermark)
  --concurrency <n>    Parallel requests         (default 3)
  --negative-prompt    Send each style's negative prompt (imagen-3 era only)
  --force              Regenerate styles that already have an image
  --dry-run            Write prompts + manifest, make no API calls

Styles: ${STYLE_IDS.join(', ')}
`);
  process.exit(0);
}

const CONFIG = {
  project: args.project || process.env.GOOGLE_CLOUD_PROJECT || process.env.VERTEX_PROJECT_ID,
  location: args.location || process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
  model: args.model || 'imagen-4.0-generate-001',
  text: typeof args.text === 'string' ? args.text : HEADLINE,
  outDir: path.resolve(args.out || 'output/posters'),
  samples: Number(args.samples || 1),
  aspect: typeof args.aspect === 'string' ? args.aspect : null,
  seed: args.seed !== undefined ? Number(args.seed) : null,
  concurrency: Math.max(1, Number(args.concurrency || 3)),
  dryRun: Boolean(args['dry-run']),
  force: Boolean(args.force),
};

if (CONFIG.model.includes('ultra') && CONFIG.samples > 1) {
  console.warn('! ultra models return a single image per request — forcing --samples 1');
  CONFIG.samples = 1;
}

let styles;
try {
  styles = getStyles(args.styles);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

/* ------------------------------------------------------------------ auth */

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

/** Sign a JWT with a service-account key and trade it for an access token. */
async function tokenFromServiceAccount(keyPath) {
  const key = JSON.parse(await readFile(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: SCOPE,
    aud: key.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(
    JSON.stringify(claim),
  )}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64url');

  const res = await fetch(claim.aud, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Service-account token exchange failed (${res.status}): ${await res.text()}`);
  }
  const { access_token: accessToken } = await res.json();
  return { kind: 'service-account', token: accessToken, project: key.project_id };
}

async function resolveAuth() {
  if (process.env.GOOGLE_ACCESS_TOKEN) {
    return { kind: 'access-token', token: process.env.GOOGLE_ACCESS_TOKEN };
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return tokenFromServiceAccount(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }
  try {
    const token = execFileSync('gcloud', ['auth', 'print-access-token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (token) return { kind: 'gcloud', token };
  } catch {
    /* gcloud missing or not logged in — fall through */
  }
  if (process.env.VERTEX_API_KEY) {
    return { kind: 'api-key', apiKey: process.env.VERTEX_API_KEY };
  }
  throw new Error(
    [
      'No Google credentials found. Use one of:',
      '  export GOOGLE_ACCESS_TOKEN=$(gcloud auth print-access-token)',
      '  export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json',
      '  gcloud auth application-default login   (then re-run)',
      '  export VERTEX_API_KEY=<Vertex AI express-mode key>',
    ].join('\n'),
  );
}

function endpointFor(auth) {
  if (auth.kind === 'api-key') {
    // Express mode is global and project-less.
    return `https://aiplatform.googleapis.com/v1/publishers/google/models/${CONFIG.model}:predict`;
  }
  const project = CONFIG.project || auth.project;
  if (!project) {
    throw new Error('Missing project id — pass --project or set GOOGLE_CLOUD_PROJECT.');
  }
  return (
    `https://${CONFIG.location}-aiplatform.googleapis.com/v1/projects/${project}` +
    `/locations/${CONFIG.location}/publishers/google/models/${CONFIG.model}:predict`
  );
}

/* ------------------------------------------------------------- generation */

function parametersFor(style) {
  const parameters = {
    sampleCount: CONFIG.samples,
    aspectRatio: CONFIG.aspect || style.aspectRatio || '3:4',
    personGeneration: 'allow_adult',
    safetySetting: 'block_medium_and_above',
    outputOptions: { mimeType: 'image/png' },
    // A seed pins the composition so re-runs are comparable; Imagen rejects
    // seeds while SynthID watermarking is on, so the two move together.
    ...(CONFIG.seed !== null ? { seed: CONFIG.seed, addWatermark: false } : {}),
    // negativePrompt was dropped from imagen-3.0-generate-002 onward, so it is
    // opt-in; the "avoid" guidance lives inside each prompt instead.
    ...(args['negative-prompt'] && style.negativePrompt
      ? { negativePrompt: style.negativePrompt }
      : {}),
  };
  return parameters;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function predict(endpoint, auth, body, attempt = 1) {
  const headers = { 'content-type': 'application/json' };
  if (auth.kind === 'api-key') headers['x-goog-api-key'] = auth.apiKey;
  else headers.authorization = `Bearer ${auth.token}`;

  const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) });
  if (res.ok) return res.json();

  const detail = await res.text();
  const retryable = res.status === 429 || res.status >= 500;
  if (retryable && attempt <= 4) {
    const wait = 2000 * 2 ** (attempt - 1);
    console.warn(`  retry ${attempt}/4 after ${res.status} — waiting ${wait / 1000}s`);
    await sleep(wait);
    return predict(endpoint, auth, body, attempt + 1);
  }
  throw new Error(`Vertex AI returned ${res.status}: ${detail.slice(0, 600)}`);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function fileFor(style, index) {
  const suffix = CONFIG.samples > 1 ? `-${index + 1}` : '';
  return path.join(CONFIG.outDir, `${style.id}${suffix}.png`);
}

async function runStyle(style, endpoint, auth) {
  const prompt = style.prompt(CONFIG.text);
  const record = {
    id: style.id,
    name: style.name,
    era: style.era,
    group: style.group,
    headline: CONFIG.text,
    model: CONFIG.model,
    aspectRatio: CONFIG.aspect || style.aspectRatio || '3:4',
    prompt,
    files: [],
    status: 'pending',
  };

  await writeFile(path.join(CONFIG.outDir, `${style.id}.prompt.txt`), `${prompt}\n`, 'utf8');

  if (CONFIG.dryRun) {
    record.status = 'dry-run';
    console.log(`· ${style.name} — prompt written (${prompt.length} chars)`);
    return record;
  }

  const first = fileFor(style, 0);
  if (!CONFIG.force && (await exists(first))) {
    record.status = 'skipped';
    record.files = [path.relative(CONFIG.outDir, first)];
    console.log(`· ${style.name} — already generated, skipping (use --force to redo)`);
    return record;
  }

  const started = Date.now();
  const response = await predict(endpoint, auth, {
    instances: [{ prompt }],
    parameters: parametersFor(style),
  });

  const predictions = response.predictions || [];
  if (!predictions.length) {
    record.status = 'empty';
    record.error = response.error?.message || 'No predictions returned (likely a safety filter).';
    console.warn(`✗ ${style.name} — ${record.error}`);
    return record;
  }

  for (const [index, prediction] of predictions.entries()) {
    const file = fileFor(style, index);
    await writeFile(file, Buffer.from(prediction.bytesBase64Encoded, 'base64'));
    record.files.push(path.basename(file));
  }
  record.status = 'ok';
  record.elapsedMs = Date.now() - started;
  console.log(`✓ ${style.name} — ${record.files.join(', ')} (${(record.elapsedMs / 1000).toFixed(1)}s)`);
  return record;
}

/** Small worker pool so a full run does not fire 18 requests at once. */
async function pool(items, size, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(size, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        results[index] = {
          id: items[index].id,
          name: items[index].name,
          status: 'error',
          error: error.message,
        };
        console.error(`✗ ${items[index].name} — ${error.message}`);
      }
    }
  });
  await Promise.all(runners);
  return results;
}

/* ---------------------------------------------------------------- gallery */

function galleryHtml(manifest) {
  const cards = manifest.posters
    .map((poster) => {
      const image = poster.files?.[0]
        ? `<img src="${poster.files[0]}" alt="${poster.name} poster">`
        : `<div class="missing">${poster.status}${poster.error ? `: ${poster.error}` : ''}</div>`;
      return `    <figure>
      ${image}
      <figcaption><strong>${poster.name}</strong><span>${poster.era}</span></figcaption>
    </figure>`;
    })
    .join('\n');

  return `<!doctype html>
<meta charset="utf-8">
<title>Poster set — ${manifest.headline}</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 48px clamp(16px, 4vw, 64px); font: 15px/1.5 ui-sans-serif, system-ui, sans-serif; }
  h1 { font-size: clamp(20px, 3vw, 32px); font-weight: 600; margin: 0 0 4px; max-width: 20ch; }
  p.meta { margin: 0 0 40px; opacity: .6; }
  .grid { display: grid; gap: 32px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  figure { margin: 0; }
  img { width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: 4px; display: block; }
  .missing { width: 100%; aspect-ratio: 3/4; display: grid; place-items: center; border: 1px dashed currentColor; border-radius: 4px; opacity: .5; text-align: center; padding: 12px; }
  figcaption { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; font-size: 13px; }
  figcaption span { opacity: .55; }
</style>
<h1>${manifest.headline}</h1>
<p class="meta">${manifest.posters.length} styles · ${manifest.model} · ${manifest.generatedAt}</p>
<div class="grid">
${cards}
</div>
`;
}

/* ------------------------------------------------------------------- main */

async function main() {
  await mkdir(CONFIG.outDir, { recursive: true });

  let auth = null;
  let endpoint = null;
  if (!CONFIG.dryRun) {
    auth = await resolveAuth();
    endpoint = endpointFor(auth);
    console.log(`auth: ${auth.kind} · model: ${CONFIG.model} · region: ${CONFIG.location}`);
  } else {
    console.log('dry run — no API calls, writing prompts only');
  }
  console.log(`headline: "${CONFIG.text}"`);
  console.log(`styles: ${styles.length} → ${CONFIG.outDir}\n`);

  const posters = await pool(styles, CONFIG.concurrency, (style) =>
    runStyle(style, endpoint, auth),
  );

  const manifest = {
    headline: CONFIG.text,
    model: CONFIG.model,
    location: CONFIG.location,
    aspectRatio: CONFIG.aspect || '3:4 (per style)',
    seed: CONFIG.seed,
    generatedAt: new Date().toISOString(),
    posters,
  };
  await writeFile(
    path.join(CONFIG.outDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  await writeFile(path.join(CONFIG.outDir, 'index.html'), galleryHtml(manifest), 'utf8');

  const tally = posters.reduce((acc, poster) => {
    acc[poster.status] = (acc[poster.status] || 0) + 1;
    return acc;
  }, {});
  console.log(
    `\n${Object.entries(tally)
      .map(([status, count]) => `${count} ${status}`)
      .join(' · ')}`,
  );
  console.log(`gallery: ${path.join(CONFIG.outDir, 'index.html')}`);

  if (posters.some((poster) => poster.status === 'error')) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
