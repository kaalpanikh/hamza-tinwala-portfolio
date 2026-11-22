# Portfolio Episode XIII: The Rise of Creativity

The playable portfolio of **Hamza Tinwala**: an opening text crawl, a character select, then a pixel dungeon with seven rooms of work. Walk up to anything that sparkles to open it.

Short on time? Add `#work` to the URL for every piece of work in one plain list.

## Edit it

Everything lives in `index.html`, with no build step.

- **Contact details**: near the top of the script, fill in `const CONTACT = { email: '', linkedin: '', resume: '' }`. Buttons appear in the last room and in the work list once a value is set.
- **Work and links**: the `ROOMS` object holds every room, brief and link.
- **Characters**: the `HEROES` list holds names, stats and taglines.

## Controls

Arrow keys or WASD to walk, E or Space to interact, Esc to close, M for sound. On phones, the on-screen pad and A button.

## Deploy

Pushing to `main` publishes the site through GitHub Actions (`.github/workflows/pages.yml`). One-time setup: **Settings → Pages → Source: GitHub Actions**.
