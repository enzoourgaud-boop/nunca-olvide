# El Camino de Cempasúchil — document de conception

> Version 0.1, à valider avant de coder. Les points marqués **[?]** dépendent de tes réponses.

## 1. Choix technique : DOM + CSS (avec Preact), pas Phaser

**Je recommande de ne pas utiliser Phaser.** Le cœur du jeu, c'est du texte à lire, à écrire et à manipuler. Or Phaser dessine tout dans un `<canvas>`, ce qui pose quatre problèmes :

| Besoin | DOM + CSS | Phaser (canvas) |
|---|---|---|
| Lecteur d'écran, navigation clavier, focus visible | natif | à refaire à la main |
| Police dyslexie, zoom du navigateur, vidéoprojecteur | natif (CSS) | texte pixelisé, à recalculer |
| Champ de saisie avec accents, correcteur désactivé | `<input>` natif | superposition HTML de toute façon |
| Glisser-déposer tactile et souris | Pointer Events | possible |
| Poids téléchargé | ~15 Ko (Preact) | ~1 Mo |

Les effets voulus (cartes qui se retournent, coups, pétales, transitions entre salles) se font très bien en CSS et avec la Web Animations API. Les pétales passent par un petit `<canvas>` décoratif, coupé si `prefers-reduced-motion` est actif.

**Preact** (4 Ko, même syntaxe que React) donne des composants propres sans alourdir le projet. Le **moteur** est écrit en TypeScript pur, sans DOM : il est testable, déterministe (graine) et réutilisable pour une autre séquence.

Autres choix :
- **PWA** : `vite-plugin-pwa`. Le service worker est généré au build, sans aucun service tiers.
- **Polices auto-hébergées** : `@fontsource` pour Sancreek, Atkinson Hyperlegible et OpenDyslexic. Le prototype appelle Google Fonts : c'est un appel réseau tiers, je le supprime.
- **QR code** généré localement (bibliothèque MIT intégrée au build).
- **Routage par `#`** et chemins relatifs : ça marche tel quel sur GitHub Pages, sur Netlify et en ouvrant le dossier `dist/`.

## 2. Boucle de jeu (cible : 15 à 20 minutes)

```
Accueil → choix du personnage (+ niveau d'Ascension)
  └─ Acte I · El Mercado → Acte II · El Panteón → Acte III · El Mictlán
       Chaque acte = carte de 6 étages à embranchements :
       étage 1 : combat · étages 2 à 4 : mélange · étage 5 : Ofrenda · étage 6 : JEFE
  └─ Fin : bilan, carnet d'erreurs, code/QR pour le prof, cartes de lotería gagnées
```

- **Une partie ≈ 11 à 13 combats.** Un combat normal dure 3 à 5 questions, un élite 5 à 7, un jefe 7 à 10, la Catrina 12 à 15. Avec 15 s de réponse en moyenne, plus les salles hors combat, on arrive à 16-18 minutes. Un test d'équilibrage le vérifie par simulation, avec un bot qui répond juste à 60 %, 75 % et 90 %.
- **Carte** : graphe généré à partir de la graine, 3 ou 4 chemins par étage, une seule « tranche » visible à la fois sur téléphone. Le chemin parcouru se couvre de pétales.
- **Graine** : chaque partie a un code lisible (ex. `CALAVERA-42`). Le prof peut imposer la même graine à toute la classe (« défi du jour ») : tout le monde a la même carte et les mêmes ennemis.

### Types de salles

| Salle | Effet |
|---|---|
| ⚔️ Combat | Ennemi de l'acte, puis récompense : 1 pouvoir parmi 3 et des monedas. |
| 💀 Élite | Ennemi renforcé + **modificateur** (voir §3). Récompense : relique garantie. |
| 🛒 Tianguis | Boutique : aides, reliques, Tamales (soin), « retirer une faiblesse ». |
| 🕯️ Ofrenda | Repos : **se soigner** (30 % des PV) **ou améliorer** un pouvoir (ex. Tijeras+ retire 3 mauvaises réponses). |
| ❓ Evento | Petite scène en espagnol simple (A1) avec 2 ou 3 choix, souvent avec une mini-question. Glossaire français au survol ou au toucher. |
| 🎁 Cofre | Relique ou aides. Parfois un *cofre con candado* : on l'ouvre en répondant à une question. |

### Exemples d'événements (10 à 12 prévus)
- *Una abuela está preparando tamales.* → l'aider (question de vocabulaire → soin), ou continuer.
- *Un músico está tocando la trompeta. ¿Bailas?* → danser (question estar + gérondif → monedas).
- *Ves un altar sin velas.* → poser une vela (elle coûte une aide, mais donne la relique « Ofrenda completa » en cours).
- *Un alebrije te ofrece un trato.* → perdre 3 PV contre une relique rare.
- *La lotería del pueblo* → tirer une carte au hasard (bonus ou malus).

## 3. Combats

Le principe du prototype reste : **bonne réponse = dégâts à l'ennemi, erreur = dégâts à toi**, avec le bonus des réponses écrites, les séries et le « ¡Casi! » pour un accent oublié.

**Nouveau : l'intention.** Au-dessus de la carte de l'ennemi, une icône annonce ce qu'il fera à ta prochaine **erreur**, ou à la fin du tour pour les effets passifs :

| Icône | Intention |
|---|---|
| 🗡️ 3 | Attaque de 3 |
| 🛡️ 2 | Bouclier : les 2 prochains dégâts sont absorbés |
| 🪙 −2 | Vol de monedas |
| ⏱️ −5 | Chrono raccourci à la prochaine question |
| 💚 +2 | Se soigne |
| 🌫️ | Brouillard : pouvoirs bloqués une question |
| ☠️ | Poison : 1 PV perdu par question pendant 3 questions |

### Bestiaire (cartes de lotería numérotées, visuels emoji + SVG)

| Acte | Ennemi | Comportements |
|---|---|---|
| I · Mercado | La Vela Traviesa 🕯️ | Attaque · « Mecha corta » (chrono −5 s) |
| | La Calaverita 💀 | Attaque · Bouclier de azúcar |
| | El Pan de Muerto 🍞 | Attaque · Se hornea (soin) |
| | El Papel Picado 🎏 *(nouveau)* | Vol de monedas · Attaque faible |
| | **Élite** La Piñata Furiosa 🪅 | Modificateur **« Solo escrito »** : que des réponses à écrire |
| | **Jefe** El Alebrije 🐉 | Cycle : Attaque → **Cambio de color** (le thème qui lui fait mal change à chaque tour, affiché) → Gran ataque annoncé |
| II · Panteón | El Xoloitzcuintle 🐕 | Morsure · « Olfatea » (vole une aide) |
| | La Lechuza 🦉 | Attaque · « Canto » (la question suivante est **à l'oral**) |
| | El Esqueleto Músico 🎺 | « Crescendo » : son attaque monte de 1 à chaque tour tant que tu n'as pas fait 2 bonnes réponses d'affilée |
| | La Cruz de Cempasúchil 🌼 *(nouveau)* | Bouclier · Soin |
| | **Élite** El Mariachi de Huesos 🎻 | Modificateur **« Prisa »** : chrono divisé par 2 |
| | **Jefe** Mictlantecuhtli 💀👑 | Tous les 3 tours, un **« Juicio »** : question de culture ; en cas d'erreur, attaque double |
| III · Mictlán | El Alma Errante 👻 | « Desaparece » : la 1re bonne réponse ne la touche pas |
| | La Mariposa Negra 🦋 | Vol de monedas · Attaque |
| | La Serpiente 🐍 | Poison · Attaque |
| | **Élite** El Jaguar de Obsidiana 🐆 | Modificateur **« Niebla »** : ni Traductor ni Chuleta |
| | **Jefa final** La Catrina 💀👒 | 3 phases, ci-dessous |

### La Catrina, 3 phases (barre de vie segmentée)
1. **La Elegante** : questions sur la Catrina et la culture. Son *abanico* (bouclier) ne casse **qu'avec des réponses écrites**.
2. **El Retrato** : elle « pose » dans une scène. Questions de **description d'image** (placer les éléments, ser/estar/hay, en primer plano…). Chaque erreur lui rend 1 PV.
3. **El Último Baile** : chrono fixe et serré, traductions écrites de niveau jefe, attaque +1. Une série de 3 la fait tituber (dégâts doublés).

## 4. Types de questions

| Type | Interaction | Exemple |
|---|---|---|
| `qcm` | 4 choix, touches 1 à 4 | *La Catrina ___ un esqueleto.* |
| `write` | saisie + clavier d'accents | *Donne le gérondif de « leer ».* |
| `order` | glisser-déposer des étiquettes (ou flèches au clavier) | *están / decorando / los niños / el altar* |
| `match` | associer 4 mots et 4 images (emoji/SVG) | *la vela ↔ 🕯️* |
| `scene` | placer les objets sur une ofrenda en 3×3 zones, d'après une consigne en espagnol | *La vela está a la izquierda, en primer plano.* |
| `scene-read` | regarder une scène et choisir/écrire la bonne phrase | *¿Dónde está la calavera?* |
| `listen` | la synthèse vocale lit une phrase ; on choisit ou écrit ce qu'on a entendu | *(audio)* « Estamos bailando » |
| `truefalse` | vrai/faux culturel, avec la correction expliquée | *La Catrina fue creada por Frida Kahlo.* → Falso |

**Repli pour l'oral** : sans voix `es-MX`/`es-ES`/`es-*` disponible, le jeu le signale une seule fois et transforme les questions `listen` en lecture (le texte s'affiche brièvement puis disparaît). Elles ne sont donc pas perdues.

## 5. Pouvoirs

**Aides** (usage unique) du prototype : Traductor, Chuleta, Tijeras, Oráculo, Cambio, Reloj de arena, Chocolate, Escudo. **Nouvelles** : Eco 🔊 (réécouter au ralenti), Tamal 🫔 (soin 3 + bouclier 1), Papel de seda 🎏 (annule la prochaine intention ennemie).

**Reliques** (permanentes) du prototype : Vela, Pluma, Maracas, Corazón, Piñata, Cempasúchil, Tilde amable.

**Raretés** : común (gris), rara (turquoise), legendaria (orange, animée). Les **nouvelles reliques qui changent les règles** :
- **Pluma de colibrí** (rara) : toutes les questions deviennent écrites, et leurs dégâts sont doublés.
- **Reloj de sol** (rara) : +10 s au chrono, mais les ennemis attaquent +1.
- **Máscara de luchador** (rara) : la 1re erreur de chaque combat ne fait pas de dégâts.
- **Diccionario de bolsillo** (común) : un Traductor gratuit par combat.
- **Mapa de pétalos** (común) : révèle le contenu des salles ❓ sur la carte.
- **Xolo guía** (legendaria) : à 0 PV, tu reviens une fois avec la moitié de ta vie.
- **Lotería** (legendaria) : toutes les 4 bonnes réponses, une aide gratuite au hasard.

**Synergies (ensembles thématiques, liés au cours)** :
- **Ofrenda completa** = Vela + Cempasúchil + Pan de muerto (relique) : +1 PV à chaque bonne réponse. Elle s'affiche comme une mini-ofrenda qui se remplit.
- **Mariachi** = Maracas + Trompeta (relique) : le bonus de série passe à ×2.
- **Papel y tinta** = Pluma + Diccionario : le « ¡Casi! » compte comme une bonne réponse.

## 6. Progression entre les parties

- **3 personnages** :
  - *Valentina, la ofrendera* (dès le départ) : +1 Chocolate, l'Ofrenda soigne davantage.
  - *Mateo, el trompetista* (débloqué en battant l'Alebrije) : commence avec Maracas, séries plus faciles.
  - *Luz, la poeta de calaveritas* (débloquée par une victoire) : commence avec la Pluma, plus de questions écrites.
  - Aucun ne reprend un personnage de *Coco*.
- **Collection de lotería** : 54 cartes (ennemis, jefes, reliques, éléments de l'ofrenda). On en gagne une en battant un ennemi ou en trouvant un objet pour la première fois. Chaque carte porte une phrase d'exemple en espagnol.
- **Succès** : une quinzaine, par exemple « Sin errores » (combat parfait), « Políglota » (20 réponses écrites), « Ofrenda completa », « Catrina vencida », « Ascensión 5 ».
- **Ascension** (« Nivel de Calavera » 0 à 10) : chaque victoire débloque le niveau suivant. Chaque niveau ajoute un malus cumulatif : +1 PV aux ennemis, chrono −2 s, moins de monedas, un élite de plus, une 4e phase pour la Catrina…

## 7. Révision intelligente (Leitner)

Chaque question a une **boîte de 1 à 5**, enregistrée sur l'appareil. Une erreur la renvoie en boîte 1, une bonne réponse la fait monter d'une boîte. Au tirage, le poids d'une question vaut `6 − boîte` : une question souvent ratée revient environ 5 fois plus que si elle est maîtrisée. Les questions jamais vues sont prioritaires en début de partie.
- La « revanche » du prototype (re-poser une question ratée dans la même partie) est conservée.
- Le **carnet d'erreurs** de fin de partie est conservé, avec la règle en français. Un nouvel écran « Mon carnet » liste les notions les plus fragiles d'une partie à l'autre.

## 8. Structure des données (moteur indépendant de la séquence)

```
content/
  sequences/dia-de-muertos/
    sequence.json     titre, thèmes (id, libellé, couleur), actes, sources, réglages par défaut
    questions/*.json  une liste par thème
    enemies.json      ennemis, comportements, cartes de lotería
    items.json        aides et reliques
    events.json       événements narratifs
    scenes.json       décors et objets pour les questions « scene »
```

Les noms d'actes, d'ennemis et les textes d'ambiance viennent de `sequence.json` et d'`enemies.json`. **Le moteur ne contient aucun mot du Día de Muertos.** Une autre séquence (ex. « la Navidad ») = un autre dossier.

### Une question (validée par un schéma zod)
```jsonc
{
  "id": "conj-ger-012",
  "type": "write",            // qcm | write | order | match | scene | listen | truefalse
  "theme": "conjugacion",     // vocabulario | conjugacion | gramatica | cultura
  "notions": ["gerundio-irregular"],  // pour le carnet et le code prof
  "level": 3,                 // 1, 2, 3 ou "jefe"
  "prompt": "Mi hermano está ___ un cuento de miedo. (leer)",
  "answer": "leyendo",
  "accept": [],               // autres réponses acceptées
  "distractors": ["leiendo", "leído", "lee"],
  "translation": "Mon frère est en train de lire une histoire qui fait peur.",
  "explanation": "Radical terminé par une voyelle : + -YENDO.",
  "source": "fiche-estar-gerondif",
  "check": { "ignoreArticles": false, "optionalSubject": true }  // facultatif
}
```
Les types `order`, `match` et `scene` ajoutent leurs propres champs (`tokens`, `pairs`, `scene` + `placements`).

Les questions que le prototype **générait** (vocabulaire, conjugaison d'estar, gérondifs) deviennent des questions **explicites** dans le JSON. Le prof peut ainsi toutes les voir, les modifier ou les désactiver.

### Correction tolérante (paramétrable)
Pipeline : minuscules → ponctuation et `¿¡` retirées → espaces normalisés → articles facultatifs en vocabulaire → pronom sujet facultatif (`yo`, `tú`, `nosotros`…) → comparaison.
- Si seul un accent ou un ñ diffère : **« ¡Casi! »** (pas de dégâts, pas de point). En option prof : « accepter » ou « compter faux ».
- Les réponses à plusieurs trous (`es / está`) acceptent aussi l'écriture sans barre (`es está`).

## 9. Sauvegarde et vie privée
- Un module `storage` enveloppe `localStorage` dans des `try/catch`. Si le stockage est bloqué (navigation privée, ENT verrouillé), le jeu fonctionne en mémoire et affiche un bandeau discret : « Ta progression ne sera pas gardée sur cet appareil ».
- Les données sont versionnées (migrations), avec un bouton « Tout effacer ».
- **Aucun appel réseau** après le chargement, aucune donnée personnelle. Le code de fin contient seulement : score, % de réussite, acte atteint, notions ratées, graine et somme de contrôle. **[?] profils locaux**

## 10. Espace professeur (`#/prof`, code simple)
- Thèmes et types de questions à activer ou désactiver ; niveaux.
- Chrono : on/off, durée de base ; part de réponses écrites ; tolérance aux accents.
- Banque de questions : tableau filtrable, formulaire d'édition avec validation en direct, import et export JSON et **CSV** (séparateur `;`, UTF-8 avec BOM pour Excel et LibreOffice).
- **Décodeur** des codes élèves : on colle le code, le détail s'affiche.
- Graine imposée pour la classe.
- **[?] Diffusion des réglages** : voir les questions.

## 11. Qualité
- **Vitest** : correction des réponses, générateur aléatoire à graine (même graine = même partie), génération de la carte (toujours un chemin jusqu'au jefe), simulation d'équilibrage (durée et taux de victoire par profil de joueur), encodage et décodage du code de fin, migrations de sauvegarde.
- **Playwright** : un bot joue une partie entière avec une graine fixe, sur un écran de bureau et sur un téléphone.
- **`npm run valider`** : schéma, identifiants uniques, pas de doublon d'énoncé, réponse absente des distracteurs, distracteurs uniques, champs complets, sources connues, nombre de questions par thème et par niveau.

## 12. Étapes (chacune se lance avec `npm run dev`, puis commit)

| # | Étape | Ce que tu pourras tester |
|---|---|---|
| 1 | Socle Vite/TS/Preact, moteur de combat à graine, intentions des ennemis, banque migrée et enrichie (≥ 200 q, QCM + écrit), validateur, tests de correction | Enchaîner des combats avec intentions ; `npm run valider`, `npm test` |
| 2 | Cartes à embranchements, 6 types de salles, événements, élites, jefes, Catrina en 3 phases, raretés et synergies | Une partie complète de 3 actes |
| 3 | Types `order`, `match`, `scene`, `listen` (+ repli), `truefalse` | Chaque type, au doigt, à la souris et au clavier |
| 4 | Personnages, lotería, succès, Ascension, Leitner, écran « Mon carnet », code/QR de fin | Plusieurs parties d'affilée |
| 5 | Espace professeur complet, import/export JSON/CSV, décodeur | Modifier une question et la voir en jeu |
| 6 | Sons Web Audio, pétales et transitions, police dyslexie, mode vidéoprojecteur, PWA hors ligne, test Playwright de bout en bout, README, déploiement GitHub Pages (workflow automatique) | Installer le jeu sur une tablette et jouer en mode avion |

## 13. Décisions validées (réponses du professeur)

Toutes les options par défaut ont été retenues :
1. Les documents sources sont dans `sources/`. Leur transcription (`sources/contenu-sequence.md`) sert de référence.
2. Les commits sont faits localement ; la procédure de création du dépôt GitHub sera donnée à l'étape 6.
3. Profils locaux (avatar emoji + pseudo libre), gardés sur l'appareil uniquement (étape 4).
4. La question sur le film *Coco* est gardée en texte seul et signalée dans `A_VERIFIER.md`. Aucune image du film.
5. Les réglages de classe passent par un **lien de classe** (URL + QR code) ; les nouvelles questions passent par le dépôt ou un import de fichier (étape 5).
6. vosotros est conservé ; voix es-MX en priorité, puis es-US, es-ES, es.
7. Code de l'espace professeur : `profe2026` (modifiable).
8. Personnages : Valentina (ofrendera), Mateo (trompettiste), Luz (poète de calaveritas, à vérifier).

### Ajustements faits pendant l'étape 1
- Équilibrage : 15 PV au départ, attaques de 1 à l'acte I, ennemis un peu plus résistants (voir `npm run equilibrage`).
- « El Papel Picado » est dessiné en SVG : l'emoji 🎏 représente une manche à air japonaise.
- Les icônes dessinées s'écrivent `"emoji": "svg:papel-picado"` dans `enemies.json`.

### Ajustements faits pendant l'étape 2
- Plus de boutique automatique après le jefe : on y gagne une **relique au choix** (rare ou légendaire de préférence) et 25 % de PV. Le Tianguis est une salle de la carte, avec au moins un par acte.
- Carte de 6 étages : combat → 3 étages variés → Ofrenda → jefe ; 3 ou 4 salles par étage.
- Les noms des salles, leurs textes et le repas du Tianguis sont dans `sequence.json` (`rooms`, `meal`).
- Coffres : 40 % sont fermés par une question ; une bonne réponse donne une relique rare ou légendaire.
- Équilibrage (300 parties par profil) : 90 % → 99 % de victoires en 17 min ; 75 % → 59 % en 20 min ; 60 % → atteint l'acte 2 en moyenne.

### Ajustements faits pendant l'étape 3
- 7 types de questions : `qcm`, `ecrit`, `ecoute`, `vrai-faux`, `ordre`, `association`, `scene`, plus des QCM « lire une scène » (`qcm` + `scene`).
- Les réponses à manipuler (ordre, association, scène) comptent comme un effort de production : dégâts renforcés, comme l'écrit.
- La Lechuza a une intention « Canto » : la question suivante est à l'oral.
- Tijeras donne un indice sur les types sans QCM (début de phrase, une paire, la place d'un objet).
- Les types peu nombreux dans la banque sortent un peu plus souvent (pondération), pour varier les parties.
- Sans voix espagnole, la phrase s'affiche 5 secondes, une seconde fois sur demande.

### Ajustements faits pendant l'étape 4
- Profils locaux (avatar + pseudo) ; les sauvegardes des étapes précédentes sont reprises dans un premier profil.
- Collection : 42 cartes (17 ennemis + 25 objets), chacune avec une phrase d'exemple en espagnol.
- 19 succès, 10 niveaux de Calavera (règles cumulatives listées sur l'écran d'accueil).
- Leitner : boîtes 1 à 5 ; poids de tirage 6 (boîte 1) à 1 (boîte 5), 4 pour une question jamais vue.
- Code de fin : 19 caractères (alphabet de Crockford, somme de contrôle), QR généré sur l'appareil.

### Ajustements faits pendant l'étape 5
- Le « lien de classe » est un code de 6 caractères (thèmes, types, chrono, part d'écrit, accents + somme de contrôle), utilisable en lien `#classe-XXXXXX[-GRAINE]`, en QR code ou tapé à la main sur l'accueil.
- Les modifications du professeur sont une couche à part (`prof:overlay` dans le stockage local) : la banque d'origine n'est jamais écrasée, et un bouton permet toujours de revenir en arrière (même si le contenu devenait invalide).
- CSV : une ligne par question ; listes séparées par « | » ; colonne « avance » en JSON pour les types ordre / association / scène.
- Une séquence complète peut être exportée et importée (« pack ») : le moteur ne contient rien de propre au Día de Muertos.

### Ajustements faits pendant l'étape 6
- Sons générés en Web Audio (aucun fichier) : bonne réponse, coup critique, erreur, coups, soin, bouclier, phase, victoire, défaite, déblocage. Coupables et réglables.
- Options de confort (⚙️) : taille du texte (normal, grand, vidéoprojecteur), police OpenDyslexic, animations réduites (en plus du réglage système), pétales, chrono.
- Pétales de cempasúchil en arrière-plan (canvas) sur l'accueil, la carte et la victoire.
- PWA (vite-plugin-pwa, Workbox) : tout le jeu est mis en cache au premier chargement ; icônes originales.
- L'espace professeur est chargé à part (import dynamique).
- `questions/professeur.json` dans le dépôt remplace les questions d'origine de même identifiant.
- Tests de bout en bout (Playwright) : partie complète (ordinateur et téléphone), espace professeur + lien de classe, hors-ligne, clavier.
- Mise en ligne : GitHub Actions → GitHub Pages, avec validation de la banque et tests avant publication.
