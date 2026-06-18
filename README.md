# Compare Business Health Cover

SME business health insurance site for **https://comparebusinesshealthcover.co.uk/**

> **Do not confuse with HealthCoverCompare** (`Healthinsuranceleadgenerationfinal` repo → `healthcovercomparison.co.uk`).

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` deploy via Cloudflare Workers Builds to the **`comparebusinesshealthcover`** worker.

```bash
git remote -v   # must show CompareBusinessHealthCover.git only
git push origin main
```

Manual deploy:

```bash
npm run deploy
```
