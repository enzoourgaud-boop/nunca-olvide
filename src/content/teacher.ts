/**
 * Modifications du professeur, enregistrées sur cet appareil (sans toucher aux fichiers d'origine) :
 * questions ajoutées ou modifiées, questions retirées, et éventuellement une autre séquence complète (« pack »).
 */
import type { RawContent } from '../engine/content';
import type { QuestionInput } from '../engine/schema';
import { storage } from '../storage';

export interface Overlay {
  v: 1;
  /** Questions ajoutées ou modifiées, par identifiant. */
  upserts: Record<string, QuestionInput>;
  /** Questions ajoutées par le professeur puis supprimées, ou questions d'origine retirées. */
  removed: string[];
}

export const emptyOverlay = (): Overlay => ({ v: 1, upserts: {}, removed: [] });

export const teacher = {
  overlay(): Overlay {
    const o = storage.get<Overlay | null>('prof:overlay', null);
    return o && o.v === 1 ? o : emptyOverlay();
  },
  saveOverlay(o: Overlay) {
    storage.set('prof:overlay', o);
  },
  pack(): RawContent | null {
    return storage.get<RawContent | null>('prof:pack', null);
  },
  savePack(p: RawContent | null) {
    if (p) storage.set('prof:pack', p);
    else storage.remove('prof:pack');
  },
  code(): string {
    return storage.get<string>('prof:code', 'profe2026');
  },
  setCode(c: string) {
    storage.set('prof:code', c);
  },
};

/** Applique les modifications du professeur au contenu brut. */
export function applyOverlay(raw: RawContent, o: Overlay): RawContent {
  const seen = new Set<string>();
  const removed = new Set(o.removed);
  const questions = raw.questions.map(f => ({
    file: f.file,
    data: Array.isArray(f.data)
      ? (f.data as { id?: string }[])
          .filter(q => !removed.has(String(q?.id)))
          .map(q => {
            const id = String(q?.id);
            if (o.upserts[id]) {
              seen.add(id);
              return o.upserts[id];
            }
            return q;
          })
      : f.data,
  }));
  const added = Object.entries(o.upserts).filter(([id]) => !seen.has(id) && !removed.has(id)).map(([, q]) => q);
  if (added.length) questions.push({ file: 'questions/professeur.json', data: added });
  return { ...raw, questions };
}
