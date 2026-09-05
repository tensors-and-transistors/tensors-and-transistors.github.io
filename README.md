# Tensors &amp; Transistors

Sitio web de la comunidad. Contenido técnico sobre la intersección entre software y hardware, en español e inglés.

Construido con [Astro](https://astro.build). Sitio estático, desplegado en Cloudflare Pages.

## Escribir un artículo

La guía completa está publicada en el propio sitio: **[Cómo publicar un artículo](https://tensorsandtransistors.com/es/tutorials/como-publicar/)**.

Versión corta: creas un `.md` en la carpeta de su sección e idioma, y haces push.

```
src/content/
├── blog/{es,en}/        Blog técnico
├── tutorials/{es,en}/   Tutoriales
└── papers/{es,en}/      Resúmenes de papers
```

## Desarrollo local

Requiere [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install     # solo la primera vez
npm run dev     # servidor local en http://localhost:4321
npm run build   # genera el sitio en dist/
npm run preview # sirve dist/ para revisar el resultado final
```

`npm run build` falla si algún artículo tiene el frontmatter mal formado. Eso es intencional: es la red de seguridad que impide publicar contenido roto.

## Estructura

| Ruta | Qué contiene |
|---|---|
| `src/content/` | Los artículos, en Markdown |
| `src/content.config.ts` | Esquema del frontmatter (qué campos son obligatorios) |
| `src/i18n/ui.ts` | Todos los textos de la interfaz, en ambos idiomas |
| `src/pages/` | Las rutas del sitio |
| `src/layouts/` | Plantilla común de todas las páginas |
| `src/components/` | Cabecera y pie |
| `src/styles/global.css` | Todo el diseño. Los colores son variables CSS al inicio del archivo |
| `public/` | Archivos servidos tal cual (favicon, robots.txt) |

## Idiomas

El sitio vive en `/es/` y `/en/`. La raíz `/` detecta el idioma del navegador y redirige.

Para enlazar la versión española e inglesa del mismo artículo, pon el mismo `translationKey` en el frontmatter de ambos. El botón de idioma saltará de uno al otro.

## Despliegue

Cada push a `main` dispara un build en Cloudflare Pages.

- Comando de build: `npm run build`
- Directorio de salida: `dist`

## Licencia

El **código** de este repositorio está bajo licencia [MIT](LICENSE).

El **contenido** (artículos, tutoriales, resúmenes y demás material educativo publicado en el sitio) está bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es): puedes reutilizarlo y adaptarlo citando la fuente, siempre que lo compartas bajo la misma licencia.
