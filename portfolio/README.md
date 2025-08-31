# Ghanashyam S. Katti - Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Vite. Features a unique graph-based navigation system and showcases my professional journey, projects, and thoughts.

## 🚀 Features

- **Interactive Graph Navigation**: Force-directed graph visualization for intuitive site navigation
- **Dark Theme**: Easy on the eyes with a carefully crafted dark color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Client-Side Search**: Fast, privacy-focused search using FlexSearch
- **Visitor Counter**: Track site visits using CountAPI
- **Blog & Puzzles Section**: Share thoughts and challenge visitors with puzzles
- **Kanban Board**: Track ongoing projects visually
- **Contact Form**: Secure contact form using Formspree

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: D3.js, Rough.js
- **Animation**: Framer Motion
- **Search**: FlexSearch
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/g-s-k-zoro/portfolio.git
cd portfolio-gsk
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🚀 Deployment

### GitHub Pages Deployment

1. Update the `base` in `vite.config.ts` to match your repository name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Replace with your repo name
  // ...
})
```

2. Update the `basename` in `src/main.tsx`:
```typescript
<BrowserRouter basename="/your-repo-name">
```

3. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

4. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (will be created by GitHub Actions)
   - Save

5. The site will be automatically deployed via GitHub Actions on every push to main

### Manual Deployment

```bash
npm run build
npm run deploy  # Uses gh-pages package
```

## 📋 Configuration

### Formspree Contact Form

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Replace `YOUR_FORM_ID` in `src/pages/CollaborationPage.tsx`:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### CountAPI Visitor Counter

The visitor counter uses CountAPI. To set up your own:

1. Visit [CountAPI](https://countapi.xyz)
2. Create a namespace and key
3. Update in `src/components/VisitorCounter.tsx`:
```typescript
const namespace = 'your-namespace';
const key = 'your-key';
```

### Content Updates

- **Resume Data**: Edit `src/data/resume-data.json`
- **Site Structure**: Edit `src/data/site-structure.json`
- **Projects**: Update the projects array in resume-data.json
- **Blog Posts**: Add entries to the blogPosts array in `WasteTimePage.tsx`

## 📁 Project Structure

```
portfolio-gsk/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── data/            # JSON data files
│   ├── types/           # TypeScript type definitions
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── .github/
│   └── workflows/       # GitHub Actions
└── package.json
```

## 🎨 Customization

### Colors

Edit the color scheme in `tailwind.config.js`:
```javascript
colors: {
  dark: {
    bg: '#0b1115',
    panel: '#0f1a1f',
    border: '#1e2e38',
  },
  muted: '#9aa6b2',
  accent: {
    DEFAULT: '#6ee7b7',
    secondary: '#f6c85f',
  },
}
```

### Fonts

Update fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  'primary': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
}
```

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Ghanashyam S. Katti**

- Email: ghanashyam.s.katti@gmail.com
- LinkedIn: [ghanashyam-katti](https://www.linkedin.com/in/ghanashyam-katti-25179717b)
- GitHub: [@g-s-k-zoro](https://github.com/g-s-k-zoro)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Show your support

Give a ⭐️ if you like this project!
