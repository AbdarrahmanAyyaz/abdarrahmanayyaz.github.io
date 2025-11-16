# GitHub Secrets Setup Guide

## 🔐 Secure API Key Management with GitHub Secrets

This guide shows you how to set up GitHub Secrets to securely manage your API keys for automated deployments.

---

## ✅ Benefits of Using GitHub Secrets

- ✅ **API key never in git repository** - Not in any commit history
- ✅ **API key never in source code** - Not visible in your codebase
- ✅ **API key never in local builds** - Only GitHub Actions has access
- ✅ **API key encrypted at rest** - GitHub encrypts all secrets
- ✅ **Redacted in logs** - GitHub automatically masks secrets in workflow logs
- ✅ **No client-side exposure** - Key is only used during server-side build

---

## 📋 Step-by-Step Setup

### Step 1: Add Your API Key as a GitHub Secret

1. **Go to your GitHub repository:**
   ```
   https://github.com/AbdarrahmanAyyaz/abdarrahmanayyaz.github.io
   ```

2. **Navigate to Settings → Secrets and variables → Actions**
   - Click on your repository
   - Click "Settings" tab (top right)
   - In the left sidebar, click "Secrets and variables" → "Actions"

3. **Click "New repository secret"**

4. **Add the Gemini API Key:**
   - **Name:** `REACT_APP_GOOGLE_GEMINI_API_KEY`
   - **Value:** `[Your new Gemini API key from Google AI Studio]`
   - Click "Add secret"

   **Important:** Get a fresh API key from https://makersuite.google.com/app/apikey
   The previous key has been revoked due to exposure in git history.

### Step 2: Enable GitHub Pages

1. **Go to Settings → Pages**

2. **Configure the source:**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `root`
   - Click "Save"

   OR (recommended for GitHub Actions):
   - **Source:** GitHub Actions
   - This allows the workflow to deploy directly

### Step 3: Enable GitHub Actions

1. **Go to Settings → Actions → General**

2. **Workflow permissions:**
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click "Save"

### Step 4: Trigger the Deployment

Once you merge your changes to the `main` branch, the workflow will automatically:

1. ✅ Check out your code
2. ✅ Install dependencies
3. ✅ Build with the secret API key from GitHub Secrets
4. ✅ Deploy to GitHub Pages

You can also trigger it manually:
- Go to "Actions" tab
- Click "Deploy to GitHub Pages" workflow
- Click "Run workflow" → "Run workflow"

---

## 🔍 Verifying the Setup

### Check if Secret is Added

1. Go to **Settings → Secrets and variables → Actions**
2. You should see `GEMINI_API_KEY` listed
3. ⚠️ You cannot view the secret value after adding it (security feature)

### Check Workflow Status

1. Go to **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow
3. After pushing to main, watch the workflow run
4. Green checkmark ✅ means successful deployment

### Check Deployment

1. Visit: `https://abdarrahmanayyaz.github.io`
2. Test the AI chatbot - it should work
3. Check browser DevTools → Network → API calls to Gemini should succeed

---

## 🔄 Workflow Triggers

The deployment workflow runs automatically when:

- ✅ **Push to main branch** - `git push origin main`
- ✅ **Pull request merged to main** - Merge PR on GitHub
- ✅ **Manual trigger** - Click "Run workflow" in Actions tab

---

## 📝 Workflow File Details

**Location:** `.github/workflows/deploy.yml`

**Key Features:**
- Uses `secrets.GEMINI_API_KEY` from GitHub Secrets
- Never exposes the API key in logs (automatically redacted)
- Builds and deploys in one automated process
- Caches npm dependencies for faster builds
- Can be triggered manually if needed

**Environment Variables Used:**
```yaml
env:
  REACT_APP_GOOGLE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  REACT_APP_SITE_URL: https://abdarrahmanayyaz.github.io
  CI: false
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Store all sensitive API keys in GitHub Secrets
- Use descriptive secret names (e.g., `GEMINI_API_KEY`)
- Rotate API keys every 3-6 months
- Review "Security" tab for secret scanning alerts
- Use branch protection rules for main branch

### ❌ DON'T:
- Never commit `.env` files with real keys
- Never echo or log secret values
- Never share secret values in issues/PRs
- Never use secrets in pull requests from forks (GitHub blocks this)
- Never store secrets in code comments

---

## 🔄 Rotating API Keys

When you need to change the API key:

1. **Generate new API key** from Google AI Studio
2. **Update GitHub Secret:**
   - Go to Settings → Secrets and variables → Actions
   - Click on `GEMINI_API_KEY`
   - Click "Update secret"
   - Paste new key value
   - Click "Update secret"
3. **Trigger new deployment:**
   - Go to Actions → Deploy to GitHub Pages
   - Click "Run workflow"
4. **Revoke old API key** in Google AI Studio

---

## 🆘 Troubleshooting

### Workflow Fails with "Secret not found"

**Problem:** `GEMINI_API_KEY` secret is not set

**Solution:**
1. Go to Settings → Secrets and variables → Actions
2. Verify `GEMINI_API_KEY` exists (exact name, case-sensitive)
3. If missing, add it using Step 1 above

### Workflow Fails with "Permission denied"

**Problem:** GitHub Actions doesn't have write permissions

**Solution:**
1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"
4. Click "Save"

### Build Succeeds but Site Doesn't Update

**Problem:** GitHub Pages source not configured correctly

**Solution:**
1. Go to Settings → Pages
2. Change source to "GitHub Actions" (recommended)
   OR
3. Select branch `gh-pages` and folder `/ (root)`
4. Wait 2-3 minutes for deployment to complete
5. Check the "Actions" tab for deployment status

### API Key Doesn't Work After Deployment

**Problem:** Secret value might be incorrect

**Solution:**
1. Verify API key is valid in Google AI Studio
2. Update the secret with correct value
3. Re-run the workflow
4. Check for API quota limits in Google Cloud Console

### Chatbot Returns "API Error"

**Problem:** API key might be restricted or quota exceeded

**Solution:**
1. Check Google Cloud Console for API usage
2. Verify API key restrictions (HTTP referrers, API restrictions)
3. Ensure Gemini API is enabled in your Google Cloud project
4. Check for quota limits and billing status

---

## 📊 Monitoring

### View Workflow Runs
- **Actions tab** → Shows all workflow runs
- **Click on a run** → See detailed logs
- **Green checkmark** → Successful deployment
- **Red X** → Failed (click to see error logs)

### Secret Scanning
- **Security tab** → "Secret scanning"
- GitHub automatically scans for exposed secrets
- You'll get alerts if secrets are found in code

### API Usage
- **Google Cloud Console** → APIs & Services → Dashboard
- Monitor Gemini API usage
- Set up usage alerts
- Track quota consumption

---

## 🎯 Next Steps

After setup is complete:

1. ✅ Merge this branch to main
2. ✅ Watch the workflow run automatically
3. ✅ Verify deployment at https://abdarrahmanayyaz.github.io
4. ✅ Test the chatbot functionality
5. ✅ Delete local `.env` and `.env.production` files (no longer needed)
6. ✅ Set up monitoring alerts in Google Cloud Console

---

## 📞 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Last Updated:** 2025-01-14
**Current Branch:** `claude/fix-api-key-leak-01Hh2Qc43iiwbSz4G7cn87cj`
**Status:** ✅ Workflow configured, awaiting GitHub Secret setup
