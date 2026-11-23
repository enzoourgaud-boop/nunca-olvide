# Étape 4 : ce que tu dois tester

Branche `etape-4-classe`. Les étapes 1 à 3 sont déjà sur `main`. Cette étape prépare l'utilisation en classe.

## Ce qui a été fait

- **Espace professeur : l'acte de la partie courte.** Quand tu coches « Imposer la partie courte », tu choisis l'acte (au hasard, ou acte 1, 2 ou 3). Le choix voyage dans le **code de classe** (toujours 6 caractères) et dans le **QR code**. L'élève qui l'applique voit « Partie courte (acte 2 : …) » et joue cet acte. Dans les actes 2 et 3, il part avec des PV et des souvenirs de plus (les actes précédents sont sautés).
- **Codes de fin de partie.** Le code dit maintenant si la partie était **courte** et quel acte a été joué (avant, une partie courte gagnée s'affichait « 3 actes terminés »). Le tableau de l'espace professeur affiche « victoire · partie courte (acte 2) ».
- **Accessibilité** : une réponse corrigée porte un symbole **✓** ou **✗** en plus de la couleur ; tout se joue au clavier (1 à 4, V / F, saisie, Entrée) ; le focus est déjà sur « Continuer » après une correction.
- **Correction d'un défaut de l'étape 3** : les étiquettes des phrases à remettre dans l'ordre et la fiche de l'épilogue partageaient un nom de style ; la fiche est maintenant isolée.
- **README final**, avec une **séance type de 15 à 20 minutes**.

## Tests automatiques (tous passent)

- **153 tests unitaires** : code de classe avec acte, partie courte lisible dans le code de fin, acte imposé, place pour les thèmes dans le code de classe, etc.
- **19 tests Playwright** : l'espace professeur impose l'acte 2 et l'élève démarre à l'acte 2 ; un élève joue une partie courte, le professeur colle son code (avec un prénom, et un code mal recopié) ; jeu 100 % clavier ; symboles ✓/✗ ; et tous les tests précédents (partie entière PC et téléphone, hors-ligne, affichage sans défiler sur PC, tablette et téléphone, frise, mot mystère).

## Captures (`docs/etape-4/`)

| Fichier | Ce qu'on voit |
|---|---|
| `01-pc-professeur-reglages.jpg` | réglages de classe, avec l'acte de la partie courte |
| `02-pc-professeur-code-et-qr.jpg` | code de classe et QR code |
| `03-pc-eleve-code-de-classe.jpg` | l'élève applique le code |
| `04-pc-reponse-corrigee-avec-symboles.jpg` | ✓ / ✗ sur une réponse corrigée |
| `05-pc-phrase-a-ordonner.jpg` | phrase à remettre dans l'ordre |
| `06-pc-fin-partie-courte-acte-2.jpg` | bilan d'une partie courte, avec son code |
| `07-pc-professeur-codes-eleves.jpg` | lecture des codes élèves |
| `08-tablette-professeur.jpg`, `09-telephone-professeur.jpg` | l'espace professeur sur tablette et téléphone |

## À toi de tester (environ 20 minutes)

1. **Espace professeur** (`#prof`, code `profe2026`) : coche la partie courte, choisis l'acte 3, ne garde que deux thèmes. Note le code de classe.
2. **Sur un autre appareil ou un autre navigateur** : tape ce code. L'accueil affiche-t-il bien tes réglages ? Joue la partie courte.
3. **Au bilan**, copie le code de fin de partie, puis colle-le dans l'onglet « Codes élèves » avec un prénom devant.
4. **Change `profe2026`** (onglet « Réglages de classe ») avant de donner l'adresse aux élèves.
5. **Au clavier seul** : joue deux combats sans souris.
6. **Sur un vieux PC du collège** si possible : le jeu est-il fluide ? C'est la seule chose que je n'ai pas pu mesurer.

## Ce qui reste

Rien de prévu. Quand tu avanceras dans la séquence et que tu auras de nouveaux documents, envoie-les : j'ajoute leurs questions (section 5 du README).
