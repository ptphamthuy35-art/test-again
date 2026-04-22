# Portfolio (Narrative-style)

Minimal editorial portfolio inspired by the uploaded reference: oversized wordmark, micro-nav, framed hero image, and a clean works layout.

## Run locally

You can open `index.html` directly in your browser, or run a tiny local server (recommended):

```bash
python -m http.server 5173
```

Then visit `http://localhost:5173/` and open the `portfolio/` folder.

## Customize

- Update your name, location, email, bio in `index.html` (look for `data-field="..."`).
- Replace project entries in `script.js` (`WORKS` array).
- Swap images (hero + tiles) in `index.html` (currently Unsplash placeholders).
- Colors/spacing/type scale live in `styles.css` under `:root`.

## Deploy

This is a static site. You can deploy the `portfolio/` folder to:

- GitHub Pages
- Netlify
- Vercel (static)
- Cloudflare Pages
