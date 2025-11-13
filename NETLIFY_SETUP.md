# Netlify Environment Variable Setup

## Step 1: Set Environment Variables in Netlify Dashboard

### Quick Access:
1. Go to: https://app.netlify.com
2. Select your site: **abdarrahmanayyaz.github.io** (or your site name)
3. Navigate to: **Site settings** → **Environment variables**

### Add This Variable:

Click **"Add a variable"** and enter:

**Key:**
```
GEMINI_API_KEY
```

**Value:**
```
[Your Google Gemini API key - from .env file]
```

**Scope:** Keep default (All scopes)

**Deploy context:** Keep default (All)

Click **"Create variable"**

---

## Step 2: Verify Variable is Set

After adding the variable, you should see:

- **Key:** GEMINI_API_KEY
- **Value:** •••••••••••••••••••••••••••••• (hidden)
- **Scopes:** All

---

## Step 3: Trigger Deployment

The variable will be available on the next deployment. You have two options:

### Option A: Trigger from Dashboard
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

### Option B: Deploy from CLI (we'll do this together)
```bash
npm run build
npm run deploy
```

---

## ⚠️ Important Notes

1. **Never commit this API key to git** - It's server-side only now
2. **The key is encrypted** - Netlify stores it securely
3. **Available to serverless functions only** - Client-side code can't access it
4. **Effective immediately** - Available on next deployment

---

## ✅ After Setup

Once the variable is set, return to the terminal and let me know so we can proceed with deployment!
