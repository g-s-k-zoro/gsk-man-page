# 🚀 Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- GitHub account

## Step-by-Step Deployment

### 1. Initial Setup

```bash
# Navigate to the project directory
cd portfolio-gsk

# Install dependencies
npm install
```

### 2. Configure for Your Repository

#### Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/portfolio/',  // Change 'portfolio' to your repo name
  // ...
})
```

#### Update `src/main.tsx`:
```typescript
<BrowserRouter basename="/portfolio">  // Change 'portfolio' to your repo name
```

### 3. Set Up External Services

#### Formspree (Contact Form)
1. Sign up at https://formspree.io
2. Create a new form
3. Copy your form ID
4. Update `src/pages/CollaborationPage.tsx`:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

#### CountAPI (Visitor Counter)
1. Visit https://countapi.xyz
2. Create a namespace and key (or use the default)
3. Update `src/components/VisitorCounter.tsx`:
   ```typescript
   const namespace = 'gsk-portfolio';  // Your namespace
   const key = 'visitor-count';        // Your key
   ```

### 4. Test Locally

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 5. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `portfolio` (or your preferred name)
3. Don't initialize with README (we already have one)

### 6. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio website"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to main branch
git push -u origin main
```

### 7. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Save the settings

### 8. Deploy

The GitHub Action will automatically run when you push to the main branch.

You can also trigger it manually:
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### 9. Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/portfolio/
```

(Replace YOUR_USERNAME with your GitHub username and portfolio with your repo name)

## 🔄 Updating Content

### Quick Updates

1. Edit the relevant files:
   - Resume data: `src/data/resume-data.json`
   - Site structure: `src/data/site-structure.json`
   - Page content: Files in `src/pages/`

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

3. GitHub Actions will automatically redeploy

### Adding New Projects

Edit `src/data/resume-data.json`:
```json
{
  "projects": [
    // ... existing projects
    {
      "id": "new-project",
      "title": "New Project Name",
      "summary": "Brief description",
      "description": "Detailed description",
      "technologies": ["Tech1", "Tech2"],
      "thumbnail": "/project-image.jpg",
      "repo_url": "https://github.com/...",
      "demo_url": "https://..."
    }
  ]
}
```

## 🐛 Troubleshooting

### Build Fails

1. Check Node version: `node --version` (should be 16+)
2. Clear cache: `rm -rf node_modules package-lock.json && npm install`
3. Check for TypeScript errors: `npm run build`

### GitHub Pages Not Updating

1. Check Actions tab for errors
2. Ensure GitHub Pages is enabled in Settings
3. Clear browser cache or try incognito mode
4. Wait 5-10 minutes for CDN to update

### 404 Error on Refresh

This is normal for SPAs on GitHub Pages. The included configuration handles this.

## 📊 Monitoring

- **Visitor Count**: Check the counter on your site
- **GitHub Insights**: Repository → Insights → Traffic
- **Build Status**: Repository → Actions tab

## 🆘 Need Help?

1. Check the [README.md](README.md) for configuration details
2. Review GitHub Actions logs for deployment errors
3. Open an issue in the repository
4. Contact: ghanashyam.s.katti@gmail.com

---

Happy Deploying! 🎉
