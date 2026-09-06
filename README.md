# Ahmad Raza — SEO & Digital Marketing Portfolio

A single-page, static portfolio site built with HTML5, CSS3, Bootstrap 5,
Bootstrap Icons, Google Fonts, and vanilla JavaScript. No build step,
no backend, no frameworks beyond Bootstrap.

## Project structure

```
/
├── index.html                     # All markup, SEO meta tags, JSON-LD
├── style.css                      # All styling (CSS variables at the top)
├── script.js                      # All interactivity (dependency-free)
├── assets/
│   ├── profile.jpg                # Placeholder photo — replace with a real headshot
│   └── Ahmad-Raza-Resume.pdf      # Placeholder PDF — replace with the real resume
└── README.md
```

## Before you deploy — replace the placeholders

1. **Profile photo**: replace `assets/profile.jpg` with a real photo
   (square image, ~800×800px recommended). If the file is missing or fails
   to load, the site automatically falls back to an "AR" initials avatar.
2. **Resume PDF**: replace `assets/Ahmad-Raza-Resume.pdf` with the real,
   up-to-date resume. Keep the same filename, or update the `href`
   references in `index.html` (navbar, hero, and contact sections) if you
   rename it.
3. **Canonical / Open Graph URL**: in `index.html` `<head>`, update:
   - `<link rel="canonical" ...>`
   - `og:url`, `og:image`
   - the JSON-LD `"url"` field
   to your actual Vercel domain once deployed (e.g. `https://ahmad-raza.vercel.app/`).
4. **Contact & social links**: phone, email, and freelance profile links live
   in the Contact section and Footer of `index.html`. LinkedIn/GitHub buttons
   were intentionally left out since no real URLs were provided — add them
   in the `.contact-socials` block only once you have real links.
5. **Favicon**: a minimal inline SVG favicon is used by default. Swap in a
   real `favicon.ico`/`favicon.svg` file and update the `<link rel="icon">`
   tag if you'd like custom branding.
6. **Colors**: all colors are defined as CSS variables at the top of
   `style.css` (`:root { ... }`) — change `--accent-blue`, `--accent-violet`,
   `--accent-green`, and the background variables to re-theme the whole site.

## Running locally

No build tools required. Just open `index.html` directly in a browser, or
serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Deploying to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: "Other" / static site. Leave build command empty and
   output directory as the project root — no build step is required.
4. Deploy.

## Notes on content accuracy

All experience, skills, education, certifications, and contact details in
this site come directly from information provided by Ahmad Raza. No fake
statistics, testimonials, client logos, or case-study numbers have been
added — the "Featured Work" section intentionally uses capability
descriptions instead of fabricated results.
