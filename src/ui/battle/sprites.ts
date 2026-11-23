/**
 * Sprites « pixel art » originaux, dessinés dans un <canvas> basse résolution puis agrandis
 * sans lissage (image-rendering: pixelated).
 * - Ennemis : leur emoji (ou dessin SVG) est rendu en 32×32, palette réduite et contour sombre.
 * - Joueur : dessiné pixel par pixel (un enfant vu de dos, la boîte de souvenirs sous le bras).
 */

const OUTLINE: [number, number, number] = [28, 22, 18]; // --noche (encre)

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
  ctx.font = `${Math.round(res * (top ? 0.74 : 0.86))}px ${EMOJI_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, res / 2, res * (top ? 0.6 : 0.54));
  finish();
}

/* ---------- Joueur : un enfant vu de dos, la boîte de souvenirs sous le bras (20 × 22) ---------- */
const PAL: Record<string, string> = {
  K: '#1c1612', H: '#d9973a', h: '#8a5a1f', b: '#c0574a', N: '#3a2418',
  P: '#c0574a', p: '#7d3a31', T: '#7fb3c9', S: '#c98a5b', L: '#43372b', W: '#f1e6cf', F: '#e3c16f', f: '#d9973a',
};
const PLAYER = [
  '....................',
  '.......KKKKKK.......',
  '......KHHHHHHK......',
  '.....KHHHHHHHHK.....',
  '.....KHHhHHhHHK.....',
  '.....KHHHHHHHHK.....',
  '......KhHHHHhK......',
  '.......KSSSSK.......',
  '.....KKPPPPPPKK.....',
  '....KPPPPPPPPPPK....',
  '...KPPPPPPPPPPPPK...',
  '...KPPTTTTTTTTPPKKKK',
  '...KPPPPPPPPPPPPKFFK',
  '...KpPPPPPPPPPPpKFfK',
  '...KSKPPPPPPPPKSKFFK',
  '....KKppppppppKKKKK.',
  '.....KLLLLKLLLLK....',
  '.....KLLLLKLLLLK....',
  '.....KLLLLKLLLLK....',
  '.....KLLLK..KLLLK...',
  '.....KKKKK..KKKKK...',
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
