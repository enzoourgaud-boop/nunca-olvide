/**
 * Sprites « pixel art » originaux, dessinés dans un <canvas> basse résolution puis agrandis
 * sans lissage (image-rendering: pixelated).
 * - Ennemis : leur emoji (ou dessin SVG) est rendu en 32×32, palette réduite et contour sombre.
 * - Joueur : dessiné pixel par pixel (vu de dos, sombrero et bougie).
 */

const OUTLINE: [number, number, number] = [26, 15, 43]; // --noche

/** Réduit les couleurs (look rétro) et ajoute un contour sombre d'un pixel. */
function pixelize(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const solid = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const a = d[i * 4 + 3];
    if (a < 110) {
      d[i * 4 + 3] = 0;
      continue;
    }
    solid[i] = 1;
    d[i * 4 + 3] = 255;
    for (let k = 0; k < 3; k++) d[i * 4 + k] = Math.min(255, Math.round(d[i * 4 + k] / 51) * 51 + 12);
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (solid[i]) continue;
      const near = (x > 0 && solid[i - 1]) || (x < w - 1 && solid[i + 1]) || (y > 0 && solid[i - w]) || (y < h - 1 && solid[i + w]);
      if (near) {
        d[i * 4] = OUTLINE[0];
        d[i * 4 + 1] = OUTLINE[1];
        d[i * 4 + 2] = OUTLINE[2];
        d[i * 4 + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';

/** Dessin du papel picado (identique à la guirlande) pour les emojis « svg:papel-picado ». */
const PAPEL_SVG = (() => {
  const circ = (cx: number, cy: number, r: number) => `M${cx - r},${cy}a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0Z`;
  let holes = circ(26, 24, 5);
  for (let i = 0; i < 8; i++) holes += circ(26 + 11 * Math.cos((i * Math.PI) / 4), 24 + 11 * Math.sin((i * Math.PI) / 4), 2.6);
  const outer = 'M0,0H52V50L47.7,56L43.3,50L39,56L34.7,50L30.3,56L26,50L21.7,56L17.3,50L13,56L8.7,50L4.3,56L0,50Z';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -4 64 66"><path d="M-4,0H56" stroke="#6a5878" stroke-width="3"/><path fill="#ff3d8b" fill-rule="evenodd" d="${outer}${holes}"/></svg>`;
})();

/** Dessine un ennemi (emoji + éventuel accessoire au-dessus) dans le canvas. */
export function drawEnemy(canvas: HTMLCanvasElement, emoji: string, top?: string, res = 32): void {
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  ctx.clearRect(0, 0, res, res);
  const finish = () => {
    if (top) {
      ctx.font = `${Math.round(res * 0.42)}px ${EMOJI_FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(top, res / 2, res * 0.16);
    }
    try {
      pixelize(ctx, res, res);
    } catch {
      /* canvas illisible : on garde le dessin brut */
    }
  };
  if (emoji.startsWith('svg:')) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, res * 0.08, res * 0.08, res * 0.84, res * 0.84);
      finish();
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(PAPEL_SVG)}`;
    return;
  }
  ctx.font = `${Math.round(res * (top ? 0.74 : 0.86))}px ${EMOJI_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, res / 2, res * (top ? 0.6 : 0.54));
  finish();
}

/* ---------- Joueur, vu de dos (20 × 22) ---------- */
const PAL: Record<string, string> = {
  K: '#1a0f2b', H: '#ff9f1c', h: '#b5620a', b: '#ff3d8b', N: '#3a2418',
  P: '#ff3d8b', p: '#a8205a', T: '#22d1c6', S: '#c98a5b', L: '#3d2560', W: '#fff1dc', F: '#ffd23f', f: '#ff9f1c',
};
const PLAYER = [
  '........KKKK........',
  '.......KHHHHK.......',
  '......KHHHHHHK......',
  '......KbbbbbbK......',
  '..KKKKKHHHHHHKKKKK..',
  '.KHHHHHHHHHHHHHHHHK.',
  '..KKhhhhhhhhhhhhKK..',
  '.....KNNNNNNNNK..KK.',
  '.....KNNNNNNNNK.KFFK',
  '....KPPPPPPPPPPKKfFK',
  '...KPPPPPPPPPPPPKKfK',
  '..KPPTTTTTTTTTTPPKWK',
  '..KPPPPPPPPPPPPPPSWK',
  '..KpPPPPPPPPPPPPpSWK',
  '..KPPTTTTTTTTTTPPKWK',
  '..KpPPPPPPPPPPPPpKK.',
  '...KppppppppppppK...',
  '....KLLLLLKLLLLLK...',
  '....KLLLLLKLLLLLK...',
  '....KLLLLK.KLLLLK...',
  '....KKKKKK.KKKKKK...',
  '....................',
];

export const PLAYER_W = 20;
export const PLAYER_H = PLAYER.length;

export function drawPlayer(canvas: HTMLCanvasElement, palette: Partial<Record<string, string>> = {}): void {
  canvas.width = PLAYER_W;
  canvas.height = PLAYER_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, PLAYER_W, PLAYER_H);
  PLAYER.forEach((row, y) => {
    [...row.padEnd(PLAYER_W, '.')].slice(0, PLAYER_W).forEach((ch, x) => {
      const col = palette[ch] ?? PAL[ch];
      if (!col) return;
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 1, 1);
    });
  });
}
