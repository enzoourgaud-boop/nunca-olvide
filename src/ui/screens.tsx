/** Écrans de récompense et de boutique. */
import type { Game } from '../engine/game';
import { Hud, ItemCard, Powers } from './components';

export function Reward({ game }: { game: Game }) {
  const s = game.state;
  const kind = s.offerKind;
  const nextAct = game.content.sequence.acts[s.act + 1];
  return (
    <section class="screen">
      <Hud game={game} />
      <h2>{kind === 'jefe' ? '¡El jefe cae! Choisis une relique' : '¡Victoria! Choisis un pouvoir'}</h2>
      <p class="muted">
        {kind === 'elite' ? "Récompense d'élite : une relique au choix. " : ''}
        {kind === 'jefe' ? `Tu récupères des forces avant de partir vers ${nextAct?.name ?? 'la suite'}. ` : ''}
        Tu n'en gardes qu'un. Les aides se dépensent, les reliques durent toute la partie.
      </p>
      {kind === 'jefe' && nextAct && game.enemyDef(nextAct.boss)?.kind === 'final' && (
        <div class="aviso">
          <b>Dernier acte : {nextAct.name}.</b> {game.enemyDef(nextAct.boss)!.name} t'attend au bout du chemin. Elle a plusieurs phases : lis bien les messages quand elle change de style.
        </div>
      )}
      <div class="elige">
        {s.offer!.map((o, i) => (
          <ItemCard key={o.id + i} item={game.item(o.id)!} onClick={() => game.take(i)} />
        ))}
      </div>
      <div>
        <button class="link" onClick={() => game.take(-1)}>
          Ne rien prendre
        </button>
      </div>
      <Powers game={game} inCombat={false} />
    </section>
  );
}

export function Shop({ game }: { game: Game }) {
  const s = game.state, seq = game.content.sequence;
  const info = seq.rooms.shop, meal = seq.meal;
  const canMeal = s.hp < s.maxHp && s.gold >= meal.price;
  return (
    <section class="screen">
      <Hud game={game} />
      <h2>{info?.name ?? 'Boutique'}</h2>
      <p class="muted">{info?.text}</p>
      <div class="elige">
        {s.offer!.map((o, i) => {
          const it = game.item(o.id)!;
          return <ItemCard key={o.id + i} item={it} price={it.price} sold={o.sold} disabled={o.sold || s.gold < it.price} onClick={() => game.buy(i)} />;
        })}
        <button class="item" onClick={() => game.buyMeal()} disabled={!canMeal}>
          <span class="ico" aria-hidden="true">{meal.emoji}</span>
          <span class="tp">Repas (plusieurs fois possible)</span>
          <span class="nm">{meal.name}</span>
          <span class="ds">{meal.description}</span>
          <span class="px">🪙 {meal.price}</span>
        </button>
      </div>
      <div>
        <button class="btn" onClick={() => game.leaveShop()}>
          Reprendre le chemin
        </button>
      </div>
      <Powers game={game} inCombat={false} />
    </section>
  );
}

