/**
 * Glisser-déposer au doigt et à la souris (Pointer Events).
 * Un appui sans mouvement reste un simple clic : le même élément marche au toucher, à la souris et au clavier.
 * Les zones de dépôt portent l'attribut data-drop.
 */
export function pointerDrag(ev: PointerEvent, src: HTMLElement, onDrop: (target: HTMLElement | null, x: number, y: number) => void) {
  if (ev.pointerType === 'mouse' && ev.button !== 0) return;
  const x0 = ev.clientX, y0 = ev.clientY;
  let ghost: HTMLElement | null = null;
  let over: HTMLElement | null = null;
  let dx = 0, dy = 0;

  const targetAt = (x: number, y: number) => {
    if (ghost) ghost.style.display = 'none';
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (ghost) ghost.style.display = '';
    return el?.closest<HTMLElement>('[data-drop]') ?? null;
  };
  const move = (e: PointerEvent) => {
    if (!ghost) {
      if (Math.hypot(e.clientX - x0, e.clientY - y0) < 8) return;
      const r = src.getBoundingClientRect();
      dx = x0 - r.left;
      dy = y0 - r.top;
      ghost = src.cloneNode(true) as HTMLElement;
      ghost.classList.add('fantasma');
      ghost.style.width = `${r.width}px`;
      ghost.removeAttribute('id');
      document.body.appendChild(ghost);
      src.classList.add('arrastrando');
    }
    e.preventDefault();
    ghost.style.transform = `translate(${e.clientX - dx}px, ${e.clientY - dy}px)`;
    const t = targetAt(e.clientX, e.clientY);
    if (t !== over) {
      over?.classList.remove('sobre');
      t?.classList.add('sobre');
      over = t;
    }
  };
  const end = (e: PointerEvent) => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', end);
    window.removeEventListener('pointercancel', end);
    over?.classList.remove('sobre');
    if (!ghost) return; // simple appui : le clic normal s'en charge
    const t = e.type === 'pointercancel' ? null : targetAt(e.clientX, e.clientY);
    ghost.remove();
    src.classList.remove('arrastrando');
    // le clic qui suit un glisser ne doit pas compter
    const block = (c: Event) => {
      c.stopPropagation();
      c.preventDefault();
    };
    window.addEventListener('click', block, { capture: true, once: true });
    setTimeout(() => window.removeEventListener('click', block, { capture: true }), 0);
    onDrop(t, e.clientX, e.clientY);
  };
  window.addEventListener('pointermove', move, { passive: false });
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
}
