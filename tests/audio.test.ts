/** Chaque question de compréhension orale a ses fichiers audio (normal et lent), lisibles. */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { readSequence } from '../scripts/read-content';

const AUDIO = join(import.meta.dirname, '..', 'public', 'audio');
const ecoute = () =>
  readSequence('guerra-civil')
    .questions.filter(f => !f.file.endsWith('professeur.json'))
    .flatMap(f => f.data as { id: string; type: string; disabled?: boolean }[])
    .filter(q => q.type === 'ecoute' && !q.disabled);

describe('audio de la compréhension orale', () => {
  it('il y a des questions d’écoute', () => {
    expect(ecoute().length).toBeGreaterThanOrEqual(30);
  });

  it('chaque question a son fichier normal et son fichier lent', () => {
    for (const q of ecoute()) {
      for (const f of [`${q.id}.mp3`, `${q.id}-lento.mp3`]) {
        const p = join(AUDIO, f);
        expect(existsSync(p), `fichier audio manquant : public/audio/${f} (relance scripts/generar-audio.py)`).toBe(true);
        expect(statSync(p).size, f).toBeGreaterThan(2000); // pas un fichier vide
        // un vrai mp3 : étiquette ID3 ou en-tête de trame
        const head = readFileSync(p).subarray(0, 3);
        expect(head.toString('latin1') === 'ID3' || (head[0] === 0xff && (head[1] & 0xe0) === 0xe0), f).toBe(true);
      }
    }
  });

  it('la version lente est plus longue que la version normale', () => {
    for (const q of ecoute().slice(0, 12)) {
      expect(statSync(join(AUDIO, `${q.id}-lento.mp3`)).size, q.id).toBeGreaterThan(statSync(join(AUDIO, `${q.id}.mp3`)).size);
    }
  });
});
