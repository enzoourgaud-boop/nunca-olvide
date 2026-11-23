/**
 * Génération d'une carte à embranchements (une par acte), à partir du générateur à graine.
 *
 * Étage 0 : combats · étages 1 à restFloor-1 : salles variées · étage restFloor : Ofrenda
 * · dernier étage : le jefe. Les chemins ne se croisent pas et chaque salle est atteignable.
 */
import type { Rng } from './rng';
import type { RoomType, Sequence } from './schema';

export interface MapNode {
  id: string;
  floor: number;
  /** Position horizontale, de 0 (gauche) à 1 (droite). */
  x: number;
  type: RoomType;
  next: string[];
}

export interface ActMap {
  floors: number;
  nodes: MapNode[];
}

type Cfg = Sequence['map'];

export function generateMap(rng: Rng, cfg: Cfg): ActMap {
  const last = cfg.floors - 1; // étage du jefe
  const rest = Math.min(cfg.restFloor, last - 1);
  const floors: MapNode[][] = [];
  for (let f = 0; f <= last; f++) {
    const n = f === last ? 1 : f === rest ? Math.max(2, cfg.width[0] - 1) : cfg.width[0] + rng.int(cfg.width[1] - cfg.width[0] + 1);
    floors.push(
      Array.from({ length: n }, (_, i) => ({
        id: `${f}-${i}`,
        floor: f,
        x: n === 1 ? 0.5 : 0.1 + (0.8 * i) / (n - 1) + (rng.next() - 0.5) * (0.25 / n),
        type: 'combat' as RoomType,
        next: [],
      })),
    );
  }

  // liaisons monotones (pas de croisement), chaque salle a au moins une entrée et une sortie
  for (let f = 0; f < last; f++) {
    const A = floors[f], B = floors[f + 1];
    const base = A.map((_, i) => (A.length === 1 ? Math.floor((B.length - 1) / 2) : Math.round((i * (B.length - 1)) / (A.length - 1))));
    // cibles monotones : la cible minimale d'une salle n'est jamais à gauche de la cible maximale de sa voisine de gauche
    const targets: number[][] = [];
    let prevMax = 0;
    A.forEach((_, i) => {
      const t = [base[i]];
      if (rng.chance(0.45)) {
        const right = base[i] + 1, left = base[i] - 1;
        if (right < B.length && (i === A.length - 1 || base[i + 1] >= right) && rng.chance(0.5)) t.push(right);
        else if (left >= 0 && left >= prevMax) t.unshift(left);
      }
      targets.push(t);
      prevMax = t[t.length - 1];
    });
    // salles sans entrée : reliées à la salle de gauche la plus proche (ou la première)
    B.forEach((_, j) => {
      if (targets.some(t => t.includes(j))) return;
      let i = 0;
      targets.forEach((t, k) => {
        if (t[t.length - 1] < j) i = k;
      });
      targets[i].push(j);
      targets[i].sort((x, y) => x - y);
    });
    A.forEach((a, i) => (a.next = targets[i].map(j => B[j].id)));
  }

  // types de salles
  const W = cfg.weights;
  for (let f = 0; f <= last; f++) {
    for (const node of floors[f]) {
      if (f === last) node.type = 'boss';
      else if (f === rest) node.type = 'rest';
      else if (f === 0) node.type = 'combat';
      else {
        const opts: [RoomType, number][] = [
          ['combat', W.combat], ['event', W.event], ['chest', W.chest], ['shop', W.shop],
          ['elite', f >= 2 ? W.elite : 0], ['rest', f >= 2 && f < rest - 1 ? W.rest : 0],
        ];
        node.type = rng.weighted(opts, o => o[1])[0];
      }
    }
  }
  // garanties : au moins un élite et un Tianguis par acte, pas deux Tianguis de suite sur un chemin
  const mid = floors.slice(1, rest).flat();
  const ensure = (type: RoomType, pool: MapNode[]) => {
    if (mid.some(n => n.type === type) || !pool.length) return;
    const candidates = pool.filter(n => n.type === 'combat' || n.type === 'event');
    rng.pick(candidates.length ? candidates : pool).type = type;
  };
  ensure('elite', floors.slice(2, rest).flat());
  ensure('shop', mid.filter(n => n.type !== 'elite'));
  const byId = new Map(floors.flat().map(n => [n.id, n]));
  for (const n of mid) {
    if (n.type !== 'shop') continue;
    for (const id of n.next) {
      const m = byId.get(id)!;
      if (m.type === 'shop') m.type = 'combat';
    }
  }

  return { floors: cfg.floors, nodes: floors.flat() };
}

export function nodeById(map: ActMap, id: string): MapNode | undefined {
  return map.nodes.find(n => n.id === id);
}

/** Salles accessibles depuis la position actuelle (null = début de l'acte). */
export function reachable(map: ActMap, current: string | null): MapNode[] {
  if (current === null) return map.nodes.filter(n => n.floor === 0);
  const cur = nodeById(map, current);
  return cur ? cur.next.map(id => nodeById(map, id)!).filter(Boolean) : [];
}
