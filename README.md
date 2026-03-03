# GitNexus Marketplace

Open source Node.js tools and web apps — launch any of them instantly in your browser with zero install and zero server cost.

**Live site:** [GitNexus-Marketplace.github.io](https://GitNexus-Marketplace.github.io)

---

## What this is

A curated marketplace where open-source Node.js apps and tools can be listed and launched directly in the browser using [GitNexus](https://github.com/abhigyanpatwari/GitNexus) and WebContainers. No server required. Each app runs inside the user's browser.

## Categories

- 🤖 AI Tools
- 🛠️ Dev Tools
- ⚡ Productivity
- 🌐 Web Apps
- 🔧 Utilities

## Submitting your app

1. Bundle your Node.js app: `npx gitnexus-bundler build -i server.js -s out`
2. Host your `.cjs` bundle on Cloudflare Pages (free, unlimited bandwidth)
3. Add a `gitnexus.json` to your repo with the bundle URL
4. Open a PR to the right category repo adding your entry to `registry.json`

A maintainer will review and merge. No automation. Manual review only.

See [gitnexus-bundler docs](https://github.com/Yogesh1290/gitnexus-bundler) for the full guide.

## Development

```bash
npm install
npm run dev
```

## Deployment

This site deploys automatically to GitHub Pages on every push to `main`. No external repo fetching — all registry data lives in `src/data/categories/`.

## Registry limits

Each category has a soft cap of **500 apps** per `registry.json` file. When a category grows beyond that, a sub-category repo will be created. This keeps individual JSON files small and fast to load.

## License

MIT
