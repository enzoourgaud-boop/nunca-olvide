import { describe, expect, it } from 'vitest';
import { content } from './helpers';
import { simulate } from './sim';
import { DEFAULT_SETTINGS } from '../src/engine/game';

const N = 120;
const run = (acc: number) => Array.from({ length: N }, (_, i) => simulate(content(), `BAL-${i}`, acc));
const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length);

describe('équilibrage (simulation)', () => {
  it('un très bon élève (90 %) gagne presque toujours, en 15 à 25 minutes', () => {
    const rs = run(0.9);
    expect(rs.filter(r => r.win).length / N).toBeGreaterThan(0.85);
    const m = avg(rs.map(r => r.minutes));
    expect(m).toBeGreaterThan(15);
    expect(m).toBeLessThan(25);
  });
  it('un élève moyen (75 %) gagne parfois, mais pas toujours', () => {
    const w = run(0.75).filter(r => r.win).length / N;
    expect(w).toBeGreaterThan(0.3);
    expect(w).toBeLessThan(0.9);
  });
  it('un élève fragile (60 %) dépasse le premier acte dans au moins deux parties sur trois', () => {
    const rs = run(0.6);
    expect(rs.filter(r => r.win || r.act >= 1).length / N).toBeGreaterThan(0.66);
    // et la partie ne s'éternise pas
    expect(avg(rs.map(r => r.minutes))).toBeLessThan(21);
  });
  it('répondre au hasard ne suffit pas pour gagner', () => {
    expect(run(0.4).filter(r => r.win).length).toBe(0);
  });
  it('une partie gagnée par un élève moyen dure en moyenne moins de 22 minutes', () => {
    expect(avg(run(0.75).filter(r => r.win).map(r => r.minutes))).toBeLessThan(22);
  });

  it('partie courte : 8 à 10 minutes en moyenne pour un élève moyen, gagnable par un bon élève', () => {
    const short = (acc: number) => Array.from({ length: N }, (_, i) => simulate(content(), `COURT-${i}`, acc, { ...DEFAULT_SETTINGS, short: true }));
    const moyen = short(0.75);
    const m = avg(moyen.map(r => r.minutes));
    expect(m).toBeGreaterThan(7.5);
    expect(m).toBeLessThan(11);
    expect(moyen.filter(r => r.win).length / N).toBeGreaterThan(0.6);
    expect(short(0.9).filter(r => r.win).length / N).toBeGreaterThan(0.85);
  });
});
