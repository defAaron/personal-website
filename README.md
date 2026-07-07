# personal-website

Personal portfolio site for [aarondutta.com](https://aarondutta.com).

Static HTML/CSS/JS site deployed via [GitHub Pages](https://pages.github.com/) from the `main` branch.

## Structure

```
.
├── index.html          # Home
├── work.html           # Projects & hackathons
├── gallery.html        # Photo gallery
├── CNAME               # Custom domain (GitHub Pages)
├── assets/
│   ├── gallery/        # Gallery images by section
│   │   ├── auckland/
│   │   ├── drawings/
│   │   ├── piano/
│   │   └── travel/
│   ├── images/         # Site imagery (hero, etc.)
│   ├── dock/           # macOS dock icons
│   ├── sounds/         # UI sound effects
│   └── projects/       # Project thumbnails
├── js/                 # Page scripts
└── styles/             # Stylesheets
```

## Branching

| Branch | Purpose |
|--------|---------|
| `main` | Production — always deployable; GitHub Pages serves from here |
| `develop` | Integration — ongoing work before release |
| `feature/*` | Short-lived branches for specific changes |

### Workflow

1. Branch from `develop` (or `main` for small fixes):
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-change
   ```
2. Commit and push your branch.
3. Open a pull request into `develop`.
4. When ready to release, merge `develop` → `main`.

For quick fixes, you can branch directly from `main` and PR back into `main`.

## Local development

No build step required. Open any HTML file in a browser, or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
