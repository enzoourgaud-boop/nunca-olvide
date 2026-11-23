import { expect, test } from '@playwright/test';
import { answerCurrent, handleCaja, loadBank, playToEnd } from './helpers';

const data = loadBank();

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => localStorage.setItem('nunca:prefs', JSON.stringify({ sound: false, petals: false, motion: 'reduced' })));
  await page.reload();
});

test('une partie entière, du profil jusqu’au code de fin', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await expect(page.getByRole('heading', { name: '¿Quién juega?' })).toBeVisible();
  await page.fill('#pseudo', 'Bot');
  await page.click('text=Créer et jouer');
  await page.fill('input[placeholder="au hasard"]', 'CALAVERA-42');
  await page.getByRole('button', { name: /Partie complète/ }).click();
  const modes = await playToEnd(page, data);
  await expect(page.locator('h1')).toHaveText('¡Nunca olvidé!');
  // la ficha de identidad de la guerre (épilogue) est remplie
  await expect(page.locator('.ficha-guerra')).toContainText('Franco');
  await expect(page.locator('.ficha-guerra')).toContainText('Nunca olvidé esos años');
  // au moins un souvenir daté a été rangé sur la frise
  expect(modes.caja ?? 0).toBeGreaterThanOrEqual(1);
  // le code de fin est affiché, avec son QR
  await expect(page.locator('.codigo')).toHaveText(/^[0-9A-Z]{5}-[0-9A-Z]{5}-[0-9A-Z]{5}-[0-9A-Z]{4}$/);
  await expect(page.locator('svg.qr')).toBeVisible();
  // nouveautés débloquées
  await expect(page.locator('.desbloqueos')).toContainText('Nivel de Olvido 1');
  // plusieurs façons de répondre ont été utilisées
  expect(Object.keys(modes).filter(m => m !== 'caja').length).toBeGreaterThanOrEqual(4);
  expect(errors).toEqual([]);
  // la collection et le carnet sont remplis
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('button', { name: /Álbum \d+\/\d+/ })).not.toHaveText(/Álbum 0\//);
});

test('espace professeur : code de classe appliqué côté élève', async ({ page, context }) => {
  await page.goto('./#prof');
  await page.fill('#prof-code', 'profe2026');
  await page.click('text=Entrer');
  await page.locator('label.check:has-text("Léxico") input').click();
  await page.locator('label.check:has-text("Imposer la partie courte") input').click();
  // le professeur choisit l'acte de la partie courte : l'acte 2
  await page.locator('label.check:has-text("Acte joué") select').selectOption('2');
  const code = (await page.locator('.codigo').textContent())!.trim();
  const eleve = await context.newPage();
  await eleve.goto(`./#classe-${code}`);
  await eleve.fill('#pseudo', 'Élève');
  await eleve.click('text=Créer et jouer');
  await expect(eleve.locator('.clase')).toContainText('Partie courte (acte 2');
  // partie courte imposée : seul le bouton « Partie courte » est proposé
  await expect(eleve.getByRole('button', { name: /Partie complète/ })).toHaveCount(0);
  await eleve.getByRole('button', { name: /Partie courte/ }).click();
  await expect(eleve.locator('.hud .ruta')).toContainText('Acte 2');
  await eleve.locator('.sala.puede').first().click();
  await expect(eleve.locator('.qa .tag')).not.toHaveText('Léxico');
  // chrono désactivé par défaut
  await expect(eleve.locator('.crono')).toHaveCount(0);
});

test('le jeu fonctionne hors ligne une fois chargé', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'service worker testé sous Chromium');
  await page.goto('./');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await page.fill('#pseudo', 'Hors ligne');
  await page.click('text=Créer et jouer');
  await page.getByRole('button', { name: /Partie complète/ }).click();
  await page.locator('.sala.puede').first().click();
  await expect(page.locator('.qa[data-qid]')).toBeVisible();
  await context.setOffline(false);
});

test('navigation au clavier : options et première question', async ({ page }) => {
  await page.fill('#pseudo', 'Clavier');
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: /Options/ }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Options' })).toBeVisible();
  await expect(page.locator('.opciones-panel input').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: /Partie complète/ }).focus();
  await page.keyboard.press('Enter');
  // la première salle accessible a le focus : Entrée y entre
  await expect(page.locator('.sala.puede').first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.qa[data-qid]')).toBeVisible();
});

/* ======================= Version 1.1 ======================= */

async function startRun(page: import('@playwright/test').Page, seed: string, pseudo = 'Bot') {
  await page.fill('#pseudo', pseudo);
  await page.click('text=Créer et jouer');
  await page.fill('input[placeholder="au hasard"]', seed);
  await page.getByRole('button', { name: /Partie complète/ }).click();
}

/** Part visible d'un élément dans la fenêtre (0 à 1), et position de son bas. */
const VISIBLE = `(sel) => {
  var els = Array.from(document.querySelectorAll(sel)).filter(function (e) { return e.offsetParent !== null; });
  var el = els[els.length - 1];
  if (!el) return null;
  var r = el.getBoundingClientRect();
  var h = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
  return { ratio: r.height ? h / r.height : 0, inside: r.top >= 0 && r.bottom <= innerHeight + 1 };
}`;
const visible = (page: import('@playwright/test').Page, sel: string) =>
  page.evaluate(`(${VISIBLE})(${JSON.stringify(sel)})`) as Promise<{ ratio: number; inside: boolean } | null>;

const CONTROLS: Record<string, string> = {
  qcm: '.combate .ops .op', tf: '.combate .vf .op', write: '.combate .escr button', order: '.combate .tablero .btn', match: '.combate .tablero .btn', place: '.combate .tablero .pie .btn',
};

for (const [name, w, h] of [['PC de collège', 1366, 768], ['PC, fenêtre basse', 1366, 625], ['tablette', 768, 1024], ['téléphone', 360, 640]] as const) {
  test(`le combat tient à l’écran : ${name} (${w} × ${h})`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await startRun(page, `ECRAN-${w}`);
    const seen: Record<string, number> = {};
    let n = 0, simple = 0, simpleOk = 0;
    for (let step = 0; step < 400 && n < 24; step++) {
      if (await page.locator('.stats').count()) break;
      if (await handleCaja(page)) continue;
      if (await page.locator('.mapa').count()) {
        // de préférence un combat
        const fights = page.locator('.sala.puede.combat, .sala.puede.elite, .sala.puede.boss');
        await ((await fights.count()) ? fights.first() : page.locator('.sala.puede').first()).click();
        continue;
      }
      const qa = page.locator('.combate .qa[data-qid]:not(:has(.fb))');
      if (await qa.count()) {
        const mode = (await qa.getAttribute('data-mode'))!;
        const ctrl = await visible(page, CONTROLS[mode]);
        expect(ctrl, `contrôle de réponse (${mode})`).not.toBeNull();
        // QCM, vrai/faux, écrit : on répond sans défiler (toujours sur PC et tablette, presque toujours sur téléphone)
        if (mode === 'qcm' || mode === 'tf' || mode === 'write') {
          simple++;
          if (ctrl!.inside) simpleOk++;
          else if (w >= 700) expect(ctrl!.inside, `réponse visible sans défiler (${mode}, question ${n + 1})`).toBe(true);
        }
        // s'il faut défiler jusqu'au bouton (plateaux, longues questions sur téléphone), la scène de combat reste à l'écran
        if (!ctrl!.inside) await page.locator(CONTROLS[mode]).last().scrollIntoViewIfNeeded();
        expect((await visible(page, '.escenario'))!.ratio, `scène visible en répondant (${mode})`).toBeGreaterThan(0.8);
        await answerCurrent(page, data, n % 3 === 1);
        await expect(page.locator('.combate .fb .btn')).toBeVisible();
        await page.waitForTimeout(150);
        expect((await visible(page, '.combate .fb .btn'))!.inside, `« Continuer » visible (${mode})`).toBe(true);
        expect((await visible(page, '.escenario'))!.ratio, `scène visible au retour (${mode})`).toBeGreaterThan(0.8);
        seen[mode] = (seen[mode] ?? 0) + 1;
        n++;
        await page.locator('.combate .fb .btn').click();
        continue;
      }
      if (await answerCurrent(page, data)) continue;
      const next = page.locator('.fb .btn, .resultado .btn, .elige .item:not([disabled]), .eleccion:not([disabled]), button:has-text("Ouvrir la boîte"), button:has-text("Essayer d’ouvrir"), button:has-text("Reprendre le chemin")');
      if (await next.count()) await next.first().click();
      else await page.waitForTimeout(40);
    }
    expect(n).toBeGreaterThanOrEqual(15);
    expect(Object.keys(seen).length).toBeGreaterThanOrEqual(3);
    expect(simpleOk / simple, 'part des questions simples répondues sans défiler').toBeGreaterThanOrEqual(0.9);
  });
}

test('le chrono se coupe en cours de partie et s’arrête quand les options sont ouvertes', async ({ page }) => {
  await startRun(page, 'CHRONO-11');
  await page.locator('.sala.puede').first().click();
  const crono = page.locator('.crono');
  // le chrono est désactivé par défaut : on l'allume dans les options, il vaut à partir de la question suivante
  await expect(crono).toHaveCount(0);
  await page.getByRole('button', { name: /Options/ }).click();
  await page.locator('label:has-text("Chrono") input[type=checkbox]').check();
  await page.keyboard.press('Escape');
  await answerCurrent(page, data);
  await page.locator('.combate .fb .btn').click();
  await expect(crono).toBeVisible();
  const seconds = async () => Number(((await crono.locator('b').textContent()) ?? '').replace(/\D/g, ''));
  // options ouvertes : le temps ne s'écoule plus
  await page.getByRole('button', { name: /Options/ }).click();
  await expect(page.getByRole('dialog', { name: 'Options' })).toBeVisible();
  const before = await seconds();
  await page.waitForTimeout(2600);
  expect(await seconds()).toBe(before);
  // chrono décoché : il disparaît tout de suite, et ne revient pas à la question suivante
  await page.locator('label:has-text("Chrono") input[type=checkbox]').uncheck();
  await expect(crono).toHaveCount(0);
  await page.keyboard.press('Escape');
  await answerCurrent(page, data);
  await page.locator('.combate .fb .btn').click();
  if (await page.locator('.combate .qa[data-qid]').count()) await expect(crono).toHaveCount(0);
});

test('palabras pendientes : les questions ratées attendent au début de la partie suivante', async ({ page }) => {
  await startRun(page, 'ALMAS-11');
  await page.locator('.sala.puede').first().click();
  // deux erreurs, puis retour au menu
  const missed: string[] = [];
  for (let k = 0; k < 2; k++) {
    if (!(await page.locator('.combate .qa[data-qid]:not(:has(.fb))').count())) break;
    missed.push((await page.locator('.combate .qa').getAttribute('data-qid'))!);
    await answerCurrent(page, data, true);
    await expect(page.locator('.hud .chip.almas')).toContainText(String(k + 1));
    await page.locator('.combate .fb .btn').click();
  }
  expect(missed.length).toBe(2);
  await page.getByRole('button', { name: /Revenir au menu/ }).click();
  await expect(page.locator('.almas-aviso')).toContainText('2 palabras pendientes');
  // nouvelle partie : l'échauffement propose ces deux questions
  await page.getByRole('button', { name: 'Nouvelle partie' }).click();
  await expect(page.getByRole('heading', { name: 'Tus palabras pendientes' })).toBeVisible();
  const first = (await page.locator('.qa.quiz').getAttribute('data-qid'))!;
  expect(missed).toContain(first);
  await answerCurrent(page, data);
  await expect(page.locator('.calentamiento .fb')).toContainText('Palabra recuperada');
  await expect(page.locator('.calentamiento')).toContainText('29 PV');
  await page.getByRole('button', { name: 'Mot suivant' }).click();
  await answerCurrent(page, data, true);
  await page.getByRole('button', { name: 'Commencer le chemin' }).click();
  // sur la carte : 29 PV au lieu de 28, et un mot attend encore
  await expect(page.locator('.mapa')).toBeVisible();
  await expect(page.locator('.hud')).toContainText('29/29');
  await expect(page.locator('.hud .chip.almas')).toContainText('1');
});

/* ======================= Étape 3 ======================= */

test('la caja de los recuerdos : une mauvaise année fait perdre le souvenir, la bonne le garde (au clavier)', async ({ page }) => {
  await startRun(page, 'CAJA-9');
  // on donne un souvenir daté au joueur par la console du jeu de test : le moteur est exposé dans l'état sauvegardé
  await page.evaluate(() => {
    const key = Object.keys(localStorage).find(k => k.includes(':run'))!;
    const run = JSON.parse(localStorage.getItem(key)!);
    run.caja = { pending: ['foto-carmen', 'llave-casa'], placed: {}, last: null };
    localStorage.setItem(key, JSON.stringify(run));
  });
  await page.reload();
  await page.getByRole('button', { name: /Reprendre|Continuer/ }).first().click();
  const modal = page.getByRole('dialog');
  await expect(modal).toContainText('¿De qué año es este recuerdo?');
  await expect(modal).toContainText('La foto de Carmen bebé');
  // 1 = 1928 (bonne année pour la photo de Carmen bébé) : au clavier
  await page.keyboard.press('1');
  await expect(modal).toContainText('¡Recuerdo guardado!');
  await page.keyboard.press('Enter');
  // la clé de casa date de 1939 : touche 2 = 1936 (mauvaise)
  await expect(modal).toContainText('La llave de casa');
  await page.keyboard.press('2');
  await expect(modal).toContainText('El Olvido se lo lleva');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('le mot mystère se dévoile au fil des bonnes réponses', async ({ page }) => {
  await startRun(page, 'MOT-5');
  await page.locator('.sala.puede').first().click();
  const chip = page.locator('.chip.misterio');
  await expect(chip).toBeVisible();
  await expect(chip).toHaveAttribute('aria-label', /0 lettres trouvées/);
  await answerCurrent(page, data);
  await expect(chip).toHaveAttribute('aria-label', /[12] lettres? trouvées?/);
});

test('le professeur lit le code de fin de partie d’un élève (partie courte)', async ({ page, context }) => {
  await page.fill('#pseudo', 'Bot');
  await page.click('text=Créer et jouer');
  await page.getByRole('button', { name: /Partie courte/ }).click();
  await playToEnd(page, data, 5);
  const code = (await page.locator('.codigo').textContent())!.trim();
  expect(code).toMatch(/^[0-9A-Z]{5}-[0-9A-Z]{5}-[0-9A-Z]{5}-[0-9A-Z]{4}$/);
  // le professeur, sur un autre appareil, colle le code (avec un prénom devant)
  const prof = await context.newPage();
  await prof.goto('./#prof');
  await prof.fill('#prof-code', 'profe2026');
  await prof.click('text=Entrer');
  await prof.getByRole('tab', { name: 'Codes élèves' }).click();
  await prof.getByLabel('Codes des élèves').fill(`Lupita : ${code}\nMateo : ABCDE-ABCDE-ABCDE-ABCD`);
  const row = prof.locator('table.tabla tbody tr').first();
  await expect(row).toContainText('Lupita');
  await expect(row).toContainText('partie courte');
  await expect(row).toContainText('Alba');
  await expect(row).toContainText(/\d+\/\d+ \(\d+ %\)/);
  // un code mal recopié est signalé, sans empêcher de lire les autres
  await expect(prof.locator('table.tabla tbody tr.off')).toContainText('faute de recopie');
});

/* ======================= Étape 4 ======================= */

test('tout se joue au clavier : QCM (1 à 4), vrai/faux (V / F), réponse écrite, Entrée pour continuer', async ({ page }) => {
  await startRun(page, 'CLAVIER-4');
  const seen = new Set<string>();
  for (let step = 0; step < 600 && seen.size < 3; step++) {
    if (await handleCaja(page)) continue;
    if (await page.locator('.stats').count()) break;
    if (await page.locator('.mapa').count()) {
      const f = page.locator('.sala.puede.combat, .sala.puede.elite, .sala.puede.boss');
      await ((await f.count()) ? f.first() : page.locator('.sala.puede').first()).focus();
      await page.keyboard.press('Enter');
      continue;
    }
    const qa = page.locator('.combate .qa[data-qid]:not(:has(.fb))');
    if (await qa.count()) {
      const id = (await qa.getAttribute('data-qid'))!;
      const mode = (await qa.getAttribute('data-mode'))!;
      const q = data.bank[id];
      if (mode === 'qcm') {
        const labels = (await qa.locator('.op').allTextContents()).map(t => t.slice(1));
        await page.keyboard.press(String(labels.indexOf(q.answer!) + 1));
      } else if (mode === 'tf') {
        await page.keyboard.press(q.answer === 'verdadero' ? 'v' : 'f');
      } else if (mode === 'write') {
        await page.locator('.escr input').focus();
        await page.keyboard.type(q.answer!);
        await page.keyboard.press('Enter');
      } else {
        await answerCurrent(page, data); // plateaux : souris (ils se jouent aussi à Tab + Entrée)
        await page.locator('.combate .fb .btn').click();
        continue;
      }
      seen.add(mode);
      await expect(page.locator('.combate .fb')).toBeVisible();
      await expect(page.locator('.combate .fb .btn')).toBeFocused(); // le focus est déjà sur « Continuer »
      await page.keyboard.press('Enter');
      continue;
    }
    const next = page.locator('.fb .btn, .resultado .btn, .elige .item:not([disabled]), .eleccion:not([disabled]), button:has-text("Reprendre le chemin")');
    if (await next.count()) await next.first().click();
    else await page.waitForTimeout(40);
  }
  expect([...seen].sort()).toEqual(expect.arrayContaining(['qcm']));
  expect(seen.size).toBeGreaterThanOrEqual(2);
});

test('une réponse corrigée porte un symbole ✓ / ✗, pas seulement une couleur', async ({ page }) => {
  await startRun(page, 'SYMBOLE-4');
  await page.locator('.sala.puede').first().click();
  for (let i = 0; i < 40; i++) {
    const qa = page.locator('.combate .qa[data-qid]:not(:has(.fb))');
    if (await qa.count() && (await qa.getAttribute('data-mode')) === 'qcm') break;
    await answerCurrent(page, data);
    await page.locator('.combate .fb .btn').click();
  }
  await answerCurrent(page, data, true);
  const mark = (sel: string) => page.locator(sel).first().evaluate(e => getComputedStyle(e, '::after').content);
  expect(await mark('.combate .op.good')).toContain('✓');
  expect(await mark('.combate .op.bad')).toContain('✗');
  await expect(page.locator('.combate .fb')).toContainText('Bonne réponse');
});
