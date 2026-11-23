/**
 * Profils locaux : un avatar et un pseudo, uniquement sur cet appareil (PC partagés au collège).
 * Rien ne quitte l'appareil. Chaque profil a sa progression, son carnet (Leitner) et sa partie en cours.
 */
import type { RunState } from './engine/game';
import { emptyMeta, type Leitner, type Meta } from './engine/meta';
import { storage } from './storage';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  created: number;
}

interface Index {
  list: Profile[];
  current: string | null;
}

export const AVATARS = ['🌼', '💀', '🕯️', '🦋', '🐉', '🎺', '🎸', '👒', '🦉', '🐕', '🍞', '🪅', '🌙', '⭐', '🌵', '🐆'];

const k = (id: string, what: string) => `p:${id}:${what}`;

function readIndex(): Index {
  const idx = storage.get<Index | null>('profiles', null);
  if (idx && Array.isArray(idx.list)) return idx;
  // migration : sauvegarde d'avant les profils (étapes 1 à 3)
  const oldMeta = storage.get<{ bestWon?: number; wins?: number; runs?: number } | null>('meta', null);
  const oldRun = storage.get<RunState | null>('run', null);
  if (!oldMeta && !oldRun) return { list: [], current: null };
  const p: Profile = { id: newId(), name: 'Joueur 1', avatar: '🌼', created: Date.now() };
  const meta = { ...emptyMeta(), runs: oldMeta?.runs ?? 0, wins: oldMeta?.wins ?? 0, bestWon: oldMeta?.bestWon ?? 0 };
  storage.set(k(p.id, 'meta'), meta);
  storage.remove('meta');
  storage.remove('run');
  const out = { list: [p], current: p.id };
  storage.set('profiles', out);
  return out;
}

function newId(): string {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
}

export const profiles = {
  list(): Profile[] {
    return readIndex().list;
  },
  current(): Profile | null {
    const idx = readIndex();
    return idx.list.find(p => p.id === idx.current) ?? null;
  },
  select(id: string) {
    const idx = readIndex();
    if (idx.list.some(p => p.id === id)) storage.set('profiles', { ...idx, current: id });
  },
  create(name: string, avatar: string): Profile {
    const idx = readIndex();
    const p: Profile = { id: newId(), name: name.trim().slice(0, 20) || 'Joueur', avatar, created: Date.now() };
    storage.set('profiles', { list: [...idx.list, p], current: p.id });
    return p;
  },
  remove(id: string) {
    const idx = readIndex();
    for (const w of ['meta', 'leitner', 'run']) storage.remove(k(id, w));
    const list = idx.list.filter(p => p.id !== id);
    storage.set('profiles', { list, current: idx.current === id ? list[0]?.id ?? null : idx.current });
  },
  meta(id: string): Meta {
    return { ...emptyMeta(), ...storage.get<Partial<Meta>>(k(id, 'meta'), {}) };
  },
  saveMeta(id: string, m: Meta) {
    storage.set(k(id, 'meta'), m);
  },
  leitner(id: string): Leitner {
    return storage.get<Leitner>(k(id, 'leitner'), {});
  },
  saveLeitner(id: string, l: Leitner) {
    storage.set(k(id, 'leitner'), l);
  },
  run(id: string): RunState | null {
    const r = storage.get<RunState | null>(k(id, 'run'), null);
    return r && r.v === 3 && r.screen !== 'over' ? r : null;
  },
  saveRun(id: string, r: RunState) {
    storage.set(k(id, 'run'), r);
  },
  clearRun(id: string) {
    storage.remove(k(id, 'run'));
  },
};
