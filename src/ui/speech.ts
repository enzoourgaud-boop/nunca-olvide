/**
 * Synthèse vocale du navigateur (speechSynthesis), entièrement locale : aucune donnée envoyée.
 * Ordre de préférence des voix : celui de sequence.json (es-MX, es-US, es-ES, es…).
 * Si aucune voix espagnole n'existe, l'interface passe en « lecture flash ».
 */

let cachedVoices: SpeechSynthesisVoice[] = [];
let loaded = false;
const waiters: (() => void)[] = [];

function synth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
}

function refresh() {
  const s = synth();
  if (!s) return;
  cachedVoices = s.getVoices();
  if (cachedVoices.length) {
    loaded = true;
    waiters.splice(0).forEach(f => f());
  }
}

if (synth()) {
  refresh();
  synth()!.addEventListener?.('voiceschanged', refresh);
}

/** Attend la liste des voix (au plus 1,5 s : certains navigateurs ne la donnent jamais). */
export function voicesReady(): Promise<void> {
  if (loaded || !synth()) return Promise.resolve();
  return new Promise(res => {
    waiters.push(res);
    setTimeout(() => {
      refresh();
      res();
    }, 1500);
  });
}

export function pickVoice(prefs: string[]): SpeechSynthesisVoice | null {
  // uniquement les voix installées sur l'appareil : une voix « en ligne » enverrait le texte à un service extérieur
  // et resterait muette sans connexion (on bascule alors sur la lecture éclair)
  const vs = cachedVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('es') && v.localService !== false);
  for (const p of prefs) {
    const exact = vs.find(v => v.lang.toLowerCase().replace('_', '-') === p.toLowerCase());
    if (exact) return exact;
  }
  return vs[0] ?? null;
}

export function canSpeak(prefs: string[]): boolean {
  return !!synth() && !!pickVoice(prefs);
}

/** Lit un texte. Renvoie false si c'est impossible (pas de voix espagnole). */
export function speak(text: string, prefs: string[], rate = 0.9): boolean {
  const s = synth();
  const v = pickVoice(prefs);
  if (!s || !v) return false;
  try {
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v;
    u.lang = v.lang;
    u.rate = rate;
    s.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking() {
  try {
    synth()?.cancel();
  } catch {
    /* rien */
  }
}
