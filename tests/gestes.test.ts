/** Étape 3 : la caja de los recuerdos (frise), le mot mystère, la carte de l'Espagne, l'épilogue. */
import { describe, expect, it } from 'vitest';
import { canonicalValue } from '../src/engine/questions';
import { DEFAULT_SETTINGS, Game } from '../src/engine/game';
import { content } from './helpers';

const S = { ...DEFAULT_SETTINGS };
type Internal = { gain(id: string): void; startFight(id: string): void; enterRoom(t: string): void };

describe('la caja de los recuerdos (frise)', () => {
  it('un souvenir daté attend d’être rangé : il ne donne rien tant qu’il n’est pas placé', () => {
    const g = Game.newRun(content(), S, 'CAJA-1');
    (g as unknown as Internal).gain('cartas');
    expect(g.toPlace?.id).toBe('cartas');
    expect(g.state.relics.cartas ?? 0).toBe(0);
  });

  it('bonne année : on le garde et son effet s’applique', () => {
    const g = Game.newRun(content(), S, 'CAJA-2');
    (g as unknown as Internal).gain('cartas');
    expect(g.placeRecuerdo('1936')).toBe(true);
    expect(g.state.relics.cartas).toBe(1);
    expect(g.state.caja!.placed.cartas).toBe('1936');
    expect(g.toPlace).toBeNull();
  });

  it('mauvaise année : l’Olvido l’emporte, il pourra revenir plus tard', () => {
    const g = Game.newRun(content(), S, 'CAJA-3');
    (g as unknown as Internal).gain('llave-casa');
    expect(g.placeRecuerdo('1936')).toBe(false);
    expect(g.state.relics['llave-casa'] ?? 0).toBe(0);
    expect(g.state.caja!.last).toMatchObject({ id: 'llave-casa', ok: false });
    expect(g.available('reliquia')).toContain('llave-casa');
    g.ackRecuerdo();
    expect(g.state.caja!.last).toBeNull();
  });

  it('un souvenir en attente n’est pas proposé une seconde fois', () => {
    const g = Game.newRun(content(), S, 'CAJA-4');
    (g as unknown as Internal).gain('llave-casa');
    expect(g.available('reliquia')).not.toContain('llave-casa');
  });

  it('chaque souvenir daté a une année de la frise et un indice en espagnol', () => {
    const c = content();
    const years = new Set(c.scenes.decors.find(d => d.id === 'frise')!.cols.map(x => x[0]));
    const dated = c.items.filter(i => i.year);
    expect(dated.length).toBeGreaterThanOrEqual(2);
    for (const i of dated) {
      expect(years.has(i.year!), i.id).toBe(true);
      expect(i.clue, i.id).toContain(' ');
      expect(i.clue, i.id).not.toContain(i.year!); // l'indice ne donne pas l'année
    }
  });

  it('la sauvegarde garde la caja', () => {
    const g = Game.newRun(content(), S, 'CAJA-5');
    (g as unknown as Internal).gain('cartas');
    const copy = JSON.parse(JSON.stringify(g.state));
    expect(new Game(content(), S, copy).toPlace?.id).toBe('cartas');
  });
});

describe('le mot mystère', () => {
  it('chaque acte a son mot, caché au départ', () => {
    const g = Game.newRun(content(), S, 'MOT-1');
    expect(g.mysteryWord).toBe(content().sequence.acts[g.state.act].mystery);
    expect(g.mysteryShown()).toMatch(/^[_ ]+$/);
    expect(g.mysteryComplete).toBe(false);
  });

  it('une bonne réponse révèle une lettre, une réponse écrite deux ; une erreur rien', () => {
    const g = Game.newRun(content(), { ...S, writeFactor: 0 }, 'MOT-2');
    g.choose(g.reachable()[0].id);
    g.state.combat!.hp = 99;
    g.state.hp = g.state.maxHp = 99;
    g.answer(canonicalValue(g.question!));
    expect(g.state.mystery).toBe(1);
    expect(g.mysteryShown().replace(/[ _]/g, '')).toHaveLength(1);
    g.proceed();
    g.answer('zzz');
    expect(g.state.mystery).toBe(1);
  });

  it('mot complet : le jefe est affaibli (+1 dégât)', () => {
    const g = Game.newRun(content(), { ...S, writeFactor: 0 }, 'MOT-3');
    (g as unknown as Internal).startFight(content().sequence.acts[g.state.act].boss);
    g.state.hp = g.state.maxHp = 99;
    g.state.combat!.hp = g.state.combat!.maxHp = 99;
    g.state.mystery = 99; // « complet »
    expect(g.mysteryComplete).toBe(true);
    const fb = g.answer(canonicalValue(g.question!))!;
    expect(fb.dmgToEnemy).toBeGreaterThanOrEqual(2);
    expect(fb.lines.join(' ')).toMatch(/mot mystère/);
  });

  it('un nouvel acte repart d’un mot caché', () => {
    const g = Game.newRun(content(), S, 'MOT-4');
    g.state.mystery = 5;
    (g as unknown as { nextAct(): void }).nextAct();
    expect(g.state.mystery).toBe(0);
  });

  it('les mots mystères sont ceux du plan : GUERRA CIVIL, ESPERANZA, EXILIO', () => {
    expect(content().sequence.acts.map(a => a.mystery)).toEqual(['GUERRA CIVIL', 'ESPERANZA', 'EXILIO']);
  });
});

describe('la carte de l’Espagne', () => {
  const maps = () => content().questions.filter(q => q.type === 'scene' && q.scene.decor === 'mapa');

  it('au moins 2 questions, avec les mots de position', () => {
    expect(maps().length).toBeGreaterThanOrEqual(2);
    const d = content().scenes.decors.find(x => x.id === 'mapa')!;
    expect(d.rows.map(r => r[1])).toEqual(['en el norte', 'en el centro', 'en el sur']);
    expect(d.cols.map(r => r[1])).toEqual(['en el oeste', 'en el centro', 'en el este']);
  });

  it('chaque lieu cité existe, et la consigne en espagnol dit où il se trouve', () => {
    const c = content();
    for (const q of maps()) {
      if (q.type !== 'scene') continue;
      for (const it of q.scene.items) {
        expect(c.scenes.objects.some(o => o.id === it.object), q.id).toBe(true);
        expect(q.prompt, q.id).toMatch(it.row === 'norte' ? /norte/ : it.row === 'sur' ? /sur/ : /centro|este|oeste|norte/);
      }
    }
  });

  it('l’événement de la carte pose ces questions-là', () => {
    const ev = content().events.find(e => e.id === 'mapa')!;
    const ids = ev.choices[0].quiz!.ids!;
    expect(ids.length).toBeGreaterThanOrEqual(2);
    expect(ids.every(i => content().questions.some(q => q.id === i))).toBe(true);
    const g = Game.newRun(content(), S, 'MAPA-1');
    g.state.screen = 'event';
    g.state.event = { id: 'mapa', choice: null, quiz: null, result: null, pendingFight: null };
    g.eventChoose(0);
    const asked = g.state.event!.quiz!.q;
    expect(ids).toContain(asked.id);
    expect(asked.mode).toBe('place');
    // bonne réponse : la grand-mère offre la carte de l'Espagne
    g.eventAnswer(canonicalValue(g.getQuestion(asked.id)!));
    expect(g.state.relics.mapa).toBe(1);
  });
});

describe('l’épilogue : la ficha de identidad', () => {
  it('les cinq rubriques de l’évaluation sont remplies, avec les réponses du jeu', () => {
    const ep = content().sequence.epilogue!;
    expect(ep.rows.map(r => r[0])).toEqual(['Fecha de inicio', 'Duración', 'Año del final', 'Los dos bandos', 'Jefe de los militares']);
    expect(Object.fromEntries(ep.rows)['Jefe de los militares']).toBe('Franco');
    expect(ep.outro).toContain('Nunca olvidé esos años');
  });
});
