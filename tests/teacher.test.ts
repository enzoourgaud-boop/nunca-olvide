import { describe, expect, it } from 'vitest';
import { applyOverlay, emptyOverlay } from '../src/content/teacher';
import { CLASS_CODE_THEMES, decodeClass, describeSettings, encodeClass, parseClassLink } from '../src/engine/classCode';
import { parseContent } from '../src/engine/content';
import { fromCsv, parseCsv, toCsv } from '../src/engine/csv';
import { DEFAULT_SETTINGS } from '../src/engine/game';
import { readSequence } from '../scripts/read-content';
import { content } from './helpers';

describe('code de classe', () => {
  it('encode puis décode les réglages', () => {
    const seq = content().sequence;
    const s = { ...DEFAULT_SETTINGS, themes: ['ser-ir', 'historia'], types: ['qcm', 'vrai-faux'], chrono: false, chronoFactor: 1.5, writeFactor: 0, accents: 'strict' as const };
    const code = encodeClass(s, seq);
    expect(code).toMatch(/^[0-9A-Z]{6}$/);
    expect(decodeClass(code, seq)).toEqual({ themes: s.themes, types: s.types, chrono: false, chronoFactor: 1.5, writeFactor: 0, accents: 'strict', short: false, shortAct: 0 });
  });
  it('le code de classe peut imposer la partie courte', () => {
    const seq = content().sequence;
    const d = decodeClass(encodeClass({ ...DEFAULT_SETTINGS, short: true, chrono: true }, seq), seq)!;
    expect(d.short).toBe(true);
    expect(d.chrono).toBe(true);
    expect(d.shortAct).toBe(0);
    expect(describeSettings(d, seq)).toEqual(['Chrono', 'Partie courte (un acte)']);
  });
  it('le professeur peut imposer l’acte de la partie courte, sans toucher aux thèmes', () => {
    const seq = content().sequence;
    for (const act of [1, 2, 3]) {
      const s = { ...DEFAULT_SETTINGS, short: true, shortAct: act, themes: ['regulares', 'historia'], types: ['qcm', 'ecoute'] };
      const d = decodeClass(encodeClass(s, seq), seq)!;
      expect(d).toMatchObject({ short: true, shortAct: act, themes: ['regulares', 'historia'], types: ['qcm', 'ecoute'] });
      expect(describeSettings(d, seq).join(' ')).toContain(`acte ${act} : ${seq.acts[act - 1].name}`);
    }
    // l'acte n'est pas retenu si la partie courte n'est pas imposée
    expect(decodeClass(encodeClass({ ...DEFAULT_SETTINGS, shortAct: 3 }, seq), seq)!.shortAct).toBe(0);
    // un ancien code (sans acte) reste lisible : au hasard
    expect(decodeClass(encodeClass({ ...DEFAULT_SETTINGS, short: true }, seq), seq)!.shortAct).toBe(0);
  });
  it('le code de classe a de la place pour les thèmes de la séquence (6 au plus, avec l’acte)', () => {
    expect(content().sequence.themes.length).toBeLessThanOrEqual(CLASS_CODE_THEMES);
  });
  it('les réglages par défaut donnent « tous les thèmes, tous les types »', () => {
    const seq = content().sequence;
    const d = decodeClass(encodeClass(DEFAULT_SETTINGS, seq), seq)!;
    expect(d.themes).toBeNull();
    expect(d.types).toBeNull();
    expect(describeSettings(d, seq)).toEqual(['Réglages par défaut']);
  });
  it('refuse un code mal recopié et lit le lien avec graine', () => {
    const seq = content().sequence;
    const code = encodeClass({ ...DEFAULT_SETTINGS, chrono: false }, seq);
    // la somme de contrôle rejette presque toutes les fautes de frappe sur un caractère
    const alpha = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    let accepted = 0;
    for (const ch of alpha) if (ch !== code[0] && decodeClass(ch + code.slice(1), seq)) accepted++;
    expect(accepted).toBeLessThanOrEqual(3);
    expect(parseClassLink(`#classe-${code}-VELA-12`)).toEqual({ code, seed: 'VELA-12' });
    expect(parseClassLink(code.toLowerCase())).toEqual({ code, seed: '' });
    expect(parseClassLink('#prof')).toBeNull();
  });
});

describe('CSV', () => {
  it('toute la banque survit à un aller-retour CSV', () => {
    const qs = content().questions;
    const csv = toCsv(qs);
    expect(csv.startsWith('﻿')).toBe(true);
    const back = fromCsv(csv);
    expect(back.errors).toEqual([]);
    expect(back.questions).toEqual(qs);
  });
  it('lit un CSV retouché dans un tableur (virgules, guillemets, retours à la ligne)', () => {
    const rows = parseCsv('id,prompt\r\na,"Hola, ""amigo""\nadiós"\r\n');
    expect(rows).toEqual([['id', 'prompt'], ['a', 'Hola, "amigo"\nadiós']]);
  });
  it('signale les lignes invalides avec leur numéro', () => {
    const csv = 'id;type;theme;level;notions;prompt;answer;distractors;explanation;source\nbonne;qcm;cultura;1;cultura-fiesta;¿Qué?;Sí;No | Tal vez | Nunca;x;texto-ce\nmauvaise;qcm;cultura;9;cultura-fiesta;¿Qué?;Sí;No;x;texto-ce\n';
    const r = fromCsv(csv);
    expect(r.questions.map(q => q.id)).toEqual(['bonne']);
    expect(r.errors[0].line).toBe(3);
    expect(r.errors[0].id).toBe('mauvaise');
  });
});

describe('modifications du professeur', () => {
  it('ajoute, modifie, retire des questions sans toucher aux fichiers d’origine', () => {
    const raw = readSequence('guerra-civil');
    const o = emptyOverlay();
    const first = (raw.questions[0].data as { id: string; prompt: string }[])[0];
    o.upserts[first.id] = { ...(first as object), prompt: 'Énoncé modifié' } as never;
    o.upserts['prof-nueva'] = { id: 'prof-nueva', type: 'vrai-faux', theme: 'historia', notions: ['hist-fechas'], level: 1, prompt: 'La fiesta es en noviembre.', answer: 'verdadero', explanation: 'Sí.', source: 'evaluacion' };
    const second = (raw.questions[0].data as { id: string }[])[1].id;
    o.removed.push(second);
    const { content: c, issues } = parseContent(applyOverlay(raw, o));
    expect(issues.filter(i => i.level === 'erreur')).toEqual([]);
    expect(c!.questions.find(q => q.id === first.id)!.prompt).toBe('Énoncé modifié');
    expect(c!.questions.some(q => q.id === 'prof-nueva')).toBe(true);
    expect(c!.questions.some(q => q.id === second)).toBe(false);
    // l'original n'a pas bougé
    expect((raw.questions[0].data as { prompt: string }[])[0].prompt).not.toBe('Énoncé modifié');
  });
});

describe('fichier professeur.json dans le dépôt', () => {
  it('ses questions remplacent celles d’origine de même identifiant, sans doublon', () => {
    const raw = readSequence('guerra-civil');
    const orig = (raw.questions[0].data as { id: string; prompt: string }[])[0];
    const mod = { ...(orig as object), prompt: 'Version du professeur' };
    const neu = { id: 'prof-extra', type: 'vrai-faux', theme: 'historia', notions: ['hist-fechas'], level: 1, prompt: 'Se baila mucho.', answer: 'verdadero', explanation: 'Sí.', source: 'evaluacion' };
    const { content: c, issues } = parseContent({ ...raw, questions: [...raw.questions, { file: 'questions/professeur.json', data: [mod, neu] }] });
    expect(issues.filter(i => i.level === 'erreur')).toEqual([]);
    expect(c!.questions.filter(q => q.id === orig.id)).toHaveLength(1);
    expect(c!.questions.find(q => q.id === orig.id)!.prompt).toBe('Version du professeur');
    expect(c!.questions.some(q => q.id === 'prof-extra')).toBe(true);
  });
});
