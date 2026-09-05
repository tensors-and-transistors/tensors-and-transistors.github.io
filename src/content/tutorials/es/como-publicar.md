---
title: 'Cómo publicar un artículo en este sitio'
description: 'El flujo completo: crear el archivo, escribir el frontmatter, previsualizar y publicar. Empieza aquí antes de escribir tu primer artículo.'
pubDate: 2026-09-04
tags: ['meta', 'guía']
translationKey: 'how-to-publish'
draft: false
---

Este tutorial documenta el propio sitio. Léelo una vez y ya sabrás publicar cualquier cosa.

## 1. Dónde va el archivo

Cada artículo es un archivo `.md` (Markdown). La carpeta decide **la sección** y **el idioma**:

```
src/content/
├── blog/
│   ├── es/mi-articulo.md      → /es/blog/mi-articulo/
│   └── en/my-article.md       → /en/blog/my-article/
├── tutorials/
│   ├── es/ ...                → /es/tutorials/...
│   └── en/ ...
└── papers/
    ├── es/ ...                → /es/papers/...
    └── en/ ...
```

El nombre del archivo se convierte en la URL. Úsalo en minúsculas, con guiones y sin acentos: `cuantizacion-int8.md`, no `Cuantización INT8.md`.

## 2. El frontmatter

Todo archivo empieza con un bloque entre `---`. Son los metadatos:

```markdown
---
title: 'Cuantización INT8 en microcontroladores'
description: 'Cómo reducir un modelo 4× sin perder precisión útil.'
pubDate: 2026-09-10
tags: ['embebidos', 'ml']
draft: false
---
```

| Campo | Obligatorio | Qué hace |
|---|---|---|
| `title` | sí | Título del artículo y de la pestaña del navegador |
| `description` | sí | Resumen en el índice y en las redes al compartir |
| `pubDate` | sí | Ordena los artículos, del más reciente al más antiguo |
| `updatedDate` | no | Si lo revisas más tarde |
| `tags` | no | Lista de etiquetas |
| `translationKey` | no | Une este artículo con su versión en el otro idioma |
| `draft` | no | `true` lo oculta del sitio publicado |

### Sobre `translationKey`

Pon **la misma cadena** en la versión española y en la inglesa del mismo artículo:

```yaml
# en src/content/blog/es/cuantizacion-int8.md
translationKey: 'int8-quantization'

# en src/content/blog/en/int8-quantization.md
translationKey: 'int8-quantization'
```

Así el botón de idioma salta directamente del artículo a su traducción, aunque los slugs sean distintos. Si un artículo no tiene traducción, omítelo: el botón llevará al índice de la sección en vez de a un 404.

Si te falta un campo obligatorio o pones una fecha inválida, **el build falla con un mensaje que dice exactamente qué archivo y qué campo**. Eso es intencional: evita que se publique algo a medias.

## 3. Escribir

Debajo del frontmatter, Markdown normal:

````markdown
## Un encabezado

Texto en **negrita** y en *cursiva*. Un [enlace](https://example.com).

- Una lista
- Con dos elementos

```c
// El código se colorea solo
uint8_t quantize(float x, float scale) {
    return (uint8_t)(x / scale + 0.5f);
}
```
````

## 4. Ver el resultado antes de publicar

En la carpeta del proyecto:

```bash
npm run dev
```

Abre `http://localhost:4321`. Cada vez que guardes el archivo, la página se actualiza sola. **No hace falta reiniciar nada.**

## 5. Publicar

```bash
git add .
git commit -m "Añade artículo sobre cuantización INT8"
git push
```

Cloudflare detecta el push, reconstruye el sitio y lo publica. Tarda alrededor de un minuto.

## Un consejo

Escribe primero el artículo en español, publícalo, y traduce después. Un artículo bueno en un idioma vale más que dos mediocres en dos.
