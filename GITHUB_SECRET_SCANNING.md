# GitHub Secret Scanning Setup

## 🔒 Enable GitHub Secret Scanning

GitHub offers free secret scanning for public repositories to detect accidentally committed secrets..

### Step 1: Enable Secret Scanning

1. Go to your GitHub repository: https://github.com/abdarrahmanayyaz/abdarrahmanayyaz.github.io
2. Click **Settings** → **Code security and analysis**
3. Under **Secret scanning**, click **Enable**

**What it does:**
- Automatically scans all commits for known secret patterns
- Sends alerts when secrets are detected
- Scans both new commits and historical commits
- Detects 200+ secret types including Google API keys

### Step 2: Enable Push Protection (Recommended)

1. In the same **Code security and analysis** section
2. Under **Secret scanning**, enable **Push protection**

**What it does:**
- **Blocks pushes** that contain detected secrets
- Provides immediate feedback before secrets reach GitHub
- Prevents accidental exposure

### Step 3: Configure Notifications

1. Go to **Settings** → **Notifications** (your personal settings, not repo)
2. Under **Security alerts**, ensure notifications are enabled
3. Choose how you want to be notified (email, web, mobile)

---

## 📊 Local Secret Scanning

We've also set up **local secret scanning** to catch secrets before you even commit:

### 1. Pre-commit Hook
Automatically runs before each commit:
```bash
# Already configured at .git/hooks/pre-commit
# Scans staged files for API key patterns
# Blocks commits containing secrets
```

### 2. Manual Security Scan
Run anytime to check your codebase:
```bash
npm run check-secrets
# or
./scripts/check-secrets.sh
```

**What it checks:**
- ✅ .env files are not tracked in git
- ✅ No API keys in source code
- ⚠️ API keys in build bundle (expected for client-side)
- ⚠️ Recent commits mentioning sensitive terms
- ✅ Pre-commit hook is active

---

## 🔍 What Secrets Are Detected?

GitHub and our local scanner detect:

### Google API Keys
```
Pattern: AIzaSy[A-Za-z0-9_-]{33}
Example: AIzaSy*** (33 characters total)
```

### OpenAI API Keys
```
Pattern: sk-[A-Za-z0-9]{20,50}
Example: sk-proj-*** (20-50 characters)
```

### AWS Access Keys
```
Pattern: AKIA[0-9A-Z]{16}
Example: AKIA*** (16 characters total)
```

### Other Patterns
- Resend API keys
- OAuth client secrets
- Database connection strings
- Private keys (.pem files)

---

## 🚨 If GitHub Finds a Secret

### Step 1: Rotate the Key Immediately
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Delete the exposed key
3. Create a new key
4. Update your `.env` file locally
5. **Never commit the new key**

### Step 2: Remove from Git History
```bash
# Option 1: Use BFG Repo Cleaner (recommended)
brew install bfg
bfg --replace-text passwords.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Option 2: Use git filter-branch (slower)
git filter-branch --tree-filter 'git rm -rf --ignore-unmatch path/to/file' HEAD
```

### Step 3: Force Push (⚠️ Use with Caution)
```bash
git push --force-with-lease
```

### Step 4: Verify Removal
```bash
# Search git history for the old key
git log --all --full-history -S"AIzaSy..." --source

# Should return no results
```

---

## 📈 Monitoring Secret Security

### Check for Alerts
1. Go to **Security** → **Secret scanning alerts**
2. Review any active alerts
3. Resolve by rotating keys

### Regular Audits
Run weekly:
```bash
npm run check-secrets
```

### Review Commit History
Check recent commits don't contain secrets:
```bash
git log --oneline -20 | grep -iE "key|secret|password"
```

---

## 🎯 Best Practices

### ✅ DO
- Store secrets in `.env` files
- Add `.env` to `.gitignore`
- Use environment variables in code
- Restrict API keys in Google Cloud Console
- Run `npm run check-secrets` before pushing
- Rotate keys every 3-6 months

### ❌ DON'T
- Hardcode API keys in source code
- Commit `.env` files
- Share API keys in Slack/email
- Use production keys in development
- Push without running security checks
- Ignore secret scanning alerts

---

## 🔧 npm Scripts

We've added these scripts to `package.json`:

```bash
# Run security scan
npm run check-secrets

# Run pre-commit hook manually
git hook run pre-commit
```

---

## 📚 Additional Resources

- [GitHub Secret Scanning Docs](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [Google Cloud API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

## ✅ Current Security Status

Your portfolio now has **multiple layers of security**:

1. ✅ **Local pre-commit hook** - Blocks secrets before commit
2. ✅ **Manual security scanner** - Run on-demand checks
3. ✅ **.env files in .gitignore** - Never tracked by git
4. ✅ **Google Cloud API restrictions** - Domain whitelist + API limits
5. ✅ **Documentation cleanup** - Old keys removed from all files
6. ⏳ **GitHub secret scanning** - Enable following steps above

**Next Step:** Enable GitHub secret scanning in your repository settings!

---

**Last Updated:** 2025-01-12
**Status:** ✅ Local security mechanisms active, GitHub scanning pending
