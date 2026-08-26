# Poster set — one line, eighteen design movements

Takes a single line of copy —

> Apparently, the only place left without ads are books.

— and generates it as a poster in each of eighteen graphic-design movements via the
**Google Vertex AI Imagen API**.

## Quick start

```bash
# 1. one-time GCP setup
gcloud services enable aiplatform.googleapis.com --project <PROJECT_ID>
export GOOGLE_ACCESS_TOKEN=$(gcloud auth print-access-token)
export GOOGLE_CLOUD_PROJECT=<PROJECT_ID>

# 2. see the prompts without spending anything
npm run posters:dry

# 3. generate all eighteen
npm run posters

# 4. open the contact sheet
open output/posters/index.html
```

Output lands in `output/posters/` (git-ignored): one PNG per style, a
`<style>.prompt.txt` beside it, a `manifest.json`, and an `index.html` gallery.

## Auth

First match wins:

| Method | How |
| --- | --- |
| OAuth token | `export GOOGLE_ACCESS_TOKEN=$(gcloud auth print-access-token)` |
| Service account | `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json` (JWT is signed locally, no deps) |
| gcloud fallback | `gcloud auth application-default login`, then just run the script |
| Express mode | `export VERTEX_API_KEY=<key>` — project-less, uses the global endpoint |

The service account needs `roles/aiplatform.user`.

## Options

```
--project <id>       GCP project id            (env GOOGLE_CLOUD_PROJECT)
--location <region>  Vertex region             (default us-central1)
--model <id>         Imagen model              (default imagen-4.0-generate-001)
--styles <ids|all>   Comma-separated style ids (default all)
--text "<line>"      Headline copy             (default the books line)
--out <dir>          Output directory          (default output/posters)
--samples <n>        Images per style          (default 1, ultra forces 1)
--aspect <ratio>     Override aspect ratio     (default 3:4)
--seed <n>           Deterministic seed        (disables SynthID watermark)
--concurrency <n>    Parallel requests         (default 3)
--negative-prompt    Send negative prompts     (imagen-3-era models only)
--force              Regenerate existing files
--dry-run            Write prompts, call nothing
```

Runs are resumable: a style that already has a PNG is skipped unless `--force`
is passed, so a partial failure costs only the styles that failed.

Model options: `imagen-4.0-fast-generate-001` (cheap drafts),
`imagen-4.0-generate-001` (default), `imagen-4.0-ultra-generate-001` (best type
rendering, one image per call).

## Styles

| id | movement | era |
| --- | --- | --- |
| `art-nouveau` | Art Nouveau | 1890s–1910s |
| `art-deco` | Art Deco | 1920s–1930s |
| `bauhaus` | Bauhaus | 1919–1933 |
| `constructivism` | Constructivism | 1915–1930s |
| `de-stijl` | De Stijl | 1917–1930s |
| `dadaism` | Dadaism | 1916–1920s |
| `swiss-international` | Swiss / International Typographic Style | 1950s–1970s |
| `pop-art` | Pop Art | 1950s–1970s |
| `psychedelic` | Psychedelic / 60s Hippie | 1960s–1970s |
| `mid-century-modern` | Mid-Century Modern | 1950s–1960s |
| `punk-grunge` | Punk & Grunge | 1970s–1990s |
| `memphis` | Memphis Design | 1980s |
| `swiss-punk` | Swiss Punk / New Wave | 1970s–1980s |
| `neo-brutalism` | Brutalism & Neo-Brutalism | contemporary |
| `y2k-acid` | Y2K / Acid Graphics | late 1990s–2000s |
| `minimalist` | Minimalist / Geominimalism | contemporary |
| `risograph` | Risograph / Halftone Print | contemporary |
| `typographic-kinetic` | Typographic / Kinetic Poster | contemporary |

Edit any prompt in `styles.mjs` — each style owns its palette, composition and
typographic treatment in one place.

## Notes on rendering the line

- The headline is quoted verbatim inside every prompt; Imagen is markedly better
  at text it is asked to reproduce exactly than at text it has to infer.
- A nine-word sentence is at the upper end of what Imagen sets cleanly. If a
  render garbles letterforms, either re-roll (each call differs), switch to
  `imagen-4.0-ultra-generate-001`, or shorten with
  `--text "The only place left without ads"`.
- `negativePrompt` was removed from `imagen-3.0-generate-002` onward, so the
  "no extra words, no watermark, no signature" guidance is folded into the prompt
  body instead of a separate field.
- `--seed` pins composition for comparable re-runs; Vertex rejects a seed while
  watermarking is on, so the script turns `addWatermark` off alongside it.
