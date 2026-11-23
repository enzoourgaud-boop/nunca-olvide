/**
 * Valide toute la banque de questions : schéma, champs complets, identifiants uniques,
 * pas de doublon d'énoncé, réponse absente des distracteurs, références connues.
 * Usage : npm run valider
 */
import { parseContent } from '../src/engine/content';
import { levelNum } from '../src/engine/schema';
import { listSequences, readSequence } from './read-content';

let errors = 0;
for (const id of listSequences()) {
  console.log(`\n📚 Séquence « ${id} »`);
  let raw;
  try {
    raw = readSequence(id);
  } catch (e) {
    console.log(`  ❌ ${(e as Error).message}`);
    errors++;
    continue;
  }
  const { content, issues } = parseContent(raw);
  for (const i of issues) console.log(`  ${i.level === 'erreur' ? '❌' : '⚠️ '} ${i.where} : ${i.message}`);
  errors += issues.filter(i => i.level === 'erreur').length;
  if (!content) continue;

  const off = content.questions.filter(q => q.disabled);
  const qs = content.questions.filter(q => !q.disabled);
  console.log(`\n  ${qs.length} questions actives${off.length ? ` (+ ${off.length} désactivée${off.length > 1 ? 's' : ''} : ${off.map(q => q.id).join(', ')})` : ''}`);
  const themes = content.sequence.themes.map(t => t.id);
  const pad = (s: string | number, n: number) => String(s).padStart(n);
  console.log(`  ${'thème'.padEnd(14)} ${pad('niv.1', 6)} ${pad('niv.2', 6)} ${pad('niv.3', 6)} ${pad('jefe', 6)} ${pad('total', 6)}`);
  for (const t of themes) {
    const row = [1, 2, 3, 4].map(l => qs.filter(q => q.theme === t && levelNum(q.level) === l).length);
    console.log(`  ${t.padEnd(14)} ${row.map(n => pad(n, 6)).join(' ')} ${pad(row.reduce((a, b) => a + b, 0), 6)}`);
  }
  const types = [...new Set(qs.map(q => q.type))];
  const rel = content.items.filter(i => i.kind === 'reliquia');
  console.log(`  ${content.events.length} événements · ${content.enemies.length} ennemis · ${content.items.length - rel.length} aides · ${rel.length} reliques · ${content.synergies.length} synergies`);
  console.log(`  types : ${types.map(t => `${t} (${qs.filter(q => q.type === t).length})`).join(', ')}`);
}
console.log(errors ? `\n❌ ${errors} erreur(s) à corriger.` : '\n✅ Banque valide.');
process.exit(errors ? 1 : 0);
