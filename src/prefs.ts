/**
 * Préférences de confort de l'appareil (pas du profil) : son, taille du texte, police dyslexie,
 * animations, pétales. Elles s'appliquent par des classes sur <html>.
 */
import { storage } from './storage';

export type TextSize = 'normal' | 'grand' | 'projecteur';

export interface Prefs {
  sound: boolean;
  volume: number;
  size: TextSize;
  dyslexia: boolean;
  /** auto = suit le réglage du système ; reduced = toujours réduites. */
  motion: 'auto' | 'reduced';
  petals: boolean;
}

export const DEFAULT_PREFS: Prefs = { sound: true, volume: 0.6, size: 'normal', dyslexia: false, motion: 'auto', petals: true };

export function loadPrefs(): Prefs {
  return { ...DEFAULT_PREFS, ...storage.get<Partial<Prefs>>('prefs', {}) };
}

export function savePrefs(p: Prefs) {
  storage.set('prefs', p);
  applyPrefs(p);
}

export function applyPrefs(p: Prefs) {
  if (typeof document === 'undefined') return;
  const c = document.documentElement.classList;
  c.toggle('dys', p.dyslexia);
  c.toggle('taille-grand', p.size === 'grand');
  c.toggle('taille-proj', p.size === 'projecteur');
  c.toggle('reduit', p.motion === 'reduced');
}

/** Animations réduites : réglage du jeu ou du système. */
export function motionReduced(): boolean {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduit')) return true;
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
