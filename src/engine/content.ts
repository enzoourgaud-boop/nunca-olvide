/** Validation et contrôles de cohérence du contenu, partagés par le jeu et le script `npm run valider`. */
import {
  type Content, EnemySchema, EventSchema, ItemSchema, QuestionSchema, ScenesSchema, SequenceSchema, SynergySchema, type EventOutcome, type Question,
} from './schema';
import { normalize } from './answer';
import { isChoice, orderTokens } from './questions';
import { z } from 'zod';

export interface Issue {
  level: 'erreur' | 'attention';
  where: string;
  message: string;
}

function zodIssues(where: string, err: z.ZodError): Issue[] {
  return err.issues.map(i => ({ level: 'erreur', where: `${where}${i.path.length ? ' › ' + i.path.join('.') : ''}`, message: i.message }));
}

/** Fichier des ajouts et modifications du professeur. */
export const isTeacherFile = (file: string) => /(^|\/)professeur\.json$/.test(file);

export interface RawContent {
  sequence: unknown;
  questions: { file: string; data: unknown }[];
  enemies: unknown;
  items: unknown;
  events: unknown;
  synergies: unknown;
  scenes: unknown;
}

/** Valide le contenu brut. Les questions invalides sont écartées (le jeu reste jouable), mais signalées. */
export function parseContent(raw: RawContent): { content: Content | null; issues: Issue[] } {
  const issues: Issue[] = [];
  const seq = SequenceSchema.safeParse(raw.sequence);
  if (!seq.success) issues.push(...zodIssues('sequence.json', seq.error));
  const enemies = z.array(EnemySchema).safeParse(raw.enemies);
  if (!enemies.success) issues.push(...zodIssues('enemies.json', enemies.error));
  const items = z.array(ItemSchema).safeParse(raw.items);
  if (!items.success) issues.push(...zodIssues('items.json', items.error));
  const events = z.array(EventSchema).safeParse(raw.events ?? []);
  if (!events.success) issues.push(...zodIssues('events.json', events.error));
  const synergies = z.array(SynergySchema).safeParse(raw.synergies ?? []);
  if (!synergies.success) issues.push(...zodIssues('synergies.json', synergies.error));
  const scenes = ScenesSchema.safeParse(raw.scenes ?? { decors: [], objects: [] });
  if (!scenes.success) issues.push(...zodIssues('scenes.json', scenes.error));

  const questions: Question[] = [];
  // le fichier « professeur.json » (exporté depuis l'espace professeur) est lu en dernier :
  // ses questions remplacent celles d'origine qui portent le même identifiant
  const files = [...raw.questions].sort((x, y) => Number(isTeacherFile(x.file)) - Number(isTeacherFile(y.file)));
  for (const { file, data } of files) {
    if (!Array.isArray(data)) {
      issues.push({ level: 'erreur', where: file, message: 'le fichier doit contenir une liste [ … ]' });
      continue;
    }
    data.forEach((q, i) => {
      const r = QuestionSchema.safeParse(q);
      const id = (q && typeof q === 'object' && 'id' in q && String((q as { id: unknown }).id)) || `#${i + 1}`;
      if (r.success) {
        const prev = isTeacherFile(file) ? questions.findIndex(x => x.id === r.data.id) : -1;
        if (prev >= 0) questions[prev] = r.data;
        else questions.push(r.data);
      } else issues.push(...zodIssues(`${file} › ${id}`, r.error));
    });
  }
  if (!seq.success || !enemies.success || !items.success || !events.success || !synergies.success || !scenes.success) return { content: null, issues };
  const content: Content = {
    sequence: seq.data, enemies: enemies.data, items: items.data, questions, events: events.data, synergies: synergies.data, scenes: scenes.data,
  };
  issues.push(...checkCoherence(content));
  return { content, issues };
}

/** Contrôles qui dépassent le schéma : doublons, références, réponses parmi les distracteurs… */
export function checkCoherence(c: Content): Issue[] {
  const out: Issue[] = [];
  const err = (where: string, message: string) => out.push({ level: 'erreur', where, message });
  const warn = (where: string, message: string) => out.push({ level: 'attention', where, message });

  const themes = new Map(c.sequence.themes.map(t => [t.id, t]));
  const notions = new Set(c.sequence.notions.map(n => n.id));
  const sources = new Set(c.sequence.sources.map(s => s.id));
  const enemies = new Map(c.enemies.map(e => [e.id, e]));
  const items = new Set(c.items.map(i => i.id));

  // questions
  const ids = new Map<string, number>();
  const prompts = new Map<string, string>();
  for (const q of c.questions) {
    const w = `question ${q.id}`;
    ids.set(q.id, (ids.get(q.id) ?? 0) + 1);
    // ce qui rend une question unique : l'énoncé, et selon le type la phrase entendue, les paires ou la scène
    const extra =
      q.type === 'ecoute' ? q.say ?? q.answer
      : q.type === 'association' ? JSON.stringify(q.pairs)
      : q.type === 'scene' || (q.type === 'qcm' && q.scene) ? JSON.stringify(q.scene)
      : '';
    const key = normalize(`${q.label ?? ''} ${q.prompt}`) + '¦' + extra;
    const prev = prompts.get(key);
    if (prev && prev !== q.id) err(w, `même énoncé que la question ${prev}`);
    else prompts.set(key, q.id);

    const theme = themes.get(q.theme);
    if (!theme) err(w, `thème inconnu « ${q.theme} »`);
    for (const n of q.notions) if (!notions.has(n)) err(w, `notion inconnue « ${n} » (à déclarer dans sequence.json)`);
    if (!sources.has(q.source)) err(w, `source inconnue « ${q.source} » (à déclarer dans sequence.json)`);

    if (isChoice(q)) {
      const goods = [q.answer, ...q.accept].map(normalize);
      const ds = q.distractors.map(normalize);
      ds.forEach((d, i) => {
        if (goods.includes(d)) err(w, `le distracteur « ${q.distractors[i]} » est une bonne réponse`);
        if (ds.indexOf(d) !== i) err(w, `le distracteur « ${q.distractors[i]} » apparaît deux fois`);
      });
      if (q.prompt.includes('___')) {
        const holes = q.prompt.split('___').length - 1;
        const parts = q.answer.split(' / ').length;
        if (holes !== parts) err(w, `${holes} trou(s) ___ dans l'énoncé mais ${parts} partie(s) dans la réponse (séparer par « / »)`);
      }
    }
    if (q.type === 'ordre') {
      const toks = orderTokens(q);
      if (normalize(toks.join(' ')) !== normalize(q.answer)) err(w, `les étiquettes « ${toks.join(' | ')} » ne recomposent pas la réponse`);
      if (toks.length < 3) warn(w, 'moins de 3 étiquettes : trop facile');
      for (const x of q.extra) if (toks.map(normalize).includes(normalize(x))) err(w, `l'étiquette piège « ${x} » fait partie de la réponse`);
    }
    if (q.type === 'association') {
      const ws = q.pairs.map(p => normalize(p[0])), im = q.pairs.map(p => p[1]);
      if (new Set(ws).size !== ws.length) err(w, 'un mot apparaît deux fois');
      if (new Set(im).size !== im.length) err(w, 'une image apparaît deux fois');
    }
    const sceneRef = q.type === 'scene' ? q.scene : q.type === 'qcm' ? q.scene : undefined;
    if (sceneRef) {
      const d = c.scenes.decors.find(x => x.id === sceneRef.decor);
      if (!d) err(w, `décor inconnu « ${sceneRef.decor} » (voir scenes.json)`);
      const cells = new Set<string>();
      for (const it of sceneRef.items) {
        if (!c.scenes.objects.some(o => o.id === it.object)) err(w, `objet inconnu « ${it.object} »`);
        if (d && it.row && !d.rows.some(r => r[0] === it.row)) err(w, `rangée inconnue « ${it.row} »`);
        if (d && it.col && !d.cols.some(r => r[0] === it.col)) err(w, `colonne inconnue « ${it.col} »`);
        if (it.row && it.col) {
          const k = `${it.row}|${it.col}`;
          if (cells.has(k)) err(w, `deux objets au même endroit (${k})`);
          cells.add(k);
        }
      }
      if (q.type === 'scene' && new Set(sceneRef.items.map(i => i.object)).size !== sceneRef.items.length) err(w, 'le même objet est placé deux fois');
    }
    if (q.promptLang === 'es' && !q.translation && !theme?.translationOptional) warn(w, 'traduction manquante (le Traductor sera inutilisable)');
  }
  for (const [id, n] of ids) if (n > 1) err(`question ${id}`, `identifiant utilisé ${n} fois`);

  // quantités minimales pour que le jeu tourne
  for (const t of c.sequence.themes) {
    for (const l of [1, 2, 3] as const) {
      const n = c.questions.filter(q => q.theme === t.id && q.level === l && !q.disabled).length;
      if (n === 0) warn(`thème ${t.id}`, `aucune question de niveau ${l}`);
    }
  }
  if (!c.questions.some(q => q.level === 'jefe')) warn('banque', 'aucune question de niveau « jefe »');

  // ennemis et actes
  const cards = new Map<number, string>();
  for (const e of c.enemies) {
    const o = cards.get(e.card);
    if (o) err(`ennemi ${e.id}`, `numéro de carte ${e.card} déjà pris par ${o}`);
    cards.set(e.card, e.id);
    for (const p of e.phases ?? []) for (const t of p.themes ?? []) if (!themes.has(t)) err(`ennemi ${e.id}`, `thème inconnu « ${t} » dans la phase ${p.name}`);
  }
  for (const a of c.sequence.acts) {
    for (const id of [...a.enemies, ...a.elites, a.boss]) if (!enemies.has(id)) err(`acte ${a.id}`, `ennemi inconnu « ${id} »`);
    for (const id of a.elites) if (enemies.get(id) && enemies.get(id)!.kind !== 'elite') err(`acte ${a.id}`, `« ${id} » n'est pas un élite`);
  }
  for (const id of Object.keys(c.sequence.player.startItems)) if (!items.has(id)) err('sequence.json › player.startItems', `objet inconnu « ${id} »`);

  // cartes de lotería : numéros uniques entre ennemis et objets
  for (const it of c.items) {
    if (it.card === undefined) continue;
    const o = cards.get(it.card);
    if (o) err(`objet ${it.id}`, `numéro de carte ${it.card} déjà pris par ${o}`);
    cards.set(it.card, it.id);
  }
  // personnages
  for (const ch of c.sequence.characters) {
    for (const id of [...Object.keys(ch.bonus.items ?? {}), ...Object.keys(ch.bonus.relics ?? {})]) if (!items.has(id)) err(`personnage ${ch.id}`, `objet inconnu « ${id} »`);
    if (ch.unlock.type === 'boss' && !enemies.has(ch.unlock.value)) err(`personnage ${ch.id}`, `ennemi inconnu « ${ch.unlock.value} »`);
  }
  if (!c.sequence.characters.some(ch => ch.unlock.type === 'default')) err('sequence.json › characters', 'il faut au moins un personnage disponible dès le départ');

  // synergies
  for (const sy of c.synergies) {
    for (const id of sy.items) {
      const it = c.items.find(i => i.id === id);
      if (!it) err(`synergie ${sy.id}`, `objet inconnu « ${id} »`);
      else if (it.kind !== 'reliquia') err(`synergie ${sy.id}`, `« ${id} » doit être une relique`);
    }
  }

  // événements
  const checkOutcome = (where: string, o: EventOutcome) => {
    for (const e of o.effects) {
      if (e.type === 'item' && e.id && !items.has(e.id)) err(where, `objet inconnu « ${e.id} »`);
      if (e.type === 'random') e.outcomes.forEach(x => x.effects.forEach(f => f.type === 'item' && f.id && !items.has(f.id) && err(where, `objet inconnu « ${f.id} »`)));
    }
  };
  const evIds = new Set<string>();
  for (const ev of c.events) {
    const w = `événement ${ev.id}`;
    if (evIds.has(ev.id)) err(w, 'identifiant en double');
    evIds.add(ev.id);
    for (const a of ev.acts ?? []) if (a > c.sequence.acts.length) err(w, `acte ${a} inexistant`);
    ev.choices.forEach((ch, i) => {
      for (const t of ch.quiz?.themes ?? []) if (!themes.has(t)) err(`${w} › choix ${i + 1}`, `thème inconnu « ${t} »`);
      for (const o of [ch.outcome, ch.success, ch.failure]) if (o) checkOutcome(`${w} › choix ${i + 1}`, o);
    });
  }
  if (!c.events.length) warn('events.json', 'aucun événement : les salles « Evento » seront remplacées par des combats');
  return out;
}
