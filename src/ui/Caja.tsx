/** La caja de los recuerdos : ranger un souvenir daté sur la frise (bonne année = on le garde). */
import { useEffect, useRef } from 'preact/hooks';
import type { Game } from '../engine/game';
import { play } from './sfx';

export function CajaModal({ game }: { game: Game }) {
  const it = game.toPlace, last = game.state.caja?.last ?? null;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    // touches 1 à 4 : choisir l'année
    const onKey = (e: KeyboardEvent) => {
      // Entrée : ferme le résultat du rangement (sans dépendre du focus)
      if (e.key === 'Enter' && game.state.caja?.last) {
        e.preventDefault();
        e.stopPropagation();
        game.ackRecuerdo();
        return;
      }
      const y = game.years[Number(e.key) - 1];
      if (game.toPlace && !game.state.caja?.last && y) {
        e.preventDefault();
        e.stopPropagation();
        play(game.placeRecuerdo(y) ? 'unlock' : 'ko');
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [it?.id, !!last]);
  if (!it && !last) return null;
  if (last) {
    const done = game.item(last.id)!;
    return (
      <div class="velo">
        <div class="opciones-panel caja-panel" ref={ref} role="dialog" aria-modal="true" aria-labelledby="caja-titulo">
          <h2 id="caja-titulo">{last.ok ? '¡Recuerdo guardado!' : 'El Olvido se lo lleva…'}</h2>
          <p class="caja-obj"><span aria-hidden="true">{done.emoji}</span> {done.name}</p>
          <p lang="es">«{done.clue}»</p>
          <p>
            {last.ok
              ? `Bonne année : ${done.year}. Le souvenir rejoint ta boîte. ${done.description.split('.')[0]}.`
              : `Ce souvenir date de ${done.year}, pas de ${last.year}. Il s'efface… Il pourra revenir plus tard.`}
          </p>
          <div class="fila">
            <button class="btn" onClick={() => game.ackRecuerdo()}>Continuer</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div class="velo">
      <div class="opciones-panel caja-panel" ref={ref} role="dialog" aria-modal="true" aria-labelledby="caja-titulo">
        <span class="lbl">La caja de los recuerdos</span>
        <h2 id="caja-titulo">¿De qué año es este recuerdo?</h2>
        <p class="caja-obj"><span aria-hidden="true">{it!.emoji}</span> {it!.name}</p>
        <p class="caja-pista" lang="es">«{it!.clue}»</p>
        <p class="muted">Range-le sur la frise. Bonne année : tu le gardes. Mauvaise année : l'Olvido l'emporte.</p>
        <div class="caja-frise" role="group" aria-label="La frise chronologique">
          {game.years.map((y, i) => (
            <button key={y} class="op" onClick={() => play(game.placeRecuerdo(y) ? 'unlock' : 'ko')}>
              <kbd>{i + 1}</kbd> {y}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
