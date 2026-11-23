/** Affiche les statistiques d'équilibrage (npm run equilibrage). */
import { simulate } from '../tests/sim';
import { content } from '../tests/helpers';

const N = Number(process.argv[2] ?? 300);
console.log(`Simulation de ${N} parties par profil\n`);
console.log('réussite | victoires | durée moy. (victoires) | durée moy. (toutes) | combats gagnés | acte atteint');
for (const acc of [0.5, 0.6, 0.75, 0.9, 1]) {
  const rs = Array.from({ length: N }, (_, i) => simulate(content(), `SIM-${i}`, acc));
  const wins = rs.filter(r => r.win);
  const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  console.log(
    `  ${String(Math.round(acc * 100)).padStart(3)} %  |   ${String(Math.round((100 * wins.length) / N)).padStart(3)} %   |` +
      `        ${avg(wins.map(r => r.minutes)).toFixed(1).padStart(5)} min       |` +
      `     ${avg(rs.map(r => r.minutes)).toFixed(1).padStart(5)} min     |` +
      `      ${avg(rs.map(r => r.won)).toFixed(1).padStart(4)}      |    ${avg(rs.map(r => r.act + 1)).toFixed(1)}`,
  );
}
