import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [tailwind()],
    output: 'static',
    site: 'https://jorins-personal-ai-picks.vercel.app',
    build: {
        format: 'directory',
        inlineStylesheets: 'always'
    }
});
