// @ts-check
import { defineConfig } from 'astro/config';

// IMPORTANTE: cambia `site` por tu dominio real antes de desplegar.
// Se usa para generar URLs absolutas (compartir en redes, SEO).
export default defineConfig({
  site: 'https://tensorsandtransistors.com',

  // Genera /blog/mi-post/ en vez de /blog/mi-post.html
  build: {
    format: 'directory',
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
