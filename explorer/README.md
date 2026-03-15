# FlowKit Explorer

Complete documentation and widget explorer for FlowKit.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📁 Structure

```
explorer/
├── App.tsx                 # Main app with routing
├── pages/
│   ├── HomePage.tsx        # Landing page
│   ├── GalleryPage.tsx     # Widget gallery
│   ├── ComponentsPage.tsx  # Component docs
│   ├── StudioPage.tsx      # Widget builder
│   └── DocsPage.tsx        # Documentation
├── styles/
│   └── explorer.css        # All styles
└── index.tsx               # Entry point
```

## 🎨 Features

- **Gallery** - Browse 70+ widgets with live previews
- **Components** - Learn all components with code examples
- **Studio** - Build custom widgets with code editor
- **Docs** - Comprehensive documentation

## 🔧 Tech Stack

- React 18
- React Router 6
- TypeScript
- CSS (no framework)

## 📦 Build

```bash
npm run build
```

Output in `dist/` folder.

## 🌐 Deploy

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Any static host
npm run build && upload dist/
```
