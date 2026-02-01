import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    integrations: [tailwind()],
    output: 'hybrid',
    adapter: vercel({
        runtime: 'nodejs20.x'
    }),
    site: 'https://jorins-personal-ai-picks.vercel.app',
    build: {
        format: 'directory',
        inlineStylesheets: 'always'
    }
});
