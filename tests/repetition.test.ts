/** Une question à laquelle l'élève a répondu juste ne revient pas dans la même partie (retour des élèves). */
import { describe, expect, it } from 'vitest';
import { canonicalValue, wrongValue } from '../src/engine/questions';
import { DEFAULT_SETTINGS, Game } from '../src/engine/game';
import { content } from './helpers';
import { simulate } from './sim';

const c = content();
type Internal = { startFight(id: string): void };

describe('pas de question réussie reposée', () => {
  it('partie complète ou courte, tout mélangé : aucune question réussie ne revient (élèves à 75 % et à 90 %)', () => {
    for (const acc of [0.75, 0.9]) {
      for (const short of [false, true]) {
        const rs = Array.from({ length: 40 }, (_, i) => simulate(c, `REPET-${acc}-${i}`, acc, { ...DEFAULT_SETTINGS, short }));
        expect(rs.reduce((n, r) => n + r.repeats, 0), `précision ${acc}, courte : ${short}`).toBe(0);
      }
    }
  });

  it('les domaines assez grands (passé simple, verbes réguliers, irréguliers) ne répètent rien non plus', () => {
    for (const id of ['pasado', 'regulares', 'irregulares']) {
      const d = c.sequence.domains.find(x => x.id === id)!;
      const rs = Array.from({ length: 30 }, (_, i) => simulate(c, `GRAND-${id}-${i}`, 0.9, { ...DEFAULT_SETTINGS, themes: d.themes! }));
      expect(rs.reduce((n, r) => n + r.repeats, 0), id).toBe(0);
    }
  });

  it('dans un petit domaine, toutes les questions sont posées une fois avant la première répétition', () => {
    const themes = ['ser-ir'];
    const total = c.questions.filter(q => !q.disabled && themes.includes(q.theme)).length;
    const g = Game.newRun(c, { ...DEFAULT_SETTINGS, themes }, 'PETIT-1');
    (g as unknown as Internal).startFight('casa-vacia');
    g.state.combat!.hp = g.state.combat!.maxHp = 99999;
    g.state.hp = g.state.maxHp = 99999;
    const ids: string[] = [];
    for (let i = 0; i < total + 5; i++) {
      ids.push(g.question!.id);
      g.answer(canonicalValue(g.question!));
      g.proceed();
    }
    expect(new Set(ids.slice(0, total)).size).toBe(total); // aucune répétition avant d'avoir tout vu
    expect(new Set(ids).size).toBe(total); // puis seulement des questions déjà vues : le jeu ne se bloque pas
  });

  it('une question ratée peut revenir, une question réussie non', () => {
    const g = Game.newRun(c, { ...DEFAULT_SETTINGS, themes: ['regulares'] }, 'RATEE-1');
    (g as unknown as Internal).startFight('casa-vacia');
    g.state.combat!.hp = g.state.combat!.maxHp = 99999;
    g.state.hp = g.state.maxHp = 99999;
    const missed = g.question!.id;
    g.answer(wrongValue(g.question!, g.state.combat!.q.options));
    g.proceed();
    const ok = new Set<string>();
    let back = 0;
    for (let i = 0; i < 70; i++) {
      const id = g.question!.id;
      if (id === missed) back++;
      expect(ok.has(id), id).toBe(false); // jamais une question déjà réussie
      g.answer(canonicalValue(g.question!));
      ok.add(id);
      g.proceed();
    }
    expect(back).toBeGreaterThanOrEqual(1); // la question ratée est revenue (et réussie, donc plus jamais ensuite)
  });

  it('la sauvegarde garde la liste des questions réussies', () => {
    const g = Game.newRun(c, { ...DEFAULT_SETTINGS }, 'SAUVE-1');
    g.choose(g.reachable()[0].id);
    const id = g.question!.id;
    g.answer(canonicalValue(g.question!));
    const copy = JSON.parse(JSON.stringify(g.state));
    expect(copy.right[id]).toBe(true);
    expect(new Game(c, { ...DEFAULT_SETTINGS }, copy).state.right?.[id]).toBe(true);
  });

  it('l’événement de la carte n’apparaît plus quand toutes ses questions sont déjà réussies', () => {
    const g = Game.newRun(c, { ...DEFAULT_SETTINGS, themes: ['historia'] }, 'EV-RES');
    g.state.right = { 'esc-mapa-2': true, 'esc-mapa-3': true };
    const seen = new Set<string>();
    for (let i = 0; i < 80; i++) {
      const x = Game.newRun(c, { ...DEFAULT_SETTINGS, themes: ['historia'] }, `EV-RES-${i}`);
      x.state.right = { 'esc-mapa-2': true, 'esc-mapa-3': true };
      (x as unknown as { enterRoom(t: string): void }).enterRoom('event');
      if (x.state.event) seen.add(x.state.event.id);
    }
    expect(seen.size).toBeGreaterThan(2);
    expect(seen.has('mapa')).toBe(false);
  });
});
