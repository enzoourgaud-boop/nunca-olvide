# Étape 2 : ce que tu dois tester

Branche `etape-2-contenu`. C'est la première version jouable : nouveau contenu, nouvel univers, combat « chacun attaque à son tour ».

## Ce qui a été fait

- **388 questions** tirées de tes documents, en 6 thèmes : verbes réguliers, verbes irréguliers, ¿ser o ir?, histoire de la guerre, souvenirs (Carmen et la BD), lexique. Les 7 types sont présents. Chaque question a une correction expliquée et indique son document. **Rien sur Pepe et sa famille.**
- **Combat** : l'ombre attaque **à chaque tour** ; une bonne réponse, et c'est toi qui frappes.
- **Chaque ombre pose ses questions** : las Sirenas à l'oral, la Leyenda en vrai/faux, el Remolino avec la chronologie, la Frontera à l'écrit…
- **Accents** : *lucho* pour *luchó* est compté faux, *tuvó* aussi ; *vivi* pour *viví* donne « ¡Casi! ».
- **Partie courte** (8 à 10 min, un acte) : bouton sur l'accueil, et imposable dans le code de classe.
- **Chrono désactivé par défaut.**
- **Univers** : papier, encre et sépia ; un enfant qui porte la boîte de souvenirs ; une frise de dates en en-tête ; une nouvelle icône ; une musique originale (désactivée par défaut, dans les options).
- **Sauvegardes séparées** de celles de *Cempasúchil*, même si les deux jeux sont en ligne à la même adresse `github.io`.
- **README** réécrit pour toi, **A_VERIFIER.md** complété avec les identifiants des questions.

## Tests automatiques (tous passent)

- **134 tests unitaires** : correction des réponses, accents, réponses acceptées, combat, partie courte, code de classe, erreurs qui reviennent, variété des questions.
- **Équilibrage par simulation** : à 90 % de bonnes réponses, 91 % de victoires en 16,5 min en moyenne ; à 75 %, 58 % en 19 min ; à 60 %, l'acte 1 est passé dans plus de 2 parties sur 3 ; au hasard, aucune victoire. Partie courte : 8 à 10 min en moyenne.
- **12 tests Playwright** : une partie entière sur PC et sur téléphone, l'espace professeur avec le code de classe, le hors-ligne, le clavier, l'affichage sans défiler (PC, PC fenêtre basse, tablette, téléphone), le chrono, les erreurs qui reviennent.

## Captures (`docs/etape-2/`)

| Fichier | Ce qu'on voit |
|---|---|
| `00-pc-accueil.jpg` | l'accueil : titre, jefes, personnages |
| `01-pc-carte.jpg` | la carte de l'acte 1 |
| `02-pc-combat-qcm.jpg` | un combat (QCM) |
| `03-pc-correction-expliquee.jpg` | une erreur : correction et source |
| `04-pc-reponse-ecrite.jpg` | une réponse écrite |
| `05-pc-vrai-faux.jpg` | un vrai/faux |
| `06-pc-ecoute-sirenas.jpg` | une question d'écoute |
| `07-pc-frise-chronologique.jpg` | placer les événements sur la frise |
| `08-pc-phrase-a-ordonner.jpg` | une phrase à remettre dans l'ordre |
| `09-pc-espace-professeur.jpg` | l'espace professeur |
| `10-pc-fin-de-partie-courte.jpg` | le bilan d'une partie courte, avec le code |
| `11-tablette-combat.jpg`, `12-telephone-combat.jpg`, `13-telephone-correction.jpg` | tablette et téléphone |

## À toi de tester (environ 30 minutes)

1. **Lancer le jeu** (voir le résumé de la conversation pour l'ouvrir) et créer un profil.
2. **Partie courte** : joue-la jusqu'au bout. Durée ressentie ? Difficulté ?
3. **Correction** : rate exprès quelques questions. L'explication est-elle claire pour un élève de 3e ?
4. **Accents** : à une question écrite, tape *lucho* au lieu de *luchó*, puis *vivi* au lieu de *viví*. Le premier doit être faux, le second « ¡Casi! ».
5. **Les erreurs reviennent** : rate 2 questions, reviens au menu, relance une partie. L'échauffement « Tus palabras pendientes » doit les reposer.
6. **Espace professeur** (`#prof`, code `profe2026`) : coupe un thème, impose la partie courte, génère le code et le QR code, ouvre le lien sur un autre appareil.
7. **Tablette ou téléphone** : la question et les réponses se voient-elles sans défiler ?
8. **Lis `docs/A_VERIFIER.md`** et coche ce qui te va (surtout la partie 1 : réponses déduites).

## Ce qui reste pour l'étape 3

Ranger les souvenirs sur la frise, placer les villes sur la carte de l'Espagne (mots de position), le mot mystère de chaque acte, et l'épilogue avec la ficha de identidad.
