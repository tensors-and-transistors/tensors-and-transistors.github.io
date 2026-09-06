export const LANGS = ['es', 'en'] as const;
export const DEFAULT_LANG = 'es';
export const SECTIONS = ['blog', 'tutorials', 'papers'] as const;

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
    'site.tagline': 'La intersección entre software y hardware, en español.',
    'site.intro':
      'Contenido técnico riguroso sobre sistemas embebidos, machine learning y todo lo que ocurre donde el código toca el silicio. Sin humo, sin cursos que vender.',

    'nav.blog': 'Blog técnico',
    'nav.tutorials': 'Tutoriales',
    'nav.papers': "Paper's summary",
    'nav.home': 'Inicio',

    'section.blog.title': 'Blog técnico',
    'section.blog.desc':
      'Artículos de fondo: arquitectura, decisiones de diseño y lo que aprendemos construyendo.',
    'section.tutorials.title': 'Tutoriales',
    'section.tutorials.desc':
      'Guías paso a paso, reproducibles de principio a fin. Si no compila en tu máquina, es un bug nuestro.',
    'section.papers.title': 'Resúmenes de papers',
    'section.papers.desc':
      'Lecturas de artículos científicos destiladas a lo esencial: qué proponen, por qué importa y qué se puede usar hoy.',

    'list.empty': 'Todavía no hay nada publicado aquí. Pronto.',
    'list.readMore': 'Leer',
    'list.count.one': 'artículo',
    'list.count.many': 'artículos',

    'post.published': 'Publicado el',
    'post.updated': 'Actualizado el',
    'post.back': 'Volver a',

    'lang.switch': 'English',
    'lang.switchLabel': 'Ver esta página en inglés',

    'home.explore': 'Explora',
    'footer.built': 'Construido en abierto.',
    'footer.source': 'Código fuente',
  },
  en: {
    'site.tagline': 'Where software meets hardware.',
    'site.intro':
      'Rigorous technical writing on embedded systems, machine learning, and everything that happens where code touches silicon. No hype, no courses to sell.',

    'nav.blog': 'Technical blog',
    'nav.tutorials': 'Tutorials',
    'nav.papers': "Paper's summary",
    'nav.home': 'Home',

    'section.blog.title': 'Technical blog',
    'section.blog.desc':
      'Long-form articles: architecture, design decisions, and what we learn while building.',
    'section.tutorials.title': 'Tutorials',
    'section.tutorials.desc':
      'Step-by-step guides, reproducible end to end. If it does not build on your machine, that is our bug.',
    'section.papers.title': 'Paper summaries',
    'section.papers.desc':
      'Research papers distilled to what matters: what they propose, why it matters, and what you can use today.',

    'list.empty': 'Nothing published here yet. Soon.',
    'list.readMore': 'Read',
    'list.count.one': 'article',
    'list.count.many': 'articles',

    'post.published': 'Published on',
    'post.updated': 'Updated on',
    'post.back': 'Back to',

    'lang.switch': 'Español',
    'lang.switchLabel': 'View this page in Spanish',

    'home.explore': 'Explore',
    'footer.built': 'Built in the open.',
    'footer.source': 'Source code',
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
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** El otro idioma disponible. Con dos idiomas, es simplemente el contrario. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
