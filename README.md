# Jorin's AI Picks

A curated list of the best AI tools and models, built with Astro and Sanity CMS.

## Tech Stack

- **Frontend**: [Astro](https://astro.build/) with Tailwind CSS
- **CMS**: [Sanity](https://www.sanity.io/)
- **Hosting**: [Vercel](https://vercel.com/)

## Project Structure

```
├── src/                 # Astro frontend
│   ├── components/      # UI components
│   ├── layouts/         # Page layouts
│   ├── lib/             # Sanity client
│   └── pages/           # Routes
├── sanity/              # Sanity Studio
│   └── schemaTypes/     # Content schemas
├── assets/              # Static assets (logos)
└── scripts/             # Migration scripts
```

## Development

### Frontend (Astro)

```bash
npm install
npm run dev
```

### Sanity Studio

```bash
cd sanity
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```
PUBLIC_SANITY_PROJECT_ID=dkobocct
PUBLIC_SANITY_DATASET=production
```

## Deployment

- Frontend auto-deploys to Vercel on push
- Sanity Studio: `cd sanity && npm run deploy`

## Content Schema

- **Company**: AI companies with logos
- **Category**: AI tool categories (Chat, Image, Video, etc.)
- **AI Model**: Individual models with rankings
- **Site Settings**: Global site configuration

## Migration

To re-run the initial data migration:

```bash
SANITY_TOKEN=xxx node scripts/migrate-to-sanity.js
```
