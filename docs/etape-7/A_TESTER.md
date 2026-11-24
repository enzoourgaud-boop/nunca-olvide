# Étape 7 : ce que tu dois tester

Branche `etape-7-domaines`. Les étapes 1 à 6 sont sur `main`.

## Ce qui a été fait

Sur l'**écran d'accueil**, au-dessus du choix du personnage, un nouveau bloc **« Qu'est-ce que tu veux travailler ? »** :

| Choix | Thèmes |
|---|---|
| 🎲 **Tout mélangé** (par défaut) | tous |
| ⏳ **Le passé simple** | verbes réguliers + verbes irréguliers + ¿ser o ir ? |
| ✒️ **Verbes réguliers** | -AR, -ER, -IR et les accents |
| 🔀 **Verbes irréguliers** | pidió, durmió, tuvo, estuvo, dijeron… |
| 🧭 **¿Ser o ir ?** | fui, fue, fueron |
| 📜 **L'histoire de la guerre** | dates, camps, Franco, exil, frise, carte |
| 📖 **Le lexique** | les mots de la guerre |

- Le jeu affiche le **nombre de questions** du domaine, et rappelle « Tu travailles : … » à côté des boutons de lancement.
- Le choix est **gardé sur l'appareil** et s'applique partout : combats, événements, coffres et échauffement des erreurs. Les erreurs d'un autre domaine attendent la prochaine partie qui les concerne.
- **Le code de classe du professeur est prioritaire** : s'il impose des thèmes, le choix est grisé avec une explication ; l'élève retire le code pour le débloquer.
- L'événement *El mapa de España* (histoire) n'apparaît plus quand le domaine l'exclut ; il posait sinon une question hors domaine.
- Jouable **au clavier** (Tab, Entrée) et au lecteur d'écran (groupe de boutons radio) ; le choix est marqué par un ✓ et un cadre, pas seulement par une couleur.
- Les domaines sont des données (`domains` dans `sequence.json`) : on peut en ajouter ou les renommer sans toucher au code.

## Tests automatiques (tous passent)

- **159 tests unitaires** (5 nouveaux) : pour chaque domaine, 12 parties entières simulées (combats, événements, coffres) ne posent **aucune question hors domaine** ; chaque domaine a au moins 25 questions ; un élève à 90 % gagne plus de 7 parties sur 10 en moins de 25 minutes dans chaque domaine.
- **22 tests Playwright** (1 nouveau) : au clavier, choisir « Le passé simple », recharger (le choix est gardé), jouer, et vérifier que les questions sont de ce domaine ; le choix est verrouillé par un code de classe.

## Ce que les parties donnent (simulation, 60 parties par domaine)

Durée : 15 à 18 minutes dans tous les domaines. Victoires : de 72 % à 85 % à 75 % de bonnes réponses, de 92 % à 98 % à 90 %. 

⚠️ Les petits domaines **répètent les questions** : « ¿Ser o ir ? » a 29 questions, « L'histoire » 27, pour 40 à 50 réponses par partie. C'est voulu (les erreurs reviennent) mais ça se remarque.

## Captures (`docs/etape-7/`)

`01-pc-menu-domaines.jpg` (choix sur ordinateur), `02-pc-menu-theme-impose-par-le-professeur.jpg` (verrouillé par un code de classe), `03-telephone-menu-domaines.jpg` (téléphone).

## À toi de tester (10 minutes)

1. Choisis **Le passé simple**, lance une partie courte : toutes les questions sont-elles des verbes ?
2. Les **noms et les descriptions** te conviennent-ils ? (Veux-tu un domaine « Les accents » ? « Les prétérits forts » ? Je peux en ajouter.)
3. Dans l'espace professeur, décoche un thème, applique le code sur un autre appareil : le choix du menu est-il bien verrouillé ?
4. Sur **téléphone** : le bloc est-il lisible ?
