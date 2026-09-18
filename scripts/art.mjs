/**
 * Genera los dibujos de la portada como archivos estáticos:
 *
 *   node scripts/art.mjs
 *     → public/mosaic.svg       el fondo de unos y ceros
 *     → public/card-blog.svg    la ilustración de la tarjeta del blog
 *     → public/card-papers.svg  la de la tarjeta de explicaciones
 *
 * Antes estos dibujos se incrustaban en el HTML durante el build: unos
 * 4.000 elementos SVG que el navegador tenía que analizar, posicionar y
 * —en los 2.200 dígitos— medir como texto. La portada pesaba 350 KB.
 *
 * Como archivos aparte el navegador los trata como imágenes: los dibuja
 * una vez, no entran en el DOM y quedan en caché para la siguiente
 * visita. El HTML bajó a 15 KB y el DOM de 4.095 nodos a unas decenas.
 *
 * Todo es determinista —semilla fija y fases fijas—, así que el dibujo es
 * idéntico cada vez. Solo hay que relanzarlo si se tocan los parámetros.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIDTH = 1440;
const HEIGHT = 620;
const CELL = 15;
const SEED = 91;

function mosaic(width, height, cell, seed) {
  let state = seed >>> 0;
  const rand = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);

  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const side = cell - Math.max(2, cell * 0.2);
  const parts = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = rand();
      const px = x * cell;
      const py = y * cell;
      const o = (base, range) => (base + rand() * range).toFixed(2);

      if (v > 0.94) {
        parts.push(
          `<rect x="${px}" y="${py}" width="${side}" height="${side}" fill="#5eead4" opacity="${o(0.12, 0.26)}"/>`
        );
      } else if (v > 0.88) {
        parts.push(
          `<rect x="${px}" y="${py}" width="${side}" height="${side}" fill="#7dd3fc" opacity="${o(0.1, 0.22)}"/>`
        );
      } else if (v > 0.8) {
        parts.push(
          `<rect x="${px}" y="${py}" width="${side}" height="${side}" fill="none" stroke="#a5f3fc" stroke-width=".8" opacity="${o(0.14, 0.26)}"/>`
        );
      } else if (v > 0.28) {
        parts.push(
          `<text x="${px + side / 2}" y="${py + side / 2 + 3.2}" text-anchor="middle" font-size="${(cell * 0.5).toFixed(1)}" fill="#a5f3fc" opacity="${o(0.12, 0.32)}">${rand() > 0.5 ? 1 : 0}</text>`
        );
      }
    }
  }

  return parts.join('');
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" ` +
  `preserveAspectRatio="xMidYMid slice">` +
  `<g font-family="ui-monospace,SFMono-Regular,Menlo,monospace">` +
  mosaic(WIDTH, HEIGHT, CELL, SEED) +
  `</g></svg>`;


/* ---------------------------------------------------------------------
   Las tarjetas: un campo de color cuantizado en píxeles.

   No hay rejilla ni líneas. Lo que separa un píxel del vecino es el salto
   de tono: el color varía de forma continua, pero solo se permiten
   dieciséis tonos, así que el degradado se rompe en escalones.

   El campo sale de una suma de senos con fase fija. Los tramos
   horizontales del mismo tono se emiten como un solo rectángulo: en un
   campo suave eso reduce el archivo a una fracción.
   --------------------------------------------------------------------- */

const TONES = [
  '#0b2545',
  '#0d2e52',
  '#0f375e',
  '#10426b',
  '#0f4e77',
  '#0d5a81',
  '#0b6a8b',
  '#0a7a93',
  '#0c8a99',
  '#0f9a9c',
  '#13a89f',
  '#17b59c',
  '#22cba4',
  '#2fe0a8',
  '#48e9c3',
  '#5eead4',
];

const ART_COLS = 104;
const ART_ROWS = 35;

function pixelField(cols, rows, phase) {
  const parts = [];

  for (let y = 0; y < rows; y++) {
    let start = 0;
    let tone = -1;

    for (let x = 0; x <= cols; x++) {
      let next = -1;

      if (x < cols) {
        const u = x / (cols - 1);
        const v = y / (rows - 1);

        const f =
          0.5 +
          0.3 * Math.sin(5.6 * u + 2.3 * v + phase) +
          0.22 * Math.sin(2.4 * u - 4.6 * v + phase * 1.7) +
          0.15 * Math.sin(8.4 * (u + 0.35 * v) + phase * 0.6);

        // Se inclina hacia la diagonal del sitio: azul profundo a un lado,
        // aguamarina al otro. El exponente empuja hacia la parte honda.
        const p = Math.min(1, Math.max(0, 0.58 * f + 0.42 * (0.18 + 0.72 * u)));
        next = Math.round(Math.pow(p, 1.25) * (TONES.length - 1));
      }

      if (next !== tone) {
        if (tone >= 0) {
          parts.push(
            `<rect x="${start}" y="${y}" width="${x - start}" height="1" fill="${TONES[tone]}"/>`
          );
        }
        tone = next;
        start = x;
      }
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" ` +
    `preserveAspectRatio="none" shape-rendering="crispEdges">` +
    parts.join('') +
    `</svg>`
  );
}

/* ---------------------------------------------------------------------
   Escritura
   --------------------------------------------------------------------- */

const here = dirname(fileURLToPath(import.meta.url));

function write(name, contents) {
  const out = resolve(here, '../public', name);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, contents);
  console.log(`${name}: ${(contents.length / 1024).toFixed(0)} KB`);
}

write('mosaic.svg', svg);
write('card-blog.svg', pixelField(ART_COLS, ART_ROWS, 0.4));
write('card-papers.svg', pixelField(ART_COLS, ART_ROWS, 3.9));
