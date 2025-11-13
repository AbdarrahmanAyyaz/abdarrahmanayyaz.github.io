#!/bin/bash

# Secret Scanner - Checks for exposed secrets in the codebase
# Run this script before committing or as part of CI/CD pipeline

set -e

echo "🔍 Scanning codebase for exposed secrets..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if any issues found
ISSUES_FOUND=0

# ===== 1. Check .env files are not tracked =====
echo "1️⃣  Checking .env files are not in git..."
ENV_FILES=$(git ls-files | grep -E "^\.env$|^\.env\.local$|^\.env\.production$" || true)

if [ -n "$ENV_FILES" ]; then
  echo -e "${RED}❌ ERROR: .env files are tracked in git:${NC}"
  echo "$ENV_FILES"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
  echo -e "${GREEN}✅ .env files are properly ignored${NC}"
fi
echo ""

# ===== 2. Check for API keys in source code =====
echo "2️⃣  Scanning source files for API key patterns..."

# Define patterns
declare -a PATTERNS=(
  "AIzaSy[A-Za-z0-9_-]{33}"                                    # Google API keys
  "sk-[A-Za-z0-9]{20,50}"                                      # OpenAI keys
  "re_[A-Za-z0-9]{24,}"                                        # Resend API keys
  "AKIA[0-9A-Z]{16}"                                           # AWS Access Keys
  "[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com"    # Google OAuth
)

# Files to scan (excluding build, node_modules, etc.)
SCAN_LOCATIONS=(
  "src/"
  "public/"
  "*.js"
  "*.jsx"
  "*.ts"
  "*.tsx"
  "*.json"
  "*.md"
)

for pattern in "${PATTERNS[@]}"; do
  for location in "${SCAN_LOCATIONS[@]}"; do
    if [ -e "$location" ] || [ -d "$location" ]; then
      MATCHES=$(grep -rn -E "$pattern" "$location" 2>/dev/null | grep -v "node_modules" | grep -v "build/" | grep -v ".git/" || true)
      if [ -n "$MATCHES" ]; then
        echo -e "${RED}❌ Found potential secret matching pattern: $pattern${NC}"
        echo "$MATCHES"
        echo ""
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
      fi
    fi
  done
done

if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ No API key patterns found in source code${NC}"
fi
echo ""

# ===== 3. Check build bundle for secrets =====
echo "3️⃣  Checking if build exists..."

if [ -d "build" ] && [ -f build/static/js/main.*.js ]; then
  echo "   Found build folder, scanning JavaScript bundle..."

  # This is expected for client-side API keys with restrictions
  BUNDLE_KEYS=$(grep -o "AIzaSy[A-Za-z0-9_-]\{33\}" build/static/js/main.*.js | sort -u || true)

  if [ -n "$BUNDLE_KEYS" ]; then
    echo -e "${YELLOW}⚠️  API keys found in bundle (expected for client-side setup):${NC}"
    echo "$BUNDLE_KEYS"
    echo ""
    echo "   Make sure these keys have Google Cloud restrictions:"
    echo "   - HTTP referrer restrictions (domain whitelist)"
    echo "   - API restrictions (Gemini API only)"
    echo "   - Usage quotas configured"
  else
    echo -e "${GREEN}✅ No API keys in bundle${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  Build folder not found - run 'npm run build' first${NC}"
fi
echo ""

# ===== 4. Check git history for old keys =====
echo "4️⃣  Checking recent commits for sensitive files..."
SENSITIVE_COMMITS=$(git log --all --oneline -20 | grep -iE "key|secret|password|token|api" || true)

if [ -n "$SENSITIVE_COMMITS" ]; then
  echo -e "${YELLOW}⚠️  Recent commits mention sensitive terms:${NC}"
  echo "$SENSITIVE_COMMITS"
  echo ""
  echo "   Review these commits to ensure no secrets were committed."
else
  echo -e "${GREEN}✅ No sensitive terms in recent commit messages${NC}"
fi
echo ""

# ===== 5. Verify pre-commit hook exists =====
echo "5️⃣  Checking pre-commit hook..."
if [ -f ".git/hooks/pre-commit" ] && [ -x ".git/hooks/pre-commit" ]; then
  echo -e "${GREEN}✅ Pre-commit hook is active${NC}"
else
  echo -e "${RED}❌ Pre-commit hook not found or not executable${NC}"
  echo "   Run: chmod +x .git/hooks/pre-commit"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi
echo ""

# ===== Final Report =====
echo "======================================"
if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ Security scan passed! No critical issues found.${NC}"
  echo ""
  echo "Remember to:"
  echo "  • Keep API keys restricted in Google Cloud Console"
  echo "  • Monitor API usage regularly"
  echo "  • Rotate keys if they become exposed"
  exit 0
else
  echo -e "${RED}❌ Security scan found $ISSUES_FOUND issue(s)${NC}"
  echo ""
  echo "Please fix the issues above before committing or deploying."
  exit 1
fi
