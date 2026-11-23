# Étape 3 : ce que tu dois tester

Branche `etape-3-gestes`. L'étape 2 est déjà sur `main`. Ici, quatre gestes de plus où l'espagnol sert à décider.

## Ce qui a été fait

- **La caja de los recuerdos** : 4 souvenirs sont « datés » (foto de Carmen bebé 1928, las cartas 1936, mapa de Bielsa 1938, llave de casa 1939). À la réception, une fenêtre donne un indice en espagnol et demande l'année sur la frise : **bonne année = on garde le souvenir, mauvaise = l'Olvido l'emporte**. Jouable au clavier (1 à 4, Entrée).
- **Le mot mystère** en haut de l'écran : GUERRA CIVIL (acte 1), ESPERANZA (acte 2), EXILIO (acte 3). Une lettre par bonne réponse, deux à l'écrit, trois avec l'événement *La misión secreta*. Mot complet : +1 dégât contre le jefe.
- **La carte de l'Espagne** (contour stylisé dessiné pour le jeu) : 6 questions (Huesca, la frontière, Madrid) et l'événement *El mapa de España*.
- **L'épilogue** : la ficha de identidad de la guerre s'affiche après une victoire en partie complète.
- **Pas de plus-que-parfait** (un test automatique le vérifie). **394 questions** au total.

## Tests automatiques (tous passent)

- **150 tests unitaires** (dont 15 nouveaux : rangement des souvenirs, mauvaise année, sauvegarde, mot mystère, carte, épilogue).
- **15 tests Playwright** : une partie entière sur PC et sur téléphone (avec rangement des souvenirs et ficha finale), la caja au clavier, le mot mystère, l'espace professeur, le hors-ligne, l'affichage sans défiler (PC, PC fenêtre basse, tablette, téléphone).
- **Équilibrage par simulation** (le robot range aussi les souvenirs) : 90 % de bonnes réponses → 96 % de victoires en 16 min ; 75 % → 76 % en 19 min ; 60 % → 35 % ; au hasard, moins de 2 %.

## Captures (`docs/etape-3/`)

| Fichier | Ce qu'on voit |
|---|---|
| `01-pc-caja-a-ranger.jpg` | la fenêtre de la frise : indice en espagnol et quatre années |
| `02-pc-caja-bonne-annee.jpg` / `03-pc-caja-mauvaise-annee.jpg` | bonne et mauvaise année |
| `04-pc-mot-mystere.jpg` | le mot mystère qui se dévoile |
| `05-pc-carte-espagne.jpg` | placer les lieux sur la carte |
| `06-pc-epilogue-ficha.jpg` | la ficha de identidad |
| `07-telephone-caja.jpg` | la frise sur téléphone |

## À toi de tester (environ 20 minutes)

1. Joue une **partie complète** jusqu'à la ficha finale (ou une partie courte pour voir la frise).
2. **La frise** : les indices sont-ils assez clairs pour des 3e ? Les années te paraissent-elles justes ? (*las cartas = 1936* est une déduction.)
3. **La carte de l'Espagne** : le contour te convient-il ? La question avec **Madrid** n'est dans aucun de tes documents : à garder ou à retirer ?
4. **Le mot mystère** : les élèves le remarquent-ils ? Faut-il le rendre plus visible ?
5. Sur **téléphone** : la fenêtre de la frise et la carte tiennent-elles à l'écran ?
6. **Lis la partie 5 de `docs/A_VERIFIER.md`** et coche ce qui te va.

## Ce qui reste

Étape 4 : espace professeur (acte imposé pour la partie courte), README final, réglages de durée si les essais en classe le demandent.
