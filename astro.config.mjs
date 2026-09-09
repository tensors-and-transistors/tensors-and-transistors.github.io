// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// IMPORTANTE: cambia `site` por tu dominio real antes de desplegar.
// Se usa para generar URLs absolutas (compartir en redes, SEO).
export default defineConfig({
  site: 'https://tensorsandtransistors.com',

  // Genera /blog/mi-post/ en vez de /blog/mi-post.html
  build: {
    format: 'directory',
  },

  markdown: {
    // Matemáticas en los artículos: $inline$ y $$en bloque$$.
    // remark-math reconoce la sintaxis, rehype-katex la convierte en HTML
    // durante el build. El navegador no ejecuta nada: llega ya renderizado.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
