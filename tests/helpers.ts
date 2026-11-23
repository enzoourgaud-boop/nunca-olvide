import { parseContent } from '../src/engine/content';
import type { Content } from '../src/engine/schema';
import { readSequence } from '../scripts/read-content';

let cached: Content | null = null;
export function content(): Content {
  if (cached) return cached;
  const { content, issues } = parseContent(readSequence('guerra-civil'));
  if (!content) throw new Error(issues.map(i => `${i.where}: ${i.message}`).join('\n'));
  cached = content;
  return content;
}

/** Le contenu, avec quelques questions désactivées par le professeur (pour tester qu'elles ne sont jamais posées). */
export function contentWithDisabled(): Content {
  const c = content();
  const off = new Set(c.questions.filter(q => q.theme === 'historia').slice(0, 4).map(q => q.id));
  return { ...c, questions: c.questions.map(q => (off.has(q.id) ? { ...q, disabled: true } : q)) };
}
