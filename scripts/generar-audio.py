#!/usr/bin/env python3
"""
Génère les fichiers audio des questions de compréhension orale (public/audio/<id>.mp3).

Voix : espeak-ng (synthèse libre, hors ligne), voix espagnole « es ». Aucun service en ligne, aucune donnée envoyée.
Pour chaque question : <id>.mp3 (débit normal) et <id>-lento.mp3 (bouton « plus lentement »).
Pour remplacer une voix de synthèse par une vraie voix (la tienne, par exemple) : enregistre la phrase, nomme le fichier
<identifiant de la question>.mp3 et dépose-le dans public/audio/. Le jeu lit toujours ce fichier en premier ;
sans fichier -lento, « plus lentement » ralentit le fichier normal.

Utilisation (depuis le dossier du jeu) :
    python3 -m venv /tmp/tts && /tmp/tts/bin/pip install espeakng-loader numpy
    /tmp/tts/bin/python scripts/generar-audio.py          # ne génère que les fichiers qui manquent
    /tmp/tts/bin/python scripts/generar-audio.py --tout   # régénère tout
Il faut aussi ffmpeg (conversion en mp3).
"""
import ctypes, glob, json, os, subprocess, sys, tempfile, wave
import numpy as np
import espeakng_loader

RACINE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
QUESTIONS = os.path.join(RACINE, 'content', 'sequences', 'guerra-civil', 'questions')
SORTIE = os.path.join(RACINE, 'public', 'audio')
VOIX, DEBIT, DEBIT_LENT = b'es', 130, 95  # mots par minute : un peu lent (élèves de 3e), et très lent pour « plus lentement »


import re

_UN = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
_ESP = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
        'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve']
_DEC = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}


def annee(n: int) -> str:
    """1936 -> « mil novecientos treinta y seis » (les années 1900 à 1999 : celles de la séquence)."""
    r = n - 1900
    if r == 0:
        return 'mil novecientos'
    if r < 10:
        return 'mil novecientos ' + _UN[r]
    if r < 30:
        return 'mil novecientos ' + _ESP[r - 10]
    d, u = divmod(r, 10)
    return 'mil novecientos ' + _DEC[d] + (' y ' + _UN[u] if u else '')


def lire(texte: str) -> str:
    return re.sub(r'\b(19\d\d)\b', lambda m: annee(int(m.group(1))), texte)


class Synthese:
    def __init__(self):
        lib = ctypes.CDLL(espeakng_loader.get_library_path())
        self.lib = lib
        lib.espeak_Initialize.restype = ctypes.c_int
        self.rate = lib.espeak_Initialize(2, 0, espeakng_loader.get_data_path().encode(), 0)  # 2 = AUDIO_OUTPUT_SYNCHRONOUS
        if self.rate <= 0:
            raise SystemExit('espeak-ng ne démarre pas')
        if lib.espeak_SetVoiceByName(VOIX) != 0:
            raise SystemExit('voix espagnole introuvable')
        lib.espeak_SetParameter(1, DEBIT, 0)  # espeakRATE
        self.buf = []
        CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)

        def rappel(wav, n, _ev):
            if wav and n > 0:
                self.buf.append(np.ctypeslib.as_array(wav, shape=(n,)).copy())
            return 0

        self.rappel = CB(rappel)  # garder une référence
        lib.espeak_SetSynthCallback(self.rappel)

    def dire(self, texte: str, debit: int = DEBIT) -> np.ndarray:
        self.lib.espeak_SetParameter(1, debit, 0)  # espeakRATE
        self.buf = []
        data = texte.encode('utf-8')
        self.lib.espeak_Synth(data, len(data) + 1, 0, 1, 0, 1, None, None)  # POS_CHARACTER, espeakCHARS_UTF8
        self.lib.espeak_Synchronize()
        return np.concatenate(self.buf) if self.buf else np.zeros(0, dtype=np.int16)


def en_mp3(pcm: np.ndarray, rate: int, chemin: str):
    pcm = pcm.astype(np.float32)
    pic = np.max(np.abs(pcm)) or 1.0
    pcm = pcm / pic * 0.85 * 32767  # volume homogène d'un fichier à l'autre
    silence = np.zeros(int(rate * 0.25), dtype=np.float32)
    pcm = np.concatenate([silence, pcm, silence]).astype(np.int16)
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        nom = f.name
    with wave.open(nom, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', nom, '-codec:a', 'libmp3lame', '-b:a', '48k', '-ac', '1', chemin], check=True)
    os.unlink(nom)


def questions_ecoute():
    for f in sorted(glob.glob(os.path.join(QUESTIONS, '*.json'))):
        if f.endswith('professeur.json'):
            continue
        for q in json.load(open(f, encoding='utf-8')):
            if q.get('type') == 'ecoute' and not q.get('disabled'):
                yield q['id'], q.get('say') or q['answer']


if __name__ == '__main__':
    tout = '--tout' in sys.argv
    os.makedirs(SORTIE, exist_ok=True)
    s = Synthese()
    n = 0
    for qid, texte in questions_ecoute():
        chemin = os.path.join(SORTIE, f'{qid}.mp3')
        lent = os.path.join(SORTIE, f'{qid}-lento.mp3')
        if os.path.exists(chemin) and os.path.exists(lent) and not tout:
            continue
        pcm = s.dire(lire(texte))
        if len(pcm) < s.rate * 0.2:
            raise SystemExit(f'audio vide pour {qid}')
        en_mp3(pcm, s.rate, chemin)
        en_mp3(s.dire(lire(texte), DEBIT_LENT), s.rate, lent)
        n += 1
        print(f'{qid}: « {lire(texte)} » ({len(pcm) / s.rate:.1f} s)')
    print(f'{n} fichier(s) généré(s) dans {os.path.relpath(SORTIE)}')
