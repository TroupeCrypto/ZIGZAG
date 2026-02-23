# ZIG ZAG - Deluxe Hub Space

The official deluxe and psychedelic hub space for music and digital artist ZIG ZAG.

## 🌈 Features

### 🎵 Music Collection
- **Singles** - Stream, download, and purchase individual tracks
- **Mixtapes** - Access exclusive mixtape collections
- **Albums** - Full album releases available for sale/stream/download

### 🎨 Virtual Art Showcase
- Interactive gallery displaying digital art and designs
- Full-size artwork viewing
- Psychedelic visual effects and animations

### ₿ Crypto Section
- **NFT Collections** - Browse exclusive digital collectibles
- **Wallet Connect** - Connect your Web3 wallet (MetaMask support)
- **Token Info** - Learn about ZIG ZAG Token (ZZT)
- **Blockchain Portfolio** - View on-chain assets and transactions

### 💻 Web Development
- **Public Repositories** - Open source projects and tools
- **Private Projects** - Showcase of advanced development work
- **Skills** - JavaScript, Python, Solidity, Web3, React, Node.js, Smart Contracts

### 🛒 Multiple Marketplaces
- **Music Store** - Purchase high-quality WAV/MP3 downloads
- **Art Marketplace** - Buy digital art prints and custom designs
- **NFT Marketplace** - Trade on OpenSea, Rarible, and Foundation
- **Services** - Commission music production, graphic design, and web development

## 🚀 Getting Started

Simply open `index.html` in a web browser to view the hub space locally, or visit the live site.

### Local Development
```bash
# Clone the repository
gh repo clone TroupeCrypto/BB
cd BB

# Serve locally (Python 3)
python3 -m http.server 8080

# Or use any other web server
# Open http://localhost:8080 in your browser
```

### GitHub Login (single user)

This project supports GitHub OAuth login via NextAuth with a single allowed account.

1. Copy `.env.example` to `.env.local`
2. Set `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
3. Set `ALLOWED_GITHUB_LOGIN` to the only GitHub username that should be allowed

### Backend / API location

This repo uses Next.js App Router, so backend endpoints live under `app/api`.

- Auth API route: `app/api/auth/[...nextauth]/route.js`
- Route protection middleware: `middleware.js`
- Prisma data access scripts: `index.js` with schema in `prisma/schema.prisma`

## 🎨 Design

The hub features a psychedelic design with:
- Animated gradient backgrounds
- Glowing text effects
- Smooth hover animations
- Responsive layout for all devices
- Custom scrollbar styling
- Interactive button effects

## 🔧 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and gradients
- **JavaScript** - Interactive features and Web3 integration
- Pure vanilla JS (no frameworks required)

## 🎮 Easter Egg

Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A

## 📱 Responsive Design

The hub is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Connect

- Twitter
- Instagram  
- Spotify
- GitHub

---

© 2026 ZIG ZAG. All rights reserved. 
