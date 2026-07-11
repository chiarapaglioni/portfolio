# Chiara — Portfolio

A two-sided personal portfolio: AI/technical work on one side, art and creative
work on the other. Plain HTML/CSS/JS — no build step, no framework — so it's
easy to edit and easy to version with git.

## Structure

```
portfolio/
├── index.html      # Home — interactive split hero, links to both sides
├── work.html        # AI & technical experience (timeline + skills)
├── art.html         # Art & creative gallery + social links
├── css/style.css     # All styling (shared design tokens at the top)
├── js/main.js         # Nav toggle, split-hero drag, timeline reveal, gallery filter/lightbox
└── assets/            # Put your real images here
```

## Before you publish — things to edit

1. **Social links.** Search each HTML file for `YOUR-HANDLE` and replace with
   your real LinkedIn, Instagram, GitHub, and Pinterest URLs (4 links × 3
   files = 12 replacements — a find-and-replace across the project is fastest).
2. **Work timeline (`work.html`).** The DHL / BMW / Eidosmedia entries are
   drafted from what you've told me before — check dates, add real bullet
   points and outcomes, and adjust the tags.
3. **Art gallery (`art.html`).** Right now each tile is a colored placeholder
   `<div class="swatch">`. To use a real image instead:
   - Drop the image file into `assets/` (e.g. `assets/piece-01.jpg`)
   - Replace the `<div class="swatch" style="...">` with:
     ```html
     <div class="swatch" style="background-image:url('assets/piece-01.jpg'); background-size:cover; background-position:center;"></div>
     ```
   - Update the `<figcaption>` text and the tile's `data-cat` (`painting`,
     `drawing`, `digital`, or `community`) so filtering still works.
4. **Name/branding.** The header currently reads "Chiara · portfolio" — edit
   the `.brand` link text in all three HTML files if you want your full name
   or a different tagline.

## Running it locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths behave exactly like production:
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Working with git

This folder is already a git repository with an initial commit. Day to day:

```bash
git status                 # see what changed
git add -A                 # stage everything
git commit -m "Update art gallery with new pieces"
```

To connect it to a remote (e.g. GitHub) and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

## Publishing for free with GitHub Pages

1. Push this repo to GitHub (see above).
2. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` /
   root**.
3. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`
   within a couple of minutes. Every `git push` after that updates the live
   site automatically.

## Design notes

- Two accent colors carry the two identities throughout: a cool steel blue
  (`--signal`) for the technical side, and a muted plum (`--bloom`) for the
  art side. The rest of the palette stays neutral paper/ink.
- Typefaces: **Fraunces** (display, both serif and italic) for headlines,
  **Inter** for body text, **IBM Plex Mono** for labels, dates, and nav —
  loaded from Google Fonts via `<link>` tags in each page's `<head>`.
- The home page's draggable split hero is the signature interaction: drag the
  circular handle (or use arrow keys when it's focused) to reveal more of
  either side.
