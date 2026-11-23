# Étape 5 : ce que tu dois tester

Branche `etape-5-animations-audio`. Les étapes 1 à 4 sont sur `main`.

## Ce qui a été fait

### Animations d'attaque et de riposte
Avant, l'ombre ne bougeait que quand l'élève se trompait. Comme maintenant « chacun attaque à son tour », le combat se joue en deux temps :

1. **Bonne réponse** : une étincelle part de l'élève, l'ombre clignote, recule et affiche « −N ». **Puis (1,25 s plus tard) la riposte** : l'ombre s'élance, une tache d'encre vole vers l'élève, impact 💥, l'élève clignote, recule, l'écran tremble, « −N » sur l'élève.
2. **Mauvaise réponse** : pas de coup de l'élève, la riposte part tout de suite.
3. Si l'élève porte un souvenir qui bloque le coup, un 🛡️ remplace l'impact.
4. **Les sons suivent les gestes** (coup, puis impact), au lieu d'arriver tous ensemble.
5. **« Réduire les animations »** (options ou réglage de l'appareil) : plus aucune tache volante ni impact, plus aucune attente.

### Audio de la compréhension orale
Les 36 questions d'écoute ont chacune **un fichier audio** (normal et lent) livré avec le jeu : elles marchent même sur un PC sans voix espagnole, et hors ligne. Les boutons « 🔊 Écouter » et « 🐢 Plus lentement » lisent ces fichiers. Tu peux les remplacer par ta propre voix (README, partie 4 bis).

⚠️ **Je n'ai pas pu écouter les fichiers.** La voix est de la synthèse (espeak-ng) : intelligible mais de type « robot ». J'ai vérifié qu'ils se lisent dans un navigateur et que l'accent tonique est au bon endroit (*habló* / *hablo*).

## Tests automatiques (tous passent)

- **156 tests unitaires** (dont 3 sur les fichiers audio : présents, mp3 valides, version lente plus longue).
- **22 tests Playwright** : l'écoute charge les fichiers audio, même sans voix espagnole ; les fichiers sont dans le cache hors ligne ; mon coup puis la riposte (classes d'animation, délai de 1,25 s, mauvaise réponse = riposte immédiate, mode « réduire les animations ») ; et tous les tests précédents.
- Le navigateur de test décode et joue réellement les mp3 (durées mesurées : phrase normale 4,8 s, lente 6,4 s).

## Captures (`docs/etape-5/`)

| Fichier | Ce qu'on voit |
|---|---|
| `01-animation-bonne-reponse.jpg` | 7 images d'une bonne réponse : mon coup, puis la riposte |
| `02-animation-mauvaise-reponse.jpg` | 5 images d'une mauvaise réponse |

## À toi de tester (environ 15 minutes)

1. **Écoute** : dans l'espace professeur, ne garde que le type « Compréhension orale », génère le code de classe, applique-le. Écoute 5 questions. La voix est-elle assez claire pour tes élèves ? Les phrases sont-elles trop lentes ou trop rapides ? « Plus lentement » aide-t-il ?
2. **Les paires d'accent** (*habló* / *hablo*, *luchó* / *lucho*…) : s'entend-on la différence ?
3. **Combat** : joue deux ou trois combats. Les animations sont-elles assez visibles ? Trop longues ? (Elles durent environ 2 secondes ; tu peux répondre sans les attendre.)
4. **Sur un vieux PC ou une tablette** : les animations restent-elles fluides ?
5. **Réduire les animations** (⚙️) : la riposte est-elle bien sans animation ?

## Si la voix ne te convient pas

- **La remplacer** par ta voix : README, partie 4 bis (un fichier mp3 par question, même nom que l'identifiant).
- **Retirer les questions d'écoute** : dis-le-moi, je les désactive (`"disabled": true`) ; le reste du jeu ne change pas.
