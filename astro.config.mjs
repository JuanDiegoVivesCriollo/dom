// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://domtranssportuk.co.uk',
  outDir: './out',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});