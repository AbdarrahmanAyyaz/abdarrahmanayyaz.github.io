# GitHub Pages Deployment with Environment Variables

## Current Configuration

The chatbot now uses the API key from environment variables via `.env` files:
- **Development**: `.env` (local development)
- **Production**: `.env.production` (GitHub Pages builds)

## Important Security Note

⚠️ **WARNING**: When building for GitHub Pages (static hosting), the API key from `.env` files is **compiled into the JavaScript bundle** during the build process. This means:

- ✅ The API key is NOT in your git repository
- ✅ The API key is NOT in your source code
- ❌ The API key IS visible in the compiled JavaScript files on your website
- ❌ Anyone can extract it using browser DevTools

This is a limitation of static hosting (GitHub Pages). For true server-side security, you would need to use Netlify or similar platforms with serverless functions.

## Deployment Steps

### Option 1: Local Build + Manual Deployment (Current Method)

1. **Build locally with your API key:**
   ```bash
   npm run build
   ```
   This reads the API key from `.env` or `.env.production` and bakes it into `build/static/js/main.*.js`

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   Or manually push the `build` folder to the `gh-pages` branch

### Option 2: GitHub Actions (Recommended for Team Workflow)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      env:
        REACT_APP_GOOGLE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

Then add `GEMINI_API_KEY` as a repository secret in GitHub Settings.

## Current API Key

The API key should be configured in GitHub Secrets:
- Go to repository Settings → Secrets and variables → Actions
- Add secret named `REACT_APP_GOOGLE_GEMINI_API_KEY`
- The GitHub Actions workflow will use this secret during deployment

**NEVER commit API keys to documentation or code!**

## What's Protected

✅ Files in `.gitignore` (NOT committed to git):
- `.env`
- `.env.local`
- `.env.production`
- `.env.development`

## Verifying the Build

After deployment, check that the API key is working:
1. Visit your site: https://abdarrahmanayyaz.github.io
2. Try the chatbot - it should respond normally
3. Check browser DevTools → Network → Look for Gemini API calls

**Note**: The API key will be visible if someone inspects `main.*.js` in DevTools → Sources tab. This is expected for GitHub Pages.

## Migration to Secure Hosting (Future)

For production security, consider migrating to Netlify:
1. Keeps API keys server-side only
2. Built-in rate limiting
3. Environment variables stay secure
4. GitHub Secret Scanning won't flag it

The secure implementation is already ready in:
- `src/lib/gemini-secure.js` (client)
- `netlify/functions/gemini-chat.js` (serverless function)

---

**Last Updated**: 2025-01-14
**Current Branch**: `claude/fix-api-key-leak-01Hh2Qc43iiwbSz4G7cn87cj`
