# IKEA or Sigur Rós?

A fun quiz game that challenges you to distinguish between IKEA product names and Sigur Rós song titles. Can you tell the difference between Nordic furniture and Icelandic post-rock?

This project serves as a development methodology study: v1.x releases were created primarily using Claude Code to evaluate AI coding capabilities, while v2.x releases will be developed entirely without AI assistance to compare human-coded vs AI-assisted approaches.

## Project Overview

This web application presents users with names and asks them to guess whether they're from IKEA's product catalog or Sigur Rós's discography. The app features a clean, Nordic-inspired design that pays homage to both brands' minimalist aesthetics.

## Getting Started

### Prerequisites
- Node.js (latest LTS)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/danlourenco/ikea-or-sigur-ros.git
cd ikea-or-sigur-ros
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev

# or open in browser automatically
npm run dev -- --open
```

### Building for Production

```sh
npm run build
```

Preview the production build:
```sh
npm run preview
```

### Deployment

This project is configured for deployment to Cloudflare Workers using Wrangler:

```sh
npm run preview
```

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: TailwindCSS
- **Audio**: Howler.js
- **Deployment**: Cloudflare Workers (via Wrangler)
- **Testing**: Vitest + Playwright
