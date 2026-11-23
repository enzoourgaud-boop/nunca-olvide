/**
 * Logique propre à chaque type de question : façon de répondre, correction, réponse attendue.
 *
 * Les réponses « structurées » (ordre, association, scène) circulent sous forme de texte JSON :
 * - ordre       : ["Los niños", "están", …]               (étiquettes dans l'ordre choisi)
 * - association : {"la vela": "🕯️", …}                    (mot → image)
 * - scène       : {"vela": "arriba|izquierda", …}          (objet → rangée|colonne)
 */
import { type CheckOptions, checkAnswer, normalize, type Verdict } from './answer';
import type { ChoiceQuestion, Question, SceneRef, Scenes } from './schema';

/** Façon de répondre à une question posée. */
export type Mode = 'qcm' | 'write' | 'order' | 'match' | 'place' | 'tf';

export const TF_OPTIONS = ['verdadero', 'falso'] as const;

export function isChoice(q: Question): q is ChoiceQuestion {
  return q.type === 'qcm' || q.type === 'ecrit' || q.type === 'ecoute';
}

/** La question peut-elle être posée à l'écrit ? */
export function isWritable(q: Question): boolean {
  return q.type === 'ecrit' || ((q.type === 'qcm' || q.type === 'ecoute') && q.writable);
}

/** Modes qui demandent un effort de production (dégâts renforcés). */
export const STRONG_MODES: Mode[] = ['write', 'order', 'match', 'place'];

/** Mode imposé par le type (null = QCM ou écrit, au choix du moteur). */
export function fixedMode(q: Question): Mode | null {
  switch (q.type) {
    case 'vrai-faux': return 'tf';
    case 'ordre': return 'order';
    case 'association': return 'match';
    case 'scene': return 'place';
    case 'ecrit': return 'write';
    default: return null;
  }
}

export function orderTokens(q: Extract<Question, { type: 'ordre' }>): string[] {
  return q.tokens ?? q.answer.split(/\s+/);
}

/* ---------- scènes ---------- */

export function cellPhrase(scenes: Scenes, decorId: string, row?: string, col?: string): string {
  const d = scenes.decors.find(x => x.id === decorId);
  if (!d) return '';
  const r = d.rows.find(x => x[0] === row)?.[1];
  const c = d.cols.find(x => x[0] === col)?.[1];
  if (r && c && r === c) return r; // « en el centro » une seule fois
  return [r, c].filter(Boolean).join(', ');
}

export function sceneAnswerText(ref: SceneRef, scenes: Scenes): string {
  return ref.items
    .map(it => {
      const o = scenes.objects.find(x => x.id === it.object);
      return `${o?.emoji ?? ''} ${o?.es ?? it.object} → ${cellPhrase(scenes, ref.decor, it.row, it.col)}`;
    })
    .join(' · ');
}

/* ---------- réponse attendue ---------- */

/** Réponse lisible (carnet d'erreurs, correction affichée). */
export function answerText(q: Question, scenes?: Scenes): string {
  switch (q.type) {
    case 'vrai-faux': return q.answer === 'verdadero' ? 'Verdadero' : 'Falso';
    case 'association': return q.pairs.map(([w, img]) => `${w} = ${img}`).join(' · ');
    case 'scene': return scenes ? sceneAnswerText(q.scene, scenes) : q.prompt;
    default: return q.answer;
  }
}

/** Valeur qui serait jugée correcte (Oráculo, tests, bot de simulation). */
export function canonicalValue(q: Question): string {
  switch (q.type) {
    case 'ordre': return JSON.stringify(orderTokens(q));
    case 'association': return JSON.stringify(Object.fromEntries(q.pairs));
    case 'scene': {
      return JSON.stringify(Object.fromEntries(q.scene.items.map(it => [it.object, `${it.row ?? ''}|${it.col ?? ''}`])));
    }
    default: return q.answer;
  }
}

/** Une mauvaise réponse plausible (tests et simulation). */
export function wrongValue(q: Question, options: string[]): string {
  switch (q.type) {
    case 'vrai-faux': return q.answer === 'verdadero' ? 'falso' : 'verdadero';
    case 'ordre': return JSON.stringify([...orderTokens(q)].reverse());
    case 'association': {
      const imgs = q.pairs.map(p => p[1]);
      return JSON.stringify(Object.fromEntries(q.pairs.map(([w], i) => [w, imgs[(i + 1) % imgs.length]])));
    }
    case 'scene': return JSON.stringify({});
    default: return options.find(o => o !== q.answer) ?? 'zzz';
  }
}

function parseJson<T>(v: string): T | null {
  try {
    return JSON.parse(v) as T;
  } catch {
    return null;
  }
}

/** Corrige une réponse, quel que soit le type. null = réponse vide ou incomplète. */
export function judgeQuestion(q: Question, mode: Mode, value: string, opts: CheckOptions): Verdict | null {
  switch (q.type) {
    case 'vrai-faux':
      return value === q.answer ? 'ok' : value === 'verdadero' || value === 'falso' ? 'ko' : null;
    case 'ordre': {
      const toks = parseJson<string[]>(value);
      if (!toks || !toks.length) return null;
      // l'ordre des mots compte, pas les accents (les étiquettes sont déjà écrites)
      return checkAnswer(toks.join(' '), [orderTokens(q).join(' '), q.answer, ...q.accept], { ...opts, accents: 'strict' }) === 'ok' ? 'ok' : 'ko';
    }
    case 'association': {
      const m = parseJson<Record<string, string>>(value);
      if (!m || Object.keys(m).length < q.pairs.length) return null;
      return q.pairs.every(([w, img]) => m[w] === img) ? 'ok' : 'ko';
    }
    case 'scene': {
      const m = parseJson<Record<string, string>>(value);
      if (!m) return null;
      const okAll = q.scene.items.every(it => {
        const got = m[it.object];
        if (!got) return false;
        const [r, c] = got.split('|');
        return (!it.row || it.row === r) && (!it.col || it.col === c);
      });
      return okAll ? 'ok' : 'ko';
    }
    default:
      if (mode === 'qcm') return normalize(value) === normalize(q.answer) ? 'ok' : value ? 'ko' : null;
      return checkAnswer(value, [q.answer, ...q.accept], opts);
  }
}

/** Réponse donnée, lisible (carnet d'erreurs). */
export function givenText(q: Question, value: string | null, scenes?: Scenes): string | null {
  if (value === null) return null;
  switch (q.type) {
    case 'vrai-faux': return value === 'verdadero' ? 'Verdadero' : 'Falso';
    case 'ordre': return parseJson<string[]>(value)?.join(' ') ?? value;
    case 'association': {
      const m = parseJson<Record<string, string>>(value) ?? {};
      return Object.entries(m).map(([w, i]) => `${w} = ${i}`).join(' · ');
    }
    case 'scene': {
      const m = parseJson<Record<string, string>>(value) ?? {};
      if (!scenes) return '';
      return Object.entries(m)
        .map(([o, cell]) => {
          const [r, c] = cell.split('|');
          return `${scenes.objects.find(x => x.id === o)?.es ?? o} → ${cellPhrase(scenes, q.scene.decor, r, c)}`;
        })
        .join(' · ');
    }
    default: return value;
  }
}

/** Indice des Tijeras pour les types sans QCM. */
export function scissorsHint(q: Question, scenes: Scenes): string {
  switch (q.type) {
    case 'ordre': {
      const t = orderTokens(q);
      return `La phrase commence par : « ${t.slice(0, Math.max(1, Math.floor(t.length / 3))).join(' ')} … »`;
    }
    case 'association': return `${q.pairs[0][0]} = ${q.pairs[0][1]}`;
    case 'scene': {
      const it = q.scene.items[0];
      const o = scenes.objects.find(x => x.id === it.object);
      return `${o?.es ?? it.object} → ${cellPhrase(scenes, q.scene.decor, it.row, it.col)}`;
    }
    default: return '';
  }
}

/* ---------- proximité entre questions (éviter les enchaînements qui se répondent) ---------- */

const STOP = new Set(
  ('para como pero porque cuando donde quien quienes cual cuales tiene tienen este esta esto estos estas ese esa eso '
  + 'estoy estas esta estamos estais estan muy mucho muchos muchas otro otra todos todas sobre entre hasta desde '
  + 'pour avec dans quel quelle quels quelles comment dit-on veut dire mot cette celui sont elle elles nous vous '
  + 'leur leurs tres plus moins bien fait faire etre avoir traduis donne remets phrase ordre place objets scene '
  + 'associe image chaque espagnol francais ecoute choisis entends question reponse bonne verdadero falso').split(' '),
);

/** Mot réduit à sa racine approximative : sans accent, sans « s » final, 6 lettres au plus. */
function stem(w: string): string {
  return w.replace(/s$/, '').slice(0, 6);
}

function wordsOf(text: string): string[] {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 4 && !STOP.has(w))
    .map(stem);
}

/** Mots importants d'une question (énoncé + réponse + contenu propre au type). */
export function questionWords(q: Question): { all: Set<string>; answer: Set<string> } {
  let ans = '';
  let extra = '';
  switch (q.type) {
    case 'association': ans = q.pairs.map(p => p[0]).join(' '); break;
    case 'scene': ans = q.scene.items.map(i => i.object).join(' '); break;
    case 'vrai-faux': ans = ''; break;
    case 'ecoute': ans = q.answer; extra = q.say ?? ''; break;
    case 'ordre': ans = q.answer; break;
    default: ans = q.answer;
  }
  const answer = new Set(wordsOf(ans));
  const all = new Set([...wordsOf(q.prompt), ...answer, ...wordsOf(extra)]);
  return { all, answer };
}
