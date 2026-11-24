# Nunca olvidé

Un jeu vidéo pour réviser l'espagnol en **3e (A2 vers B1)** sur la séquence **La guerra civil española**.

L'élève est la petite-fille ou le petit-fils de la abuela Carmen, née en 1928. En ouvrant sa boîte de souvenirs, il voit les souvenirs s'effacer : des « ombres de l'oubli » (el Miedo, el Hambre, la Leyenda, las Sirenas…) en rongent les mots. Pour les sauver, il répond en espagnol. On ne combat jamais un camp ni des soldats : on combat l'oubli.

C'est un « roguelike » : on avance sur une carte à embranchements, chaque partie est différente, on ramasse des souvenirs qui rendent plus fort.

- **Partie complète** : 3 actes, **15 à 25 minutes**. **Partie courte** : 1 acte, **8 à 10 minutes**.
- Il fonctionne dans le navigateur, sur les PC du collège, les tablettes et les téléphones.
- Il n'y a **ni serveur, ni compte élève, ni publicité**. Aucune donnée ne quitte l'appareil.
- Une fois chargé, il fonctionne **sans connexion**.

> **Où en est le projet ?** Les étapes 1 à 7 sont sur `main`. L'étape 8 (une question réussie ne revient plus dans la même partie, retour des élèves) est sur la branche `etape-8-sans-repetition` : ce qu'il te reste à tester est dans [`docs/etape-8/A_TESTER.md`](docs/etape-8/A_TESTER.md).

---

## Sommaire

1. [Comment on joue](#1-comment-on-joue)
2. [Utiliser le jeu en classe](#2-utiliser-le-jeu-en-classe) (dont une séance type de 15 minutes)
3. [L'espace professeur](#3-lespace-professeur)
4. [Modifier ou ajouter des questions](#4-modifier-ou-ajouter-des-questions)
5. [Ajouter un nouveau document de la séquence](#5-ajouter-un-nouveau-document-de-la-séquence)
6. [Mettre le jeu en ligne](#6-mettre-le-jeu-en-ligne)
7. [Confidentialité et RGPD](#7-confidentialité-et-rgpd)
8. [Accessibilité](#8-accessibilité)
9. [Pour aller plus loin (tests, simulations)](#9-pour-aller-plus-loin)
10. [Licences et crédits](#10-licences-et-crédits)

---

## 1. Comment on joue

**Le combat : chacun attaque à son tour.**

1. L'ombre annonce son attaque (« El Miedo prépare : Attaque 1 »).
2. Une question s'affiche. **Bonne réponse : l'élève frappe.** Mauvaise réponse : son coup rate, et la **correction expliquée** s'affiche avec le document d'où vient la question.
3. L'ombre frappe à son tour, **à chaque tour**, que la réponse soit juste ou non.

Le coup de l'élève part d'abord (étincelle, l'ombre clignote et recule, « −1 »), puis la **riposte** de l'ombre (une tache d'encre vole vers l'élève, impact, recul, « −1 »). Une erreur fait partir la riposte tout de suite. Une réponse **écrite** frappe plus fort qu'un QCM, et une **série** de bonnes réponses aussi. Un accent oublié donne « ¡Casi! » : pas de dégât, mais la série continue.

**Chaque ombre a sa façon de poser les questions :**

| Ombre | Ce qu'elle demande |
|---|---|
| Las Sirenas (jefe de l'acte 1) | conjugaison au passé simple (le chrono est plus court si tu l'actives), puis l'histoire de la guerre |
| La Leyenda | vrai ou faux sur tes documents |
| El Remolino de Fechas | remettre les phrases et les dates dans l'ordre, placer les événements sur la frise 1928-1939 |
| El Héroe de Tebeo | ¿ser o ir? |
| La Frontera | tout à l'écrit |
| El Olvido (jefe final) | à l'écrit, puis la chronologie, puis la phrase de Carmen : *Nunca olvidé esos años* |

**Dans la partie, l'espagnol sert aussi à décider :**

- **La caja de los recuerdos** : certains souvenirs sont *datés* (les lettres des années de guerre, la clé de la maison). Quand l'élève en reçoit un, il lit un indice en espagnol et le range sur la **frise 1928 · 1936 · 1938 · 1939**. Bonne année : il garde le souvenir et son pouvoir. Mauvaise année : l'Olvido l'emporte. (Touches 1 à 4 au clavier.)
- **Le mot mystère** (en haut de l'écran) : chaque acte cache un mot (GUERRA CIVIL, ESPERANZA, EXILIO). Une lettre apparaît à chaque bonne réponse, deux à l'écrit. Mot complet : le jefe est affaibli.
- **La carte de l'Espagne** : un événement demande de situer Huesca, la frontière avec la France et Madrid (*en el norte, en el este, en el centro…*).
- **La ficha de identidad** : à la fin d'une victoire, la fiche de la guerre (date de début, durée, année de fin, les deux camps, chef des militaires) s'affiche, remplie.

**Travailler un domaine en particulier.** Sur l'écran d'accueil, « *Qu'est-ce que tu veux travailler ?* » propose : **Tout mélangé** (par défaut), **Le passé simple** (verbes réguliers, irréguliers et ¿ser o ir ?), **Verbes réguliers**, **Verbes irréguliers**, **¿Ser o ir ?**, **L'histoire de la guerre**, **Le lexique**. Le choix est gardé sur l'appareil et ne pose ensuite que des questions de ce domaine (combats, événements, coffres, échauffement des erreurs). Si ton professeur a donné un **code de classe** qui impose des thèmes, le choix est verrouillé jusqu'à ce que tu retires le code.

**Entre les combats** : des lettres et des scènes en espagnol où l'élève choisit sa réponse (*Una carta*), un marché d'objets d'occasion (*El rastro*), un abri pour se reposer (*El refugio*), des boîtes oubliées.

**Les accents comptent** (comme sur ta fiche) : *luchó* (il lutta) n'est pas *lucho* (je lutte). Pour les verbes au pretérito :

- un accent oublié qui donne **une autre forme** est compté faux (*lucho* pour *luchó*, *volvio* pour *volvió*), avec l'explication ;
- un accent ajouté sur un prétérit fort est compté faux (*tuvó*, *hizó*) ;
- les autres accents oubliés donnent « ¡Casi! » (*vivi* pour *viví*).

---

## 2. Utiliser le jeu en classe

- **Premier lancement** : chaque élève crée un **profil** (un pseudo et une icône). Le jeu conseille un surnom plutôt que le vrai nom. Sur un PC partagé, chaque élève choisit son profil.
- **Code de classe** : donne aux élèves le code de 6 caractères de l'espace professeur, ou fais-leur scanner le QR code projeté. Ils le tapent dans « Code de classe » sur l'écran d'accueil. Tes réglages s'appliquent : thèmes, types de questions, chrono, part d'écrit, partie courte.
- **Défi de classe** : avec une **graine** (ex. `CARTA-12`), toute la classe joue la même carte.
- **Fin de partie** : l'élève obtient un **code** (ex. `HC8BA-351GA-HMQ00-W9S0`) et son QR code, qui résument son résultat et les notions à revoir. Il te le montre ou le recopie, et tu le lis dans l'espace professeur.
- **Une question réussie ne revient pas dans la même partie.** Le jeu pose d'abord des questions neuves, d'un autre niveau si besoin, et ne reprend une question déjà réussie qu'en dernier recours. En « Tout mélangé » et dans les gros domaines (passé simple, verbes réguliers, verbes irréguliers), il n'y en a jamais. Dans les deux plus petits domaines (¿Ser o ir ?, 29 questions ; l'histoire, 27), une partie complète pose plus de questions qu'il n'y en a : des répétitions apparaissent vers la fin. La partie courte n'en a presque plus.
- **Les erreurs reviennent (« palabras pendientes »)** : une question ratée revient plus tard dans la même partie, puis **au début de la partie suivante** dans un court échauffement sans chrono, jusqu'à ce qu'elle soit réussie. Le compteur 💭 en haut de l'écran indique combien attendent. L'écran **« Mon carnet »** montre à chaque élève ses notions fragiles.
- **Chrono** : il est **désactivé par défaut**. On peut l'activer (options ⚙️ ou espace professeur) et le couper à tout moment.
- **Sans connexion** : une fois le jeu ouvert avec Internet, il fonctionne hors ligne. Il peut s'installer comme une application (icône ⊕ dans la barre d'adresse de Chrome ou Edge ; « Sur l'écran d'accueil » sur iPad).
- **Au vidéoprojecteur** : bouton ⚙️ en haut à droite → **Taille du texte → Vidéoprojecteur**.

### Une séance type (15 à 20 minutes)

1. **Avant le cours** : dans l'espace professeur, choisis les thèmes à réviser (ex. seulement « verbes irréguliers » et « ¿ser o ir? »), coche **Imposer la partie courte**, choisis l'**acte** : l'acte 1 pose surtout des questions de niveau 1 (le plus facile), l'acte 2 de niveau 2, l'acte 3 de niveau 3 avec plus de réponses écrites ; chaque acte a ses ombres et son jefe. Le thème des questions, lui, ne dépend pas de l'acte : tu le règles avec les cases « Thèmes ». Note le **code de classe** ou projette le **QR code**.
2. **Au début** : les élèves ouvrent le jeu, tapent le code de classe (une seule fois par appareil) et lancent la partie courte. Aucun chrono, aucun compte.
3. **Pendant** : l'élève joue seul, en silence. Les corrections expliquées s'affichent à chaque erreur, avec le document d'où vient la question.
4. **À la fin** (8 à 10 minutes) : chaque élève te montre ou t'envoie son **code de fin de partie**. Colle-les dans l'onglet « Codes élèves » : tu vois le résultat de chacun et **les notions les plus ratées de la classe** pour la séance suivante.
5. **Les erreurs reviennent toutes seules** : au début de la prochaine partie, chaque élève retrouve les questions qu'il a ratées.

---

## 3. L'espace professeur

Pour y accéder : en bas de l'écran d'accueil, clique sur **« Espace professeur »**, ou ajoute `#prof` à la fin de l'adresse du jeu.

**Code d'accès par défaut : `profe2026`.** Change-le dès la première fois (onglet « Réglages de classe »). Ce n'est pas une vraie protection : il évite seulement qu'un élève modifie la banque par erreur.

| Onglet | Ce qu'on y fait |
|---|---|
| **Réglages de classe** | Thèmes (verbes réguliers, irréguliers, ser/ir, histoire, lexique ; sans réglage, l'élève choisit son domaine au menu), types de questions, **partie courte imposée et acte joué** (au hasard, ou acte 1, 2 ou 3), chrono (désactivé par défaut), **part de réponses écrites**, accents. Le jeu donne un **code de classe**, un lien et un **QR code**. |
| **Questions** | Rechercher, filtrer, activer ou désactiver une question d'un clic, la modifier ou en créer une. |
| **Import / export** | Exporter la banque en CSV (Excel, LibreOffice) ou en JSON, la réimporter. |
| **Codes élèves** | Coller les codes de fin de partie (un par ligne, un prénom devant si tu veux). Le jeu affiche le résultat de chacun (victoire, acte, partie courte, durée, date) et les notions les plus ratées de la classe. Un code mal recopié est signalé sans bloquer les autres. |
| **Séquence** | Exporter ou importer une séquence complète. |

⚠️ Les modifications faites dans l'espace professeur restent **sur l'appareil où tu les fais**. Pour que tous les élèves en profitent, envoie-les sur GitHub (partie 4, méthode 1).

---

## 4. Modifier ou ajouter des questions

Les questions sont dans `content/sequences/guerra-civil/questions/`, un fichier par thème ou par type : `regulares.json`, `irregulares.json`, `ser-ir.json`, `historia.json`, `lexico.json`, `vrai-faux.json`, `ordre.json`, `escenas.json` (frise), `association.json`, `jefe.json`, et, depuis l'étape 9, les fichiers `irregulares-extra.json` (ser, ir, tener, estar, hacer), `ser-ir-extra.json`, `historia-extra.json` et `lexico-extra.json` (questions supplémentaires, identifiants commençant par `nv-`).

### Méthode 1 : avec l'espace professeur (conseillée)

1. Dans l'espace professeur, onglet **Questions**, crée ou modifie tes questions. L'éditeur t'empêche de faire une erreur.
2. Onglet **Import / export** → **« Mes ajouts et modifications »** : tu obtiens le fichier `professeur.json`.
3. Sur github.com, ouvre le dossier `content/sequences/guerra-civil/questions/` de ton dépôt.
4. **Add file → Upload files**, glisse `professeur.json`, puis **Commit changes**.
5. Deux minutes plus tard, le jeu en ligne est à jour. L'onglet **Actions** indique ✓ ou ✗.

Les questions de `professeur.json` **remplacent** celles qui ont le même identifiant (`id`).

### Méthode 2 : dans un tableur

Exporte la banque en **CSV**, modifie-la dans Excel ou LibreOffice (une ligne = une question), puis réimporte-la dans l'espace professeur. Termine par la méthode 1. Dans les cellules, les listes (mauvaises réponses, réponses acceptées) sont séparées par `|`.

### Méthode 3 : directement sur GitHub

Ouvre un fichier `.json` sur github.com, clique sur le crayon ✏️, modifie, puis **Commit changes**. En cas d'erreur (virgule, guillemet), la pastille d'Actions devient rouge et **le site en ligne garde l'ancienne version**.

### Les champs d'une question

| Champ | Rôle | Exemple |
|---|---|---|
| `id` | identifiant unique (minuscules, chiffres, tirets) | `hist-jefe` |
| `type` | `qcm`, `ecrit`, `ecoute`, `vrai-faux`, `ordre`, `association`, `scene` | `qcm` |
| `theme` | `regulares`, `irregulares`, `ser-ir`, `historia`, `lexico` | `historia` |
| `level` | `1`, `2`, `3` ou `"jefe"` | `1` |
| `notions` | notions travaillées (liste dans `sequence.json`) | `["hist-bandos"]` |
| `prompt` | énoncé ; `___` pour un trou | `¿Quién fue el jefe de los militares sublevados?` |
| `answer` | bonne réponse | `Franco` |
| `accept` | autres réponses acceptées | `["Francisco Franco"]` |
| `distractors` | mauvaises réponses du QCM (au moins 3) | `["Carmen", "Bielsa", "Huesca"]` |
| `writable` | peut aussi être posée à l'écrit | `true` |
| `translation` | traduction (aide « Pregúntale a la abuela ») | `Qui fut le chef… ?` |
| `explanation` | correction expliquée, en français | `Franco fue el jefe…` |
| `source` | document d'origine (liste dans `sequence.json`) | `evaluacion` |
| `say` | (écoute) la phrase lue à voix haute | `Mi padre volvió a casa en 1939.` |
| `disabled` | `true` pour retirer la question sans l'effacer | `true` |

**Correction tolérante** : majuscules, ponctuation et espaces ne comptent pas ; le pronom sujet est facultatif (*él luchó* = *luchó*) ; les articles sont facultatifs en lexique et en histoire. La règle des accents est décrite dans la partie 1.

**Vérifier la banque** : `npm run valider` (partie 9) contrôle tout : champs manquants, doublons, bonne réponse parmi les mauvaises, références inconnues. GitHub la lance automatiquement à chaque envoi.

Tout ce qui ne vient pas directement de tes documents est listé dans [`docs/A_VERIFIER.md`](docs/A_VERIFIER.md).

---

## 5. Ajouter un nouveau document de la séquence

Quand tu avances dans la séquence, envoie-moi le nouveau document. Je :

1. transcris son texte dans [`sources/contenu-sequence.md`](sources/contenu-sequence.md) (les PDF ne sont **jamais** publiés : le fichier `.gitignore` les exclut) ;
2. ajoute ses questions (avec leur `source`) ;
3. ajoute si possible une ombre, un souvenir, un événement, voire un nouvel acte ;
4. liste dans `docs/A_VERIFIER.md` tout ce que le document n'écrit pas.

Tu peux aussi le faire toi-même : ajoute le document dans la liste `sources` de `content/sequences/guerra-civil/sequence.json`, puis tes questions.

Tout ce qui est propre à la séquence est rangé dans `content/sequences/guerra-civil/` :

| Fichier | Contenu |
|---|---|
| `sequence.json` | titre, textes, thèmes, notions, sources, actes (avec leur mot mystère `mystery`), carte, personnages, noms des salles, épilogue, **domaines** proposés au menu (`domains` : un nom, une icône, une description et la liste des thèmes) |
| `questions/*.json` | les questions |
| `enemies.json` | les ombres, leurs attaques et les questions qu'elles posent (`types`) |
| `items.json`, `synergies.json` | aides, souvenirs et ensembles (un souvenir avec `year` et `clue` est « daté » : à ranger sur la frise) |
| `events.json` | les lettres et scènes en espagnol |
| `scenes.json` | la frise chronologique, la carte de l'Espagne et leurs objets |

---

## 6. Mettre le jeu en ligne

Le jeu se publie gratuitement avec **GitHub Pages**. Chaque modification envoyée sur la branche `main` est vérifiée (banque de questions + tests), puis mise en ligne. **Si une vérification échoue, le site en ligne n'est pas modifié.**

1. Sur <https://github.com/new>, crée un dépôt **public** et **vide** (sans README), par exemple `nunca-olvide`.
2. Donne-moi son nom : j'y envoie le jeu.
3. Sur la page du dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
4. Onglet **Actions** : la tâche « Mettre le jeu en ligne » tourne 2 ou 3 minutes. Pastille verte ✓ : le jeu est en ligne à `https://ton-pseudo.github.io/nunca-olvide/`.

Le jeu et *El Camino de Cempasúchil* peuvent être en ligne à la même adresse `github.io` : leurs sauvegardes sont séparées.

---

## 7. Confidentialité et RGPD

- **Aucune donnée personnelle n'est collectée.** Ni compte, ni serveur, ni statistiques, ni cookies publicitaires.
- **Aucun appel réseau vers un service tiers.** Les polices, les sons, la musique et les QR codes sont produits sur l'appareil.
- La progression (profil, álbum, carnet) est enregistrée **uniquement dans le navigateur** de l'appareil. Un bouton permet de supprimer un profil.
- Si le navigateur bloque le stockage (navigation privée…), le jeu fonctionne quand même et prévient que la progression ne sera pas gardée.
- Le **code de fin de partie** ne contient que le résultat, la date et les notions ratées : ni pseudo, ni identifiant.
- Il n'y a **plus de question d'écoute** dans la banque. Si tu en crées une (type `ecoute`), elle utilise la voix espagnole installée sur l'appareil (sans envoi de données) ; sans voix, la phrase s'affiche 5 secondes.

---

## 8. Accessibilité

Le bouton ⚙️ en haut à droite propose :

- **Taille du texte** : normal, grand, vidéoprojecteur ;
- **Police adaptée à la dyslexie** (OpenDyslexic) ;
- **Réduire les animations**, appliqué automatiquement si l'appareil le demande ;
- **Poussière de papier** (décor) : l'afficher ou non ;
- **Effets sonores**, volume, et **musique** (mélodie originale, coupée par défaut) ;
- **Chrono** : désactivé par défaut.

On joue entièrement **au clavier** : **Tab** pour passer d'un élément à l'autre, **Entrée** pour valider, touches **1 à 4** pour les QCM, **V / F** pour le vrai/faux, **flèches** pour les phrases à remettre dans l'ordre ; **Entrée** continue après une correction (le focus y est déjà) ; les plateaux (association, frise, carte) se jouent à **Tab** et **Entrée**.

Aucune information n'est donnée seulement par la couleur : chaque thème a un nom, chaque attaque a une icône et une phrase, chaque réponse corrigée porte un symbole **✓** (juste) ou **✗** (fausse) et la bonne réponse est écrite en toutes lettres (« Bonne réponse : … »).

---

## 9. Pour aller plus loin

Il faut [Node.js](https://nodejs.org) (version 20 ou plus). Dans un terminal, depuis le dossier du jeu :

```bash
npm install
```

```bash
npm run dev
```

Puis ouvre l'adresse affichée (en général <http://localhost:5173>).

| Commande | Rôle |
|---|---|
| `npm run dev` | lance le jeu sur ton ordinateur |
| `npm run valider` | vérifie toute la banque de questions |
| `npm test` | tests automatiques : correction des réponses, accents, réponses acceptées, combat, partie courte, équilibrage… |
| `npm run test:e2e` | un robot joue des parties entières dans un vrai navigateur (PC et téléphone), teste l'espace professeur, le code de classe, le hors-ligne et l'affichage sans défilement |
| `npm run equilibrage` | simule des centaines de parties : taux de victoire et durée selon le niveau des élèves |
| `npm run build` | construit le site dans le dossier `dist/` |

**Résultats de la simulation**, partie complète : un élève qui répond juste à 90 % gagne 96 fois sur 100 en 16 minutes ; à 75 %, 76 fois sur 100 en 19 minutes ; à 60 %, environ 1 fois sur 3 ; au hasard, moins de 2 fois sur 100. Partie courte : 8 à 10 minutes en moyenne.

---

## 10. Licences et crédits

- **Moteur** : repris du jeu *El Camino de Cempasúchil* (même auteur).
- **Contenu** : tiré des documents de la séquence du professeur (fiche de grammaire, Misión secreta, évaluation). La bande dessinée *Mi tío que estuvo en el infierno* et son questionnaire ne sont plus utilisés dans les questions.
- **Polices** : Special Elite (Apache 2.0), Atkinson Hyperlegible, Pixelify Sans, Press Start 2P et OpenDyslexic (SIL OFL), intégrées au jeu.
- **Bibliothèques** : Preact (MIT), zod (MIT), qrcode-generator (MIT), Workbox (MIT).
- **Visuels** : originaux (pixel art, CSS, SVG) ou emoji du système. Aucun personnage, logo ou symbole politique existant.
- **Sons et musique** : générés par le navigateur (Web Audio) ; mélodie originale composée pour le jeu.
