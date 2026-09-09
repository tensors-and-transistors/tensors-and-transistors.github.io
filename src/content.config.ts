import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Esquema común a las tres secciones.
 * Es el "contrato" que debe cumplir el frontmatter de cada .md.
 * Si un artículo no lo cumple, el build falla con un mensaje claro
 * en vez de publicar algo roto.
 */
const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  /**
   * Une la versión en español y en inglés del MISMO artículo.
   * Pon la misma cadena en ambos archivos y el botón de idioma
   * saltará de uno al otro, aunque los slugs sean distintos.
   * Si lo omites, el botón lleva al índice de la sección.
   */
  translationKey: z.string().optional(),
  /**
   * Solo para el blog: en qué rama del panel lateral se cuelga.
   * El orden de las ramas lo fija `BLOG_CATEGORIES` en i18n/ui.ts.
   */
  category: z.enum(['deep-learning', 'hardware']).optional(),
});

/** Cada sección lee los .md de su propia carpeta. */
const section = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: postSchema,
  });

export const collections = {
  blog: section('blog'),
  tutorials: section('tutorials'),
  papers: section('papers'),
};
