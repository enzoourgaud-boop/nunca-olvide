/**
 * Fichiers audio des questions d'écoute : public/audio/<id>.mp3, et <id>-lento.mp3 pour « plus lentement ».
 * Ils sont chargés en mémoire par fetch (donc servis par le cache hors ligne, y compris sous Safari, qui lit mal
 * les fichiers audio qui passent par un service worker), puis lus depuis cette copie.
 */
const cache = new Map<string, Promise<string | null>>();
let current: HTMLAudioElement | null = null;

const href = (name: string) => new URL(`audio/${name}.mp3`, document.baseURI).href;

function load(name: string): Promise<string | null> {
  let p = cache.get(name);
  if (!p) {
    p = fetch(href(name))
      // un hébergeur qui répond par une page HTML pour un fichier absent n'est pas un fichier audio
      .then(r => (r.ok && !(r.headers.get('content-type') ?? '').includes('text/html') ? r.blob() : Promise.reject(new Error('absent'))))
      .then(b => URL.createObjectURL(b))
      .catch(() => null);
    cache.set(name, p);
  }
  return p;
}

/** Y a-t-il un fichier audio pour cette question ? */
export const audioReady = (id: string): Promise<boolean> => load(id).then(u => !!u);

/** Joue l'audio de la question. Renvoie false s'il n'y a pas de fichier ou si le navigateur refuse de le lire. */
export async function playAudio(id: string, slow = false): Promise<boolean> {
  stopAudio();
  let url = slow ? await load(`${id}-lento`) : null;
  const rate = slow && !url ? 0.75 : 1; // pas de version lente : on ralentit le fichier normal
  url ??= await load(id);
  if (!url) return false;
  const a = new Audio(url);
  a.playbackRate = rate;
  current = a;
  try {
    await a.play();
    return true;
  } catch {
    return false;
  }
}

export function stopAudio() {
  current?.pause();
  current = null;
}
