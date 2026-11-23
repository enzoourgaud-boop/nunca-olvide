/**
 * Correction tolérante des réponses écrites.
 *
 * Étapes : minuscules → ponctuation retirée (¿ ¡ . , « » / …) → espaces normalisés
 * → (option) articles facultatifs → (option) pronom sujet facultatif → comparaison.
 * Si seuls des accents ou un tilde (ñ) diffèrent, le verdict est « casi » (presque).
 */

export type Verdict = 'ok' | 'casi' | 'ko';
export type AccentPolicy = 'casi' | 'accept' | 'strict';

export interface CheckOptions {
  ignoreArticles: boolean;
  optionalSubject: boolean;
  /** casi : « ¡Casi! » sans pénalité · accept : compté juste · strict : compté faux */
  accents: AccentPolicy;
  /** Pretérito : un accent qui change la forme (habló → hablo, tuvo → tuvó) est une vraie erreur. */
  accentChangesForm?: boolean;
}

export const DEFAULT_CHECK: CheckOptions = { ignoreArticles: false, optionalSubject: true, accents: 'casi' };

/**
 * L'accent oublié ou ajouté change-t-il la forme du verbe ?
 * - accent final -ó / -é oublié : habló → hablo (présent), luché → luche (subjonctif) ;
 * - accent ajouté là où la réponse n'en a pas : tuvo → tuvó (les prétérits forts n'ont aucun accent).
 */
export function accentChangesForm(input: string, expected: string): boolean {
  const goods = new Map(normalize(expected).split(' ').map(w => [stripAccents(w), w]));
  return normalize(input).split(' ').some(w => {
    const g = goods.get(stripAccents(w));
    if (!g || g === w) return false;
    if (/[óé]$/.test(g) && /[oe]$/.test(w)) return true;
    return [...w].some((ch, i) => ch !== g[i] && stripAccents(ch) !== ch && stripAccents(g[i] ?? '') === g[i]);
  });
}

const PUNCT = /[¿?¡!.,;:«»"“”‘()[\]{}/\\…–—-]/g;

export function normalize(s: string): string {
  return String(s ?? '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(PUNCT, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Retire les accents et le tilde : á→a, ñ→n, ü→u. */
export function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}

const ARTICLES = /^(el|la|los|las|un|una|unos|unas|lo|l'|le|les|des|une|du)\s+/;
const SUBJECTS = /^(yo|tú|tu|él|ella|usted|nosotros|nosotras|vosotros|vosotras|ellos|ellas|ustedes)\s+/;
/** Sans accents, « el » peut être le pronom « él » mal accentué. */
const SUBJECTS_BARE = /^(yo|tu|el|ella|usted|nosotros|nosotras|vosotros|vosotras|ellos|ellas|ustedes)\s+/;

function variants(s: string, o: CheckOptions, bare = false): string[] {
  const out = new Set<string>([s]);
  if (o.optionalSubject) for (const v of [...out]) out.add(v.replace(bare ? SUBJECTS_BARE : SUBJECTS, ''));
  if (o.ignoreArticles) for (const v of [...out]) out.add(v.replace(ARTICLES, ''));
  return [...out].filter(Boolean);
}

/**
 * Compare la saisie de l'élève aux réponses acceptées.
 * Renvoie null si la saisie est vide (rien à corriger).
 */
export function checkAnswer(input: string, expected: string[], opts: Partial<CheckOptions> = {}): Verdict | null {
  const o = { ...DEFAULT_CHECK, ...opts };
  const n = normalize(input);
  if (!n) return null;
  const mine = variants(n, o);
  const goods = expected.flatMap(e => variants(normalize(e), o));
  if (mine.some(m => goods.includes(m))) return 'ok';
  const mineBare = variants(stripAccents(n), o, true);
  const goodsBare = expected.flatMap(e => variants(stripAccents(normalize(e)), o, true));
  if (mineBare.some(m => goodsBare.includes(m))) {
    if (o.accents === 'casi' && o.accentChangesForm && expected.some(e => accentChangesForm(input, e))) return 'ko';
    return o.accents === 'accept' ? 'ok' : o.accents === 'strict' ? 'ko' : 'casi';
  }
  return 'ko';
}

/** Remplit les trous ___ d'un énoncé avec la réponse (« es / está » → deux trous). */
export function fillBlanks(prompt: string, answer: string): string {
  if (!prompt.includes('___')) return answer;
  const parts = answer.split(' / ');
  let i = 0;
  const out = prompt.replace(/___/g, () => parts[i++] ?? answer).replace(/\s*\([^)]*\)\s*$/, '');
  // majuscule en début de phrase (« ___ estoy… » → « Yo estoy… »), y compris après ¿ ou ¡
  return out.replace(/^([¿¡«\s]*)(\p{Ll})/u, (_, a: string, b: string) => a + b.toUpperCase());
}

/** Indice automatique : première lettre et nombre de lettres. */
export function autoHint(answer: string): string {
  const core = answer.replace(ARTICLES, '');
  const letters = core.replace(/[^\p{L}]/gu, '').length;
  return `La réponse commence par « ${core.charAt(0).toUpperCase()} » et compte ${letters} lettres.`;
}

/** Masque une lettre sur deux (pouvoir Tijeras à l'écrit). */
export function maskAnswer(answer: string): string {
  let i = 0;
  return [...answer].map(c => (/\p{L}/u.test(c) ? (i++ % 2 === 0 ? c : '_') : c)).join('');
}
