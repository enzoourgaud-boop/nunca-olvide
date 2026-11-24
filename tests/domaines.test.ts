/** Menu principal : travailler un domaine en particulier (le passé simple, le lexique…). */
import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, Game } from '../src/engine/game';
import { content } from './helpers';
import { simulate } from './sim';

const c = content();
const domains = c.sequence.domains;
const themeOf = new Map(c.questions.map(q => [q.id, q.theme]));

describe('domaines à travailler', () => {
  it('le passé simple regroupe les verbes réguliers, irréguliers et ser/ir', () => {
    const d = domains.find(x => x.id === 'pasado')!;
    expect(d.themes).toEqual(['regulares', 'irregulares', 'ser-ir']);
    expect(d.label).toBe('Le passé simple');
  });

  it('« tout mélangé » est proposé, et chaque domaine a assez de questions pour une partie', () => {
    expect(domains[0].themes).toBeUndefined();
    for (const d of domains.filter(x => x.themes)) {
      const n = c.questions.filter(q => !q.disabled && d.themes!.includes(q.theme)).length;
      expect(n, d.id).toBeGreaterThanOrEqual(25);
    }
  });

  it('un domaine choisi : seules ses questions sont posées, parties entières comprises (combats, événements, coffres)', () => {
    for (const d of domains.filter(x => x.themes)) {
      for (let i = 0; i < 12; i++) {
        const r = simulate(c, `DOM-${d.id}-${i}`, 0.8, { ...DEFAULT_SETTINGS, themes: d.themes! });
        expect(r.asked.length, d.id).toBeGreaterThan(20);
        for (const id of r.asked) expect(d.themes, `${d.id} : ${id}`).toContain(themeOf.get(id));
      }
    }
  });

  it('chaque domaine reste jouable : un élève à 90 % gagne souvent, en moins de 25 minutes', () => {
    for (const d of domains) {
      const rs = Array.from({ length: 30 }, (_, i) => simulate(c, `JOUE-${d.id}-${i}`, 0.9, { ...DEFAULT_SETTINGS, themes: d.themes ?? null }));
      expect(rs.filter(r => r.win).length / 30, d.id).toBeGreaterThan(0.7);
      expect(rs.reduce((s, r) => s + r.minutes, 0) / 30, d.id).toBeLessThan(25);
    }
  });

  it('l’événement de la carte n’apparaît pas quand le domaine exclut l’histoire', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const g = Game.newRun(c, { ...DEFAULT_SETTINGS, themes: ['regulares'] }, `EV-${i}`);
      g.state.screen = 'map';
      (g as unknown as { enterRoom(t: string): void }).enterRoom('event');
      if (g.state.event) seen.add(g.state.event.id);
    }
    expect(seen.size).toBeGreaterThan(3);
    expect(seen.has('mapa')).toBe(false);
    // avec l'histoire, il peut apparaître
    const hist = new Set<string>();
    for (let i = 0; i < 120; i++) {
      const g = Game.newRun(c, { ...DEFAULT_SETTINGS, themes: ['historia'] }, `EV-${i}`);
      (g as unknown as { enterRoom(t: string): void }).enterRoom('event');
      if (g.state.event) hist.add(g.state.event.id);
    }
    expect(hist.has('mapa')).toBe(true);
  });
});
