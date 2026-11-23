/**
 * Export / import CSV de la banque de questions, pour l'éditer dans un tableur (Excel, LibreOffice).
 * Séparateur « ; », encodage UTF-8 avec BOM (les accents s'affichent bien dans Excel).
 * Les listes (réponses acceptées, distracteurs, notions) sont séparées par « | ».
 * Les données propres aux types ordre / association / scène sont dans la colonne « avance » (JSON).
 */
import { QuestionSchema, type Question } from './schema';

export const CSV_COLUMNS = [
  'id', 'type', 'theme', 'level', 'notions', 'label', 'prompt', 'promptLang', 'answer', 'answerLang', 'accept', 'distractors',
  'writable', 'translation', 'explanation', 'source', 'disabled', 'avance',
] as const;

const LIST = ' | ';

function cell(v: string): string {
  return /[";\n\r]/.test(v) || v !== v.trim() ? `"${v.replace(/"/g, '""')}"` : v;
}

export function toCsv(qs: Question[]): string {
  const rows = [CSV_COLUMNS.join(';')];
  for (const q of qs) {
    const r = q as Record<string, unknown>;
    const avance: Record<string, unknown> = {};
    for (const k of ['tokens', 'extra', 'pairs', 'scene', 'say', 'emoji', 'check']) if (r[k] !== undefined && !(Array.isArray(r[k]) && !(r[k] as unknown[]).length)) avance[k] = r[k];
    const vals: Record<string, string> = {
      id: q.id, type: q.type, theme: q.theme, level: String(q.level), notions: q.notions.join(LIST), label: q.label ?? '',
      prompt: q.prompt, promptLang: q.promptLang, answer: typeof r.answer === 'string' ? r.answer : '', answerLang: q.answerLang,
      accept: Array.isArray(r.accept) ? (r.accept as string[]).join(LIST) : '', distractors: Array.isArray(r.distractors) ? (r.distractors as string[]).join(LIST) : '',
      writable: r.writable ? 'oui' : '', translation: q.translation, explanation: q.explanation, source: q.source, disabled: q.disabled ? 'oui' : '',
      avance: Object.keys(avance).length ? JSON.stringify(avance) : '',
    };
    rows.push(CSV_COLUMNS.map(c => cell(vals[c] ?? '')).join(';'));
  }
  return '﻿' + rows.join('\r\n') + '\r\n';
}

/** Découpe un CSV (guillemets, retours à la ligne dans les cellules). Détecte « ; » ou « , ». */
export function parseCsv(text: string): string[][] {
  const t = text.replace(/^﻿/, '');
  const firstLine = t.split(/\r?\n/, 1)[0] ?? '';
  const sep = (firstLine.match(/;/g)?.length ?? 0) >= (firstLine.match(/,/g)?.length ?? 0) ? ';' : ',';
  const rows: string[][] = [];
  let row: string[] = [], cur = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (q) {
      if (ch === '"' && t[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === sep) {
      row.push(cur);
      cur = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && t[i + 1] === '\n') i++;
      row.push(cur);
      cur = '';
      if (row.some(c => c !== '')) rows.push(row);
      row = [];
    } else cur += ch;
  }
  row.push(cur);
  if (row.some(c => c !== '')) rows.push(row);
  return rows;
}

export interface CsvImport {
  questions: Question[];
  errors: { line: number; id: string; message: string }[];
}

/** Lit un CSV exporté (ou modifié dans un tableur) et valide chaque ligne. */
export function fromCsv(text: string): CsvImport {
  const rows = parseCsv(text);
  const out: CsvImport = { questions: [], errors: [] };
  if (!rows.length) return out;
  const head = rows[0].map(h => h.trim());
  const idx = (c: string) => head.indexOf(c);
  if (idx('id') < 0 || idx('type') < 0) {
    out.errors.push({ line: 1, id: '', message: 'La première ligne doit contenir les noms de colonnes (id, type, …).' });
    return out;
  }
  const list = (v: string) => v.split('|').map(x => x.trim()).filter(Boolean);
  rows.slice(1).forEach((r, k) => {
    const get = (c: string) => (idx(c) >= 0 ? (r[idx(c)] ?? '').trim() : '');
    const line = k + 2;
    const id = get('id');
    try {
      const level = get('level');
      const obj: Record<string, unknown> = {
        id, type: get('type'), theme: get('theme'), level: level === 'jefe' ? 'jefe' : Number(level),
        notions: list(get('notions')), prompt: get('prompt'), explanation: get('explanation'), source: get('source'),
      };
      const opt = (k: string, v: unknown) => {
        if (v !== '' && v !== undefined && !(Array.isArray(v) && !v.length)) obj[k] = v;
      };
      opt('label', get('label'));
      opt('promptLang', get('promptLang'));
      opt('answerLang', get('answerLang'));
      opt('translation', get('translation'));
      opt('answer', get('answer'));
      opt('accept', list(get('accept')));
      opt('distractors', list(get('distractors')));
      if (/^(oui|yes|1|true|vrai)$/i.test(get('writable'))) obj.writable = true;
      if (/^(oui|yes|1|true|vrai)$/i.test(get('disabled'))) obj.disabled = true;
      if (get('avance')) Object.assign(obj, JSON.parse(get('avance')));
      // champs qui n'existent pas pour certains types
      if (obj.type === 'vrai-faux') obj.answer = String(obj.answer ?? '').toLowerCase();
      if (['association', 'scene'].includes(String(obj.type))) delete obj.answer;
      if (!['qcm', 'ecrit', 'ecoute'].includes(String(obj.type))) delete obj.distractors;
      if (!['qcm', 'ecrit', 'ecoute', 'ordre'].includes(String(obj.type))) delete obj.accept;
      if (!['qcm', 'ecoute'].includes(String(obj.type))) delete obj.writable;
      const res = QuestionSchema.safeParse(obj);
      if (res.success) out.questions.push(res.data);
      else out.errors.push({ line, id, message: res.error.issues.map(i => `${i.path.join('.') || 'question'} : ${i.message}`).join(' ; ') });
    } catch (e) {
      out.errors.push({ line, id, message: `colonne « avance » illisible (${(e as Error).message})` });
    }
  });
  return out;
}
