/**
 * Poster style catalogue.
 *
 * One entry per graphic-design movement. Each entry owns the full Imagen prompt
 * for that movement: medium, era, palette, composition, typographic treatment
 * and how the headline should sit in the frame.
 *
 * `prompt(text)` receives the headline so the exact wording is embedded in the
 * prompt (Imagen renders quoted text far more reliably than paraphrased text).
 */

export const HEADLINE = 'Apparently, the only place left without ads are books.';

/** Shorter variant for styles where dense lettering fights the aesthetic. */
export const HEADLINE_SHORT = 'The only place left without ads';

const TEXT_RULES = [
  'Render the headline exactly as quoted, correctly spelled, with no additional words,',
  'no lorem ipsum, no duplicated lines, no watermark, no signature, no logo.',
  'Keep all lettering fully inside the frame with generous margins.',
].join(' ');

/**
 * Every style renders the same sentence. The differences live in palette,
 * composition, ink behaviour and letterform choice — never in the copy.
 */
export const STYLES = [
  {
    id: 'art-nouveau',
    name: 'Art Nouveau',
    era: '1890s–1910s',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `An 1898 Art Nouveau lithographic poster in the manner of Alphonse Mucha.
A serene woman in flowing robes sits inside a tall whiplash-curve arch, absorbed in an open book;
poppies, ivy and lily stems grow out of the pages and coil up into the frame.
A decorative mosaic halo circles her head. Ornate border of tendrils and organic curves.
Hand-lettered display type with swelling stems and floral terminals reads "${t}",
set across the arch above her and a lower cartouche panel.
Palette: sage green, ochre, dusty rose, deep plum, cream paper, thin gold outlines.
Flat colour separations, visible litho stone grain, soft aged paper texture.
Decorative, romantic, nature-inspired. ${TEXT_RULES}`,
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    era: '1920s–1930s',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `A 1929 Art Deco luxury poster, sharp bilateral symmetry, machine-age streamlining.
A stylised figure in a long coat holds an open book at the centre of a stepped ziggurat plinth,
gilded sunburst rays fanning behind, zig-zag chevrons and speed lines running to the edges.
Metallic bronze and champagne gold on deep midnight blue and black, thin cream keylines.
Headline set in a tall geometric high-waisted Deco sans with wide letter spacing, reading "${t}",
stacked in a symmetrical block inside a gold rule frame.
Airbrushed gradients, lacquer sheen, glamorous high-end travel-poster feel. ${TEXT_RULES}`,
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    era: '1919–1933',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `A Bauhaus school poster, form follows function.
Composition built from pure geometric primitives: a large red circle, a blue square,
a yellow triangle and a black bar, arranged asymmetrically on warm off-white paper.
An open book abstracted into two tilted rectangles sits under the circle.
Flat colour, no gradients, no shading, hard mathematical edges, thin black rules dividing the field.
Headline set in a clean geometric sans-serif, lowercase, tight and rational, reading "${t}",
aligned to the underlying grid, one line breaking across the coloured shapes.
Primary red, primary blue, primary yellow, black, off-white. Functional, balanced, minimalist. ${TEXT_RULES}`,
  },
  {
    id: 'constructivism',
    name: 'Constructivism',
    era: '1915–1930s',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `A Russian Constructivist agitprop poster in the manner of Rodchenko and El Lissitzky.
Aggressive diagonal composition: a hard-edged black wedge cuts across a scarlet red field on cream stock.
Grainy high-contrast duotone photomontage of a hand thrusting an open book upward,
fragments of newsprint and a megaphone cropped into the wedge. Industrial rules, arrows, circles.
Headline set in a heavy condensed grotesque, some words reversed out of red blocks,
running on a steep 30-degree diagonal, reading "${t}".
Palette strictly red, black and cream, coarse halftone screen, offset misprint edges.
Revolutionary, structural, dynamic. ${TEXT_RULES}`,
  },
  {
    id: 'de-stijl',
    name: 'De Stijl',
    era: '1917–1930s',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `A De Stijl poster, extreme geometric reduction in the manner of Piet Mondrian and Theo van Doesburg.
The whole surface is divided by thick black horizontal and vertical rules only — no diagonals, no curves.
Rectangular cells filled with flat primary red, primary blue, primary yellow and white,
one narrow cell holding a book reduced to a plain white rectangle with a single black spine line.
Headline lettering in a strict rectilinear sans built from horizontal and vertical strokes,
placed inside its own white cells, reading "${t}".
Pure abstraction, strict order, absolutely flat colour, no texture, no shadow. ${TEXT_RULES}`,
  },
  {
    id: 'dadaism',
    name: 'Dadaism',
    era: '1916–1920s',
    group: 'Classics & Early Modern',
    aspectRatio: '3:4',
    prompt: (t) => `A Dada anti-art collage poster in the manner of Hannah Höch and Raoul Hausmann.
Chaotic cut-and-paste photomontage: torn newspaper columns, an eye, a clock face, a gramophone horn
and a book sliced apart and reassembled at absurd angles on stained paper.
Ransom-note typography — every word in a different typeface, weight and size,
some letters upside down, some rotated 90 degrees, glued at random baselines, reading "${t}".
Visible scissor edges, paste wrinkles, ink smudges, rubber-stamp marks, coffee stain.
Muted newsprint grey and sepia with two shocks of red. Rebellious, raw, absurd. ${TEXT_RULES}`,
  },
  {
    id: 'swiss-international',
    name: 'Swiss / International Typographic Style',
    era: '1950s–1970s',
    group: 'Mid-Century & Post-War',
    aspectRatio: '3:4',
    prompt: (t) => `A Swiss International Typographic Style poster, Müller-Brockmann discipline.
Strict mathematical grid, asymmetric balance, enormous calm white space.
One objective black-and-white photograph, cropped square and hard: an open book on a plain surface,
placed low-left on the grid. A single thin red rule and a small red square as the only accents.
Headline set flush-left, ragged-right in Helvetica, tight leading, no ornament, reading "${t}",
occupying the upper third with clear hierarchy and generous margins.
Neutral white paper, pure black type, one red accent. Ultra-clean, objective, timeless. ${TEXT_RULES}`,
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    era: '1950s–1970s',
    group: 'Mid-Century & Post-War',
    aspectRatio: '3:4',
    prompt: (t) => `A Pop Art comic-book poster in the manner of Roy Lichtenstein.
Thick black outlines, flat saturated primaries, and a visible Ben-Day dot halftone over every colour field.
A woman in the style of a 1960s romance comic looks up from a book she is reading,
a bold white speech balloon with a heavy black outline carrying the line "${t}"
in hand-inked comic capitals across the top of the frame.
Cyan sky, screaming yellow, primary red, thick black keyline art, printed-on-newsprint dot texture,
slight off-register colour. Playful, ironic, loud, mass-media. ${TEXT_RULES}`,
  },
  {
    id: 'psychedelic',
    name: 'Psychedelic / 60s Hippie',
    era: '1960s–1970s',
    group: 'Mid-Century & Post-War',
    aspectRatio: '3:4',
    prompt: (t) => `A 1967 Fillmore psychedelic concert poster in the manner of Wes Wilson and Victor Moscoso.
Hand-drawn melting, bulging, liquid lettering fills nearly the entire surface, letters warped to
follow flame-like contours, tightly interlocked so the words become the image, reading "${t}".
Vibrating high-contrast complementary colours — magenta against lime, orange against turquoise —
so the edges shimmer. Kaleidoscopic mandala of open books radiating outward, optical illusion swirls,
paisley and flowing floral fluid graphics filling every gap.
Trippy, surreal, screen-printed on textured stock. ${TEXT_RULES}`,
  },
  {
    id: 'mid-century-modern',
    name: 'Mid-Century Modern',
    era: '1950s–1960s',
    group: 'Mid-Century & Post-War',
    aspectRatio: '3:4',
    prompt: (t) => `A 1957 American advertising poster in warm Mid-Century Modern style.
Flat vector shapes with slightly rough screen-printed edges. A whimsical long-limbed character with a
simplified oval head sits cross-legged reading a book, drawn in charming retro illustration style.
Atomic starbursts, boomerang shapes, thin kinked antenna lines and scattered small stars around them.
Palette: mustard yellow, teal, burnt orange, warm cream, chocolate brown, with paper-grain texture.
Headline in a friendly retro sans with a hand-drawn script accent word, reading "${t}",
set across the top with an underline swash. Warm vintage, optimistic, whimsical. ${TEXT_RULES}`,
  },
  {
    id: 'punk-grunge',
    name: 'Punk & Grunge',
    era: '1970s–1990s',
    group: 'Late 20th Century & Counter-Culture',
    aspectRatio: '3:4',
    prompt: (t) => `A DIY punk zine poster, third-generation photocopy.
Blown-out high-contrast xerox halftone of a book held up like a protest placard,
toner streaks, dust specks, black scan edges and a crooked photocopier shadow along one side.
Torn paper strips taped and stapled onto the surface, staple marks visible.
Ransom-note headline cut from magazines — mismatched letters, uneven baselines, some inked over,
reading "${t}". Hand-scrawled marker annotations and a spray-paint stencil smudge.
Black toner on grubby off-white paper with one hit of fluorescent pink.
Anti-establishment, chaotic, underground. ${TEXT_RULES}`,
  },
  {
    id: 'memphis',
    name: 'Memphis Design',
    era: '1980s',
    group: 'Late 20th Century & Counter-Culture',
    aspectRatio: '3:4',
    prompt: (t) => `A Memphis Group poster, 1985 Milan, Ettore Sottsass energy.
Scattered playful geometry on a mint background: black squiggle lines, confetti dashes,
terrazzo speckle blocks, half-circles, chequerboard strips and a tilted zig-zag column.
A stack of books rendered as flat pastel slabs balanced at a jaunty angle in the centre.
Palette: bubblegum pink, mint, lemon, cobalt, black and white, deliberately clashing.
Headline in a chunky playful sans, words at slightly different angles and sizes, reading "${t}".
Fun, funky, retro-80s, rule-breaking, absolutely flat colour. ${TEXT_RULES}`,
  },
  {
    id: 'swiss-punk',
    name: 'Swiss Punk / New Wave',
    era: '1970s–1980s',
    group: 'Late 20th Century & Counter-Culture',
    aspectRatio: '3:4',
    prompt: (t) => `A Swiss Punk / New Wave poster in the manner of Wolfgang Weingart and April Greiman.
The Swiss grid is present but violated: text steps down in staggered blocks, lines shift off-axis,
words are set with extremely wide letter tracking and interrupted by heavy black bars and hairline rules.
Layered coarse halftone screens overlap in transparency, a photocopied book fragment repeated
at three scales and rotated, registration marks and crop marks left visible.
Headline broken across levels, some words reversed out of black, reading "${t}".
Black and warm grey with one fluorescent orange, printed on off-white. Experimental, structured chaos. ${TEXT_RULES}`,
  },
  {
    id: 'neo-brutalism',
    name: 'Brutalism & Neo-Brutalism',
    era: 'Contemporary',
    group: 'Modern & Digital',
    aspectRatio: '3:4',
    prompt: (t) => `A neo-brutalist web-native poster.
Raw utilitarian layout of stacked rectangular panels, every panel outlined in a hard 6px black stroke
with a blunt solid offset drop shadow, no rounded corners, no gradients.
Flat blocks of acid yellow, electric blue and pure white on a light grey field.
A book drawn as a crude flat black-outlined shape sits inside one panel like a placeholder image.
Headline in a heavy unpolished monospace, oversized, cramped against the panel edges, reading "${t}",
with a smaller monospace caption line and a black tag chip. High contrast, deliberately unrefined,
bold and unapologetic. ${TEXT_RULES}`,
  },
  {
    id: 'y2k-acid',
    name: 'Y2K / Acid Graphics',
    era: 'Late 1990s–2000s',
    group: 'Modern & Digital',
    aspectRatio: '3:4',
    prompt: (t) => `A Y2K acid-graphics poster, late-90s cyber futurism.
Liquid chrome 3D lettering with mirror-polished reflections and rainbow edge refraction spells "${t}",
warped along a curve, floating over a dark violet gradient-mesh void.
Tribal vector flame shapes, spinning CD sheen, wireframe grid horizon, lens flares and star glints.
A book rendered as a glossy chrome object with iridescent liquid-metal pages.
Palette: chrome silver, cyber purple, cyan, hot magenta, holographic oil-slick highlights.
Rave-flyer energy, sci-fi gloss, cyber-nostalgia. ${TEXT_RULES}`,
  },
  {
    id: 'minimalist',
    name: 'Minimalist / Geominimalism',
    era: 'Contemporary',
    group: 'Modern & Digital',
    aspectRatio: '3:4',
    prompt: (t) => `An ultra-minimal gallery poster.
Vast empty warm-white field, roughly ninety percent negative space.
A single small focal element sits slightly above centre: a book reduced to one thin black rectangle
with a single hairline for the spine, and one small solid ochre dot beside it.
Headline set very small in a refined sans-serif, one quiet line, flush left in the lower-left corner,
reading "${t}", with a tiny caption line beneath in light grey.
No ornament, no texture, no illustration, no border. Museum-grade, premium, calm, precise. ${TEXT_RULES}`,
  },
  {
    id: 'risograph',
    name: 'Risograph / Halftone Print',
    era: 'Contemporary',
    group: 'Modern & Digital',
    aspectRatio: '3:4',
    prompt: (t) => `A two-colour risograph print poster on textured recycled paper.
Only fluorescent pink and medium blue soy ink, overprinting into a muddy purple where they cross.
Coarse dithered halftone dots everywhere, deliberate off-register misalignment of two to three
millimetres so the layers slip apart at the edges, ink roller streaks and small blotchy patches.
A hand-drawn open book with radiating lines, screened at 40 percent so the paper fibre shows through.
Headline in a chunky friendly sans, printed slightly out of register with a pink ghost edge,
reading "${t}". Indie, artisanal, tactile, physical print. ${TEXT_RULES}`,
  },
  {
    id: 'typographic-kinetic',
    name: 'Typographic / Kinetic Poster',
    era: 'Contemporary',
    group: 'Modern & Digital',
    aspectRatio: '3:4',
    prompt: (t) => `A pure typographic poster — type is the only image, no illustration and no photography.
The sentence "${t}" fills the entire frame: words stacked in tight grid-locked rows,
scale contrast pushed to extremes so one word runs edge to edge in a colossal heavy grotesque
while the rest are set small and dense beneath it. Lines are justified hard to both margins,
letterforms stretched, condensed and slightly warped as if in motion, one word rotated vertically
along the right edge, another blurred into a kinetic repeat.
Pure black type on a bone-white ground with a single vivid vermilion word.
High-impact, conceptual, graphic-heavy. ${TEXT_RULES}`,
  },
];

export const STYLE_IDS = STYLES.map((s) => s.id);

export function getStyles(ids) {
  if (!ids || ids === 'all') return STYLES;
  const wanted = String(ids)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const unknown = wanted.filter((id) => !STYLE_IDS.includes(id));
  if (unknown.length) {
    throw new Error(
      `Unknown style id(s): ${unknown.join(', ')}\nAvailable: ${STYLE_IDS.join(', ')}`,
    );
  }
  return STYLES.filter((s) => wanted.includes(s.id));
}
