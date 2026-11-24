import { describe, expect, it } from 'vitest';
import { checkCoherence, parseContent } from '../src/engine/content';
import { readSequence } from '../scripts/read-content';
import { content } from './helpers';

describe('banque de questions', () => {
  it('la séquence fournie est valide et compte au moins 200 questions', () => {
    const { content: c, issues } = parseContent(readSequence('guerra-civil'));
    expect(issues.filter(i => i.level === 'erreur')).toEqual([]);
    expect(c!.questions.length).toBeGreaterThanOrEqual(200);
  });
  it('chaque thème a des questions de niveaux 1, 2 et 3, et il existe un niveau jefe', () => {
    const c = content();
    for (const t of c.sequence.themes) for (const l of [1, 2, 3]) expect(c.questions.some(q => q.theme === t.id && q.level === l)).toBe(true);
    expect(c.questions.some(q => q.level === 'jefe')).toBe(true);
  });
  it('détecte une réponse présente parmi les distracteurs', () => {
    const c = content();
    const q0 = c.questions.find(q => q.type === 'qcm')! as Extract<(typeof c.questions)[number], { type: 'qcm' }>;
    const bad = { ...q0, distractors: [q0.answer.toUpperCase(), 'x', 'y'] };
    const issues = checkCoherence({ ...c, questions: [bad] });
    expect(issues.some(i => i.message.includes('est une bonne réponse'))).toBe(true);
  });
  it('détecte les identifiants et énoncés en double', () => {
    const c = content();
    const q = c.questions[5];
    expect(checkCoherence({ ...c, questions: [q, { ...q }] }).some(i => i.message.includes('utilisé 2 fois'))).toBe(true);
    expect(checkCoherence({ ...c, questions: [q, { ...q, id: 'copie' }] }).some(i => i.message.includes('même énoncé'))).toBe(true);
  });
  it('détecte un champ manquant', () => {
    const raw = readSequence('guerra-civil');
    const data = [{ id: 'sans-reponse', type: 'qcm', theme: 'historia', notions: ['cultura-fiesta'], level: 1, prompt: '¿?', distractors: ['a', 'b', 'c'], explanation: 'x', source: 'texto-ce' }];
    const { issues } = parseContent({ ...raw, questions: [{ file: 'test.json', data }] });
    expect(issues.some(i => i.where.includes('sans-reponse') && i.where.includes('answer'))).toBe(true);
  });
  it('détecte un nombre de trous incohérent', () => {
    const c = content();
    const q = { ...(c.questions.find(x => x.type === 'qcm' && x.prompt.includes('___'))! as Extract<(typeof c.questions)[number], { type: 'qcm' }>), answer: 'a / b / c' };
    expect(checkCoherence({ ...c, questions: [q] }).some(i => i.message.includes('trou'))).toBe(true);
  });
  it('pas de plus-que-parfait : uniquement passé simple et imparfait (consigne du professeur)', () => {
    const c = content();
    const PQP = /\bhab[ií]a(s|mos|is|n)?\s+\p{L}+(ado|ido|to|cho|sto)\b/iu;
    const textes = [
      ...c.questions.flatMap(q => [q.id, JSON.stringify(q)]),
      ...c.enemies.flatMap(e => [e.id, JSON.stringify(e)]),
      ...c.events.flatMap(e => [e.id, JSON.stringify(e)]),
      ...c.items.flatMap(i => [i.id, JSON.stringify(i)]),
    ];
    for (let i = 0; i < textes.length; i += 2) expect(PQP.test(textes[i + 1]), textes[i]).toBe(false);
    expect(PQP.test('una guerra que habían vivido')).toBe(true);
    expect(PQP.test('No había grandes batallas')).toBe(false); // imparfait de haber : autorisé
  });
});

describe('verbes irréguliers prioritaires', () => {
  it('ser, ir, tener, estar et hacer ont chacun au moins 12 questions (énoncé ou réponse avec leurs formes)', () => {
    const c = content();
    const forms: Record<string, RegExp> = {
      ser: /\bfu(i|iste|e|imos|isteis|eron)\b|\bser\b/i,
      ir: /\bfu(i|iste|e|imos|isteis|eron)\b|\bir\b/i,
      tener: /\btuv(e|iste|o|imos|isteis|ieron)\b|\btener\b/i,
      estar: /\bestuv(e|iste|o|imos|isteis|ieron)\b|\bestar\b/i,
      hacer: /\b(hice|hiciste|hizo|hicimos|hicisteis|hicieron)\b|\bhacer\b/i,
    };
    const text = (q: (typeof c.questions)[number]) => JSON.stringify([q.prompt, 'answer' in q ? q.answer : '', 'pairs' in q ? q.pairs : '']);
    for (const [v, re] of Object.entries(forms)) {
      const n = c.questions.filter(q => !q.disabled && re.test(text(q))).length;
      expect(n, v).toBeGreaterThanOrEqual(12);
    }
  });
  it('¿Ser o ir ? et Histoire ont au moins 50 questions chacun, et au moins 5 types de questions différents', () => {
    const c = content();
    for (const t of ['ser-ir', 'historia']) {
      const qs = c.questions.filter(q => !q.disabled && q.theme === t);
      expect(qs.length, t).toBeGreaterThanOrEqual(50);
      expect(new Set(qs.map(q => q.type)).size, t).toBeGreaterThanOrEqual(5);
    }
  });
});

describe('retraits demandés par le professeur', () => {
  it('aucune question ne parle de Carmen, de Pepe ni de la BD (énoncé, réponses, explication)', () => {
    const interdit = /Carmen|Pepe|tebeo|Bielsa|Huesca|División 43/i;
    for (const q of content().questions) expect(interdit.test(JSON.stringify(q)), q.id).toBe(false);
    expect(interdit.test('¿Cuántos años tenía Carmen?')).toBe(true);
  });
  it('plus de question d’écoute dans la banque', () => {
    expect(content().questions.filter(q => q.type === 'ecoute')).toHaveLength(0);
  });
});
