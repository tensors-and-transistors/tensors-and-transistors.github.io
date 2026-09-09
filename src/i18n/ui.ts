export const LANGS = ['es', 'en'] as const;
export const DEFAULT_LANG = 'es';

/** Todas las secciones con contenido. Siguen existiendo sus rutas. */
export const SECTIONS = ['blog', 'tutorials', 'papers'] as const;

/**
 * Las que aparecen en el menú. Tutoriales existe pero está oculto
 * hasta que haya contenido propio: quitarlo de aquí no rompe sus URLs.
 */
export const NAV_SECTIONS = ['blog', 'papers'] as const;

/**
 * Las ramas del panel lateral del blog, en el orden en que se muestran.
 * Cada artículo declara la suya en el frontmatter (`category`).
 */
export const BLOG_CATEGORIES = ['deep-learning', 'hardware'] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type Lang = (typeof LANGS)[number];
export type Section = (typeof SECTIONS)[number];

export const SITE_NAME = 'Tensors & Transistors';

/**
 * Todos los textos de la interfaz viven aquí, en un solo lugar.
 * Para añadir o cambiar una palabra del sitio, la editas una vez
 * en cada idioma y se actualiza en todas las páginas.
 */
export const ui = {
  es: {
    'site.tagline': 'Deep learning y hardware.',
    'site.intro':
      'Cómo funcionan por dentro las redes neuronales y el silicio que las ejecuta. Del kernel de una convolución al presupuesto de memoria de un microcontrolador. Sin humo, sin cursos que vender.',

    'nav.blog': 'Blog técnico',
    'nav.tutorials': 'Tutoriales',
    'nav.papers': 'Resúmenes',
    'nav.home': 'Home',
    'nav.news': 'Noticias',
    'nav.newsLabel': 'Noticias — se abre en una pestaña nueva',
    'nav.menu': 'Abrir el menú',

    'aside.blog': 'Contenidos',
    'aside.papers': 'Otros resúmenes',
    'aside.empty': 'Todavía nada aquí.',
    'aside.index': 'Índice',
    'cat.deep-learning': 'Deep Learning',
    'cat.hardware': 'Hardware',

    'section.blog.title': 'Blog técnico',
    'section.blog.desc':
      'Artículos de fondo sobre arquitecturas, decisiones de diseño y lo que aprendemos midiendo.',
    'section.tutorials.title': 'Tutoriales',
    'section.tutorials.desc':
      'Guías paso a paso, reproducibles de principio a fin. Si no compila en tu máquina, es un bug nuestro.',
    'section.papers.title': 'Resúmenes de papers',
    'section.papers.desc':
      'Investigación en deep learning y arquitectura de computadores, destilada a qué proponen, por qué importa y qué se puede usar hoy.',

    'list.empty': 'Todavía no hay nada publicado aquí. Pronto.',
    'list.readMore': 'Leer',

    'post.published': 'Publicado el',
    'post.updated': 'Actualizado el',
    'post.back': 'Volver a',

    'lang.switch': 'English',
    'lang.switchLabel': 'Ver esta página en inglés',
    'lang.noteLabel': 'Sobre los idiomas',
    'lang.note':
      'Te recomendamos cambiar de idioma desde aquí: cada versión está curada en su propio idioma.',

    'home.explore': 'Explora',

    'news.title': 'Noticias',
    'news.heading': 'En construcción',
    'news.body':
      'Estamos preparando un espacio dedicado a noticias técnicas sobre inteligencia artificial. Todavía no está listo.',
    'news.back': 'Volver al inicio',
  },
  en: {
    'site.tagline': 'Deep learning and hardware.',
    'site.intro':
      'How neural networks actually work, and how the silicon that runs them works too. From a convolution kernel to a microcontroller memory budget. No hype, no courses to sell.',

    'nav.blog': 'Technical blog',
    'nav.tutorials': 'Tutorials',
    'nav.papers': 'Summaries',
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.newsLabel': 'News — opens in a new tab',
    'nav.menu': 'Open the menu',

    'aside.blog': 'Contents',
    'aside.papers': 'Other summaries',
    'aside.empty': 'Nothing here yet.',
    'aside.index': 'Index',
    'cat.deep-learning': 'Deep Learning',
    'cat.hardware': 'Hardware',

    'section.blog.title': 'Technical blog',
    'section.blog.desc':
      'Long-form articles on architectures, design decisions, and what we learn from measuring.',
    'section.tutorials.title': 'Tutorials',
    'section.tutorials.desc':
      'Step-by-step guides, reproducible end to end. If it does not build on your machine, that is our bug.',
    'section.papers.title': 'Paper summaries',
    'section.papers.desc':
      'Deep learning and computer architecture research, distilled to what it proposes, why it matters, and what you can use today.',

    'list.empty': 'Nothing published here yet. Soon.',
    'list.readMore': 'Read',

    'post.published': 'Published on',
    'post.updated': 'Updated on',
    'post.back': 'Back to',

    'lang.switch': 'Español',
    'lang.switchLabel': 'View this page in Spanish',
    'lang.noteLabel': 'About languages',
    'lang.note':
      'We recommend switching languages here: each version is curated in its own language.',

    'home.explore': 'Explore',

    'news.title': 'News',
    'news.heading': 'Under construction',
    'news.body':
      'We are building a space dedicated to technical news on artificial intelligence. It is not ready yet.',
    'news.back': 'Back to home',
  },
} as const;

type Key = keyof (typeof ui)['es'];

/** Devuelve el texto de la interfaz para un idioma. */
export function t(lang: Lang, key: Key): string {
  return (ui[lang] as Record<string, string>)[key] ?? (ui.es as Record<string, string>)[key] ?? key;
}

/** Formatea una fecha en el idioma correspondiente. */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    // Mes abreviado: la fecha acompaña, no encabeza.
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** El otro idioma disponible. Con dos idiomas, es simplemente el contrario. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
