/** Installation hors ligne (PWA) : le jeu se met en cache au premier chargement. Rien n'est envoyé. */
type Listener = (state: 'ready') => void;
const listeners = new Set<Listener>();
let ready = false;

export function onOfflineReady(fn: Listener): () => void {
  if (ready) fn('ready');
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function registerOffline() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || import.meta.env.DEV) return;
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({
        immediate: true,
        onOfflineReady() {
          ready = true;
          listeners.forEach(f => f('ready'));
        },
        onRegisteredSW(_url: string, reg: ServiceWorkerRegistration | undefined) {
          // déjà en cache lors d'une visite précédente
          if (reg?.active) {
            ready = true;
            listeners.forEach(f => f('ready'));
          }
        },
      });
    })
    .catch(() => {
      /* service worker indisponible (navigation privée, aperçu) : le jeu marche quand même en ligne */
    });
}
