# Deploy to Vercel

## Quick Setup (Takes 2 minutes)

### 1. Push to GitHub (Personal Account)
```bash
# Create a new repository on GitHub under your personal account
# Name it: art-roulette (or any name you like)

# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/art-roulette.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

**Option A - Via Vercel Website (Easiest):**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `art-roulette` repository
5. Click "Deploy" (Vercel auto-detects Vite settings)
6. Done! Your site is live at `https://art-roulette.vercel.app`

**Option B - Via CLI:**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to new project
# - Select your personal account (not Skelloapp)
# - Accept defaults
```

### 3. Auto-Deployments
✅ Every `git push` to main branch will auto-deploy!

### Your Live URL
After deployment: `https://[your-project-name].vercel.app`

---

## Alternative: GitHub Pages

If you prefer GitHub Pages instead:

1. Update `vite.config.ts`:
```ts
base: '/art-roulette/',  // Must match repo name
```

2. Create `.github/workflows/deploy.yml` (see workflow file in repo)

3. Enable GitHub Pages in repo settings:
   - Settings → Pages → Source: GitHub Actions

4. Push to deploy automatically
