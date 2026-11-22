# Handoff: Hamza Tinwala playable portfolio

For the next Claude session, which can use Claude in Chrome. Read this whole file before you change anything.

- **Live:** https://kaalpanikh.github.io/hamza-tinwala-portfolio/ (the work list is at `#work`)
- **Repo:** https://github.com/kaalpanikh/hamza-tinwala-portfolio, branch `main`. A push to `main` runs `.github/workflows/pages.yml` and deploys in about 1 minute.
- **Owner:** the portfolio is for Hamza Tinwala (copywriter), built by a friend. Contact: hamzatinwala@gmail.com, https://www.linkedin.com/in/hamza-tinwala/

## What the site is

One self-contained file, `index.html` (about 1,270 lines: CSS, HTML and JS, with no build step and no dependencies apart from Google Fonts). The flow:

1. **Gate.** The "PORTFOLIO / Episode XIII" lockup, a **Press start** button and the **Just show me the work** link.
2. **Intro.** A cyan pre-line ("Not so long ago, in an agency…"), the logo zoom, then a perspective text crawl in the style of a space-opera film opening. The crawl text is the client's own copy, verbatim from the brief. **Skip intro** is always available. With `prefers-reduced-motion`, the crawl is shown flat and still with a Continue button.
3. **Clock wipe** into the **character select**: 5 stick figures (Gamer, Biker, Reader, Movie goer, Chronically online), each with a +1/−1 stat. The Biker moves faster in game; the Movie goer can interact from further away.
4. **Bar wipe** into a **top-down pixel dungeon** drawn on a 320×176 canvas (16px tiles, 20×11 grid). There are 7 rooms; you walk with arrows or WASD and interact with E or Space. Objects open a dialogue with links. A HUD with a minimap shows found rooms; clicking a found room on the map travels there.
5. **Quick index** (`#work`): the reading surface for recruiters, with sentence case in Barlow. It opens from the gate, the HUD "All work" button, the skip link and the URL hash.

Rooms (the `ROOMS` object, about line 440): r1 Welcome (the "Who am I?" lectern and 4 stat pedestals), r2 JM Financial (brief, a chest of 19 posts, 5 social totems), r3 Vitrina (4 LinkedIn easels), r4 Sachin Parikh (6 posts), r5 Launches (Samsung S25, BlinkTrade Pro, Foot Locker), r6 Content Writing (Pedigree, Cesar, DHAM shelves), r7 Advertising (McCain and Kotak811 billboards, plus the "The End?" arcade machine with contact and replay).

## Where things are in `index.html`

| What | Where (approximate line) |
|---|---|
| Design tokens (colour, type, 4px space scale) | `:root` at the top of `<style>` |
| Hallmark stamp, waivers and "answered" notes | the first comment lines of `<style>`. **Keep them; the linter reads them** |
| `CONTACT` (email, linkedin, resume) | ~402. `resume` is empty: set a PDF URL to show a button |
| `JM_POSTS`, `VIT`, `BRIEF`, `ROOMS`, `HEROES` | ~404–525: all copy and links |
| `Snd`, a small synth with no audio files | ~528 |
| `drawHero` (pixel sprites) and `OBJ` (object drawers) | ~616, ~852 |
| Intro: `startIntro`, `runCrawl`, `endIntro`, `wipe` | ~693–760 |
| Game: `buildRooms`, `renderBg`, `enterRoom`, `startGame`, `update`, `drawRoom` | ~805–1215 |
| Dialogue: `openDlg`, `finishText`, `linkHTML`, `contactLinks` | ~998–1050 |
| Quick index: `buildIndex`, `openIndex`, `closeIndex`, focus trap | ~1219+ |
| Dev hook | append `?dev` to the URL to get `window.__dev = { G, enterRoom, ROOMS, openDlg }`. Example: `__dev.enterRoom('r5'); __dev.G.p.x = 160; __dev.G.p.y = 120` |

**Pre-rendered HTML:** `#ix-rooms` and `#ix-contact` contain a static copy of the work list, so it shows without JavaScript and search engines can read it. After **any** change to `ROOMS`, `CONTACT` or `buildIndex`, run `node tools/prerender.js`; the file explains its own setup.

## Quality status (as of this handoff)

The site was audited with **Impeccable** (github.com/pbakaus/impeccable) and **Hallmark** (github.com/nutlope/hallmark), plus an independent design critique:

- **Hallmark `sloplint --render`:** 152 FAIL / 40 REFLEX before, **0 FAIL / 0 REFLEX** now. Recorded on purpose: waive 37 (Barlow and Barlow Condensed are one superfamily); answered F22 (the crawl is justified like the film, with hyphenation off on purpose); answered F4; answered for the hard pixel shadows (the arcade material the brief chose).
- **Impeccable `detect`:** 1 advisory left, the hard-offset shadow, which is intentional.
- **Critique (Impeccable rubric, Nielsen):** 25/36 before fixes. Fixed since: speed and reach, map travel, crawl/logo overlap, crawl hyphenation, the scrim behind the intro bar, the W and M pixel glyphs, work before channels in the index, a full-height mobile sheet for link-heavy dialogues, landscape and portrait HUD and select layouts, focus return, E/Space activating the focused link, a true crawl replay, contact details.
- **Tested** (Playwright, Chromium): 1440 and 1280 desktop, iPhone 13 portrait and landscape, keyboard only, reduced motion, JavaScript off, and the live GitHub Pages URL. No console errors.

To re-run the tools:
```bash
git clone --depth 1 https://github.com/pbakaus/impeccable /tmp/impeccable
git clone --depth 1 https://github.com/nutlope/hallmark /tmp/hallmark
sh /tmp/impeccable/.claude/skills/impeccable/scripts/impeccable detect --json index.html
node /tmp/hallmark/skills/hallmark/scripts/sloplint.mjs index.html --genre playful --render
```
Hallmark's `--render` needs `puppeteer-core` (set `HALLMARK_PUPPETEER` to its path) and `CHROME_PATH`. Its `--kept` check compares against `.hallmark/before.json`, which is git-ignored and was not pushed; skip `--kept` in a fresh clone.

## What to do next (priority order)

1. **Test in real Chrome with Claude in Chrome:** the full path on the live URL. Check: sound starts on Press start, the crawl looks right at your actual screen size, the clock wipe, select by mouse and keyboard, walking all 7 rooms, every dialogue, and that links open (Instagram may show a login wall when logged out). Also check that the email button opens the mail app, the `#work` deep link and the Back button behaviour, and Chrome DevTools device mode for phones. Note anything that feels slow, confusing or broken.
2. **Fill in Hamza's content when it arrives.** A message asking him for it has been sent. He may send:
   - a title plus a one-line hook for each of the 19 JM posts (`JM_POSTS`, currently "Reel 01"…) and the 6 Sachin Parikh posts (labels in `ROOMS.r4`);
   - briefs rewritten in his voice (`BRIEF`);
   - real results, used only as given and never invented;
   - his 3–5 best pieces, to feature first;
   - screenshots of his best work, to show in dialogues and the index. Put them in `assets/`, update `.github/workflows/pages.yml` so it copies `assets/`, and keep images small;
   - a CV PDF (`CONTACT.resume`);
   - confirmation of the title "copywriter" on the gate, and his approval of the character taglines and welcome copy, which were written for him.
3. **Known gaps from the critique, not fixed yet:**
   - Rooms are sparse; dress each from its work (a ticker wall in JM, a marquee in Vitrina, ad screens in Advertising) and scale the Launches items up, since the phone is about 4px.
   - The portrait phone canvas is small (about 366×201); consider a 2× camera that follows the player in portrait. A "turn your phone sideways" toast exists today.
   - Link-preview image: `og.png` was built but not shipped (git-ignored), because the GitHub connector in the old session could not push binaries. Generate a 1200×630 image, commit it, add `og:image` with the **absolute** URL `https://kaalpanikh.github.io/hamza-tinwala-portfolio/og.png`, set `twitter:card` to `summary_large_image`, and add `og.png` to the workflow's copy list.
   - The crawl copy leans on a few clichés; only change it with Hamza's approval, because it's his text.

## Rules that keep it working

- **Keep the world:** the client asked for the film-crawl intro, the arcade character select and the dungeon. Polish inside it; don't redesign it.
- **Never invent** metrics, quotes, titles for his posts, or claims. Missing facts stay missing until Hamza supplies them.
- Every colour and font goes through a `:root` token. Don't use `transition: all`, and animate only transform and opacity. Every motion needs a reduced-motion fallback.
- Interactive text is at least 11px; touch targets at least 44px; every control has `:focus-visible`.
- After content changes: `node tools/prerender.js`, re-run both linters, test, then commit and push to `main`. Check the Actions run is green and the live URL updated.
- The `?dev` hook is harmless in production (it only activates with `?dev`); keep it for testing.
