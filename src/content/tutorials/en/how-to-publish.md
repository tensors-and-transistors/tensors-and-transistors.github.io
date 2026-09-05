---
title: 'How to publish an article on this site'
description: 'The full flow: create the file, write the frontmatter, preview and publish. Start here before writing your first article.'
pubDate: 2026-09-04
tags: ['meta', 'guide']
translationKey: 'how-to-publish'
draft: false
---

This tutorial documents the site itself. Read it once and you will know how to publish anything.

## 1. Where the file goes

Every article is a `.md` (Markdown) file. The folder decides **the section** and **the language**:

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

The filename becomes the URL. Use lowercase, hyphens, no accents.

## 2. The frontmatter

Every file starts with a block between `---`. These are the metadata:

```markdown
---
title: 'INT8 quantization on microcontrollers'
description: 'How to shrink a model 4x without losing useful accuracy.'
pubDate: 2026-09-10
tags: ['embedded', 'ml']
draft: false
---
```

| Field | Required | What it does |
|---|---|---|
| `title` | yes | Article title and browser tab title |
| `description` | yes | Summary on the index and when shared on social |
| `pubDate` | yes | Sorts articles, newest first |
| `updatedDate` | no | If you revise it later |
| `tags` | no | List of tags |
| `translationKey` | no | Links this article to its version in the other language |
| `draft` | no | `true` hides it from the published site |

### About `translationKey`

Put **the same string** in the Spanish and English versions of the same article. The language button then jumps straight to the translation, even when the slugs differ. Omit it when there is no translation: the button falls back to the section index instead of a 404.

If a required field is missing or a date is invalid, **the build fails with a message naming the exact file and field**. That is deliberate: it stops half-finished work from shipping.

## 3. Write

Below the frontmatter, plain Markdown. Code blocks get syntax highlighting automatically.

## 4. Preview before publishing

In the project folder:

```bash
npm run dev
```

Open `http://localhost:4321`. Every time you save, the page reloads itself.

## 5. Publish

```bash
git add .
git commit -m "Add article on INT8 quantization"
git push
```

Cloudflare picks up the push, rebuilds the site and publishes it. Takes about a minute.
