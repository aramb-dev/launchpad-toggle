# GitHub Pages Deployment

This repository automatically deploys the website to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Enable GitHub Pages** in your repository settings:

   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

2. **Push changes** to the `main` branch in the `website/` directory to trigger deployment

3. **Manual deployment** can be triggered from the Actions tab

## How it works

- The workflow builds the Vite website whenever changes are pushed to `website/`
- It uses Node.js 20 and npm to install dependencies and build the site
- The built files are uploaded and deployed to GitHub Pages
- Your site will be available at: `https://aramb-dev.github.io/launchpad-toggle/`

## Local Development

```bash
cd website
npm install
npm run dev
```

## Production Build

```bash
cd website
npm run build
```

The built files will be in `website/dist/`.
