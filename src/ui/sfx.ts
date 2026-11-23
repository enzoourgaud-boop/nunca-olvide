/**
 * Effets sonores rétro générés avec la Web Audio API : aucun fichier, aucune licence.
 * Le son ne démarre qu'après une première interaction (règle des navigateurs) et se coupe dans les options.
 */
import { loadPrefs } from '../prefs';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio(): AudioContext | null {
  const p = loadPrefs();
  if (!p.sound) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') void ctx.resume();
    master!.gain.value = 0.25 * p.volume;
    return ctx;
  } catch {
    return null;
  }
}

type Wave = OscillatorType;

/** Une note : fréquence (Hz), début (s), durée (s). */
function tone(freq: number, at: number, dur: number, wave: Wave = 'square', vol = 1, slideTo?: number) {
  const a = audio();
  if (!a || !master) return;
  const t = a.currentTime + at;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = wave;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

/** Bruit blanc filtré (coups, chocs). */
function noise(at: number, dur: number, vol = 0.6, freq = 1200) {
  const a = audio();
  if (!a || !master) return;
  const t = a.currentTime + at;
  const len = Math.max(1, Math.floor(a.sampleRate * dur));
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = a.createBufferSource();
  src.buffer = buf;
  const f = a.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = freq;
  const g = a.createGain();
  g.gain.value = vol;
  src.connect(f).connect(g).connect(master);
  src.start(t);
}

const N = { C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880, B5: 988, C6: 1047, E6: 1319, G6: 1568, A4: 440, G4: 392, E4: 330, C4: 262, Eb4: 311 };

export type Sfx =
  | 'ok' | 'crit' | 'ko' | 'casi' | 'hit' | 'hurt' | 'coin' | 'tap' | 'step' | 'victory' | 'defeat' | 'unlock' | 'phase'
  | 'heal' | 'shield' | 'fight';

export function play(s: Sfx) {
  switch (s) {
    case 'tap': return tone(N.A5, 0, 0.04, 'square', 0.3);
    case 'step': return tone(N.E5, 0, 0.05, 'triangle', 0.5), tone(N.A5, 0.05, 0.06, 'triangle', 0.5);
    case 'ok': return tone(N.C6, 0, 0.07), tone(N.E6, 0.07, 0.07), tone(N.G6, 0.14, 0.12);
    case 'crit': return tone(N.C5, 0, 0.06), tone(N.G5, 0.05, 0.06), tone(N.C6, 0.1, 0.06), tone(N.G6, 0.15, 0.16), noise(0.55, 0.15, 0.4, 3000);
    case 'ko': return tone(N.E5, 0, 0.12, 'sawtooth', 0.5, N.C4), tone(N.Eb4, 0.13, 0.22, 'sawtooth', 0.4, 120);
    case 'casi': return tone(N.G5, 0, 0.09, 'triangle', 0.6), tone(N.F5, 0.1, 0.12, 'triangle', 0.6);
    case 'hit': return noise(0.6, 0.12, 0.7, 2200), tone(N.C5, 0.6, 0.08, 'square', 0.4, 200);
    case 'hurt': return noise(0.35, 0.2, 0.9, 700), tone(140, 0.35, 0.2, 'square', 0.6, 60);
    case 'coin': return tone(N.B5, 0, 0.06, 'square', 0.5), tone(N.E6, 0.06, 0.14, 'square', 0.5);
    case 'heal': return tone(N.C5, 0, 0.1, 'triangle'), tone(N.E5, 0.08, 0.1, 'triangle'), tone(N.A5, 0.16, 0.18, 'triangle');
    case 'shield': return tone(N.A4, 0, 0.18, 'triangle', 0.7, N.A5);
    case 'phase': return tone(110, 0, 0.6, 'sawtooth', 0.6, 55), noise(0.1, 0.5, 0.5, 400);
    case 'fight': return [N.E4, N.G4, N.A4, N.C5].forEach((f, i) => tone(f, i * 0.07, 0.08, 'square', 0.5));
    case 'unlock': return [N.C6, N.E6, N.G6, N.C6 * 2].forEach((f, i) => tone(f, i * 0.06, 0.1, 'square', 0.35));
    case 'victory':
      return [[N.C5, 0.12], [N.E5, 0.12], [N.G5, 0.12], [N.C6, 0.3], [N.G5, 0.12], [N.C6, 0.5]].reduce((t, [f, d]) => {
        tone(f, t, d, 'square', 0.6);
        tone(f / 2, t, d, 'triangle', 0.4);
        return t + d;
      }, 0);
    case 'defeat':
      return [[N.G4, 0.25], [N.Eb4, 0.25], [N.C4, 0.6]].reduce((t, [f, d]) => {
        tone(f, t, d, 'triangle', 0.6);
        return t + d;
      }, 0);
  }
}
