# 🚀 Quick Start Guide

## Get your portfolio running in 5 minutes!

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

Your portfolio will be available at: http://localhost:5173

### 3️⃣ Essential Configuration

Before deploying, you need to:

1. **Update Repository Name** in two files:
   - `vite.config.ts`: Change `base: '/portfolio/'` to your repo name
   - `src/main.tsx`: Change `basename="/portfolio"` to your repo name

2. **Get Formspree Form ID** (for contact form):
   - Sign up at https://formspree.io
   - Create a form and get your form ID
   - Replace `YOUR_FORM_ID` in `src/pages/CollaborationPage.tsx`

3. **Optional: Update CountAPI** (for visitor counter):
   - The default namespace/key will work
   - Or create your own at https://countapi.xyz

### 4️⃣ Deploy to GitHub Pages
```bash
# Build the project
npm run build

# Deploy (requires gh-pages package)
npm run deploy
```

Or use GitHub Actions (automatic):
1. Push to GitHub
2. Enable GitHub Pages in Settings
3. It will auto-deploy on every push to main

### 📝 Update Your Content

All your personal data is in `src/data/resume-data.json`:
- Career history
- Projects
- Education
- Skills
- Awards

### 🎨 Customize Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  dark: {
    bg: '#0b1115',     // Background
    panel: '#0f1a1f',  // Panel background
  },
  accent: {
    DEFAULT: '#6ee7b7', // Primary accent
    secondary: '#f6c85f', // Secondary accent
  },
}
```

### 🆘 Need Help?

- Check [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- Email: ghanashyam.s.katti@gmail.com

---

**That's it! Your portfolio is ready! 🎉**
