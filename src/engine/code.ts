/**
 * Code de fin de partie, à montrer ou recopier pour le professeur.
 * 19 caractères (alphabet de Crockford : pas de I, L, O, U pour éviter les confusions),
 * avec une somme de contrôle qui repère les fautes de recopie.
 * Aucune donnée personnelle : seulement le résultat, les notions ratées et la date.
 */
import type { RunState } from './game';
import type { Content } from './schema';

const ALPHA = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const EPOCH = Date.UTC(2025, 0, 1);
const DAY = 86400000;

export interface CodeData {
  win: boolean;
  character: number;
  act: number;
  ascension: number;
  ok: number;
  total: number;
  won: number;
  minutes: number;
  /** Date de la partie (jour). */
  date: Date;
  /** Indices des notions ratées dans sequence.notions. */
  missed: number[];
}

// [nom du champ, nombre de bits]
const LAYOUT: [string, number][] = [
  ['version', 4], ['win', 1], ['character', 2], ['act', 2], ['ascension', 4], ['ok', 8], ['total', 8], ['won', 6], ['minutes', 6],
  ['day', 12], ['missed', 24], ['seq', 8],
];
const DATA_BITS = LAYOUT.reduce((n, [, b]) => n + b, 0); // 85
const TOTAL_BITS = 95; // 85 + 8 de contrôle + 2 de bourrage = 19 caractères × 5 bits

function seqTag(id: string): number {
  let h = 7;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) & 0xff;
  return h;
}

function checksum(v: bigint): number {
  let c = 0x5a;
  for (let i = 0; i < DATA_BITS; i += 8) c = (c * 33 + Number((v >> BigInt(i)) & 0xffn)) & 0xff;
  return c;
}

export function encodeCode(d: CodeData, sequenceId: string): string {
  const day = Math.max(0, Math.floor((d.date.getTime() - EPOCH) / DAY)) % 4096;
  const missed = d.missed.filter(i => i < 24).reduce((m, i) => m | (1 << i), 0);
  const vals: Record<string, number> = {
    version: 1, win: d.win ? 1 : 0, character: Math.min(3, d.character), act: Math.min(3, d.act), ascension: Math.min(15, d.ascension),
    ok: Math.min(255, d.ok), total: Math.min(255, d.total), won: Math.min(63, d.won), minutes: Math.min(63, Math.round(d.minutes)),
    day, missed, seq: seqTag(sequenceId),
  };
  let v = 0n, shift = 0n;
  for (const [k, b] of LAYOUT) {
    v |= (BigInt(vals[k] >>> 0) & ((1n << BigInt(b)) - 1n)) << shift;
    shift += BigInt(b);
  }
  v |= BigInt(checksum(v)) << BigInt(DATA_BITS);
  let s = '';
  for (let i = 0; i < TOTAL_BITS / 5; i++) s += ALPHA[Number((v >> BigInt(i * 5)) & 31n)];
  return `${s.slice(0, 5)}-${s.slice(5, 10)}-${s.slice(10, 15)}-${s.slice(15)}`;
}

export type DecodeResult = { ok: true; data: CodeData } | { ok: false; error: string };

export function decodeCode(code: string, sequenceId: string): DecodeResult {
  const clean = code.toUpperCase().replace(/[\s-]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1').replace(/U/g, 'V');
  if (clean.length !== TOTAL_BITS / 5) return { ok: false, error: `Le code doit faire ${TOTAL_BITS / 5} caractères (sans compter les tirets).` };
  let v = 0n;
  for (let i = 0; i < clean.length; i++) {
    const n = ALPHA.indexOf(clean[i]);
    if (n < 0) return { ok: false, error: `Caractère inconnu : « ${clean[i]} ».` };
    v |= BigInt(n) << BigInt(i * 5);
  }
  const data = v & ((1n << BigInt(DATA_BITS)) - 1n);
  if (Number((v >> BigInt(DATA_BITS)) & 0xffn) !== checksum(data)) return { ok: false, error: 'Code invalide : il y a sans doute une faute de recopie.' };
  const vals: Record<string, number> = {};
  let shift = 0n;
  for (const [k, b] of LAYOUT) {
    vals[k] = Number((data >> shift) & ((1n << BigInt(b)) - 1n));
    shift += BigInt(b);
  }
  if (vals.version !== 1) return { ok: false, error: 'Version de code inconnue.' };
  if (vals.seq !== seqTag(sequenceId)) return { ok: false, error: 'Ce code vient d’une autre séquence.' };
  const missed: number[] = [];
  for (let i = 0; i < 24; i++) if (vals.missed & (1 << i)) missed.push(i);
  return {
    ok: true,
    data: {
      win: vals.win === 1, character: vals.character, act: vals.act, ascension: vals.ascension, ok: vals.ok, total: vals.total,
      won: vals.won, minutes: vals.minutes, date: new Date(EPOCH + vals.day * DAY), missed,
    },
  };
}

/** Données du code pour une partie terminée. */
export function codeDataFromRun(content: Content, r: RunState): CodeData {
  const qById = new Map(content.questions.map(q => [q.id, q]));
  const notionIdx = new Map(content.sequence.notions.map((n, i) => [n.id, i]));
  const missed = new Set<number>();
  for (const e of r.errors) for (const n of qById.get(e.id)?.notions ?? []) {
    const i = notionIdx.get(n);
    if (i !== undefined) missed.add(i);
  }
  return {
    win: r.result === 'win',
    character: Math.max(0, content.sequence.characters.findIndex(c => c.id === r.character)),
    act: r.result === 'win' ? content.sequence.acts.length : r.act + 1,
    ascension: r.ascension,
    ok: r.stats.ok,
    total: r.stats.ok + r.stats.ko + r.stats.casi,
    won: r.stats.won,
    minutes: (r.stats.endedAt - r.stats.startedAt) / 60000,
    date: new Date(r.stats.endedAt || Date.now()),
    missed: [...missed].sort((a, b) => a - b),
  };
}
