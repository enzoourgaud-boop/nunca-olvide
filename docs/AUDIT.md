# Audit de la version 1

*Étape 0 de la version 2. Rédigé le 13/11/2026 sur la version en ligne (branche `main`, commit `21c4e36`). Aucune ligne du jeu n'a été modifiée pour cet audit.*

## En bref

La version 1 est **saine et jouable** : aucune erreur JavaScript en quatre parties complètes, 109 tests au vert, une banque de 454 questions valide, un contenu fidèle à tes documents. On peut construire dessus.

Mais c'est bien, comme tu le dis, **un quiz habillé en jeu**. Trois mesures le résument :

1. **Le joueur ne décide presque rien.** Dans une partie gagnée, il répond à une cinquantaine de questions et clique 48 fois sur « Continuer ». Ce que l'ennemi prépare (attaque, bouclier, vol…) ne change jamais ce qu'il a intérêt à faire : répondre juste. La forme de la question (QCM, écrit, phrase à remettre en ordre) est tirée au sort, pas choisie.
2. **Le jeu se joue hors champ.** Sur un PC de collège (1366 × 768), la zone de réponse est **sous le bas de l'écran pour 45 questions sur 48**. L'élève fait défiler pour répondre, et la scène de combat, avec toutes ses animations, sort de l'écran.
3. **La difficulté est à l'envers.** Un élève fragile (60 % de bonnes réponses) perd 93 fois sur 100, en 11 minutes. Un bon élève (90 %) gagne 98 fois sur 100 et bat la Catrina, le boss final en trois phases, en 4 à 7 questions.

À cela s'ajoutent trois bugs à corriger quel que soit le projet de version 2, dont un d'accessibilité (le chrono ne peut pas être coupé en cours de partie).

## Comment j'ai procédé

| Quoi | Détail |
|---|---|
| Lecture | Tout le code (`src/`, 7 700 lignes), tout le contenu (`content/`), les tests, la documentation. |
| Parties jouées dans un vrai navigateur (Playwright, Chromium) | **A** : élève moyen (80 % de réussite), PC 1366 × 768, victoire. **B** : bon élève (95 %), téléphone, victoire. **C** : défaite volontaire (0 %). **C2** : même profil, partie suivante (70 %), pour voir si les questions ratées reviennent. 98 captures d'écran, dont 11 dans `docs/audit/`. |
| Simulations | 300 parties par profil avec le moteur du jeu, pour 6 niveaux d'élève, chaque relique, chaque personnage, 6 Niveaux de Calavera. Le robot répond moins bien à l'écrit qu'en QCM (−15 points), comme un élève. |
| Bugs | Chaque bug suspecté à la lecture a été rejoué dans le navigateur ou dans le moteur. Le tableau indique lesquels sont reproduits. |

Deux limites à garder en tête :

- **Les durées sont estimées**, pas mesurées sur des élèves : 9 s pour un QCM, 16 s pour une réponse écrite, 20 s pour une scène à composer, 4 s pour lire le retour. Les parties jouées par le robot dans le navigateur durent 1 à 2 minutes : elles servent à compter et à regarder, pas à chronométrer. Dix minutes d'observation d'une vraie classe vaudraient mieux que ces estimations.
- **Je ne peux pas ouvrir le site en ligne** depuis mon environnement (`github.io` est bloqué). J'ai joué sur une copie construite à partir du même code que la version en ligne.

## 1. Ce qui fonctionne et doit être gardé

**Le contenu et la correction**

- La banque : 454 questions actives, toutes rattachées à un document source et à une notion. Elle est le capital du projet. Répartition : vocabulaire 139, grammaire 127, conjugaison 111, culture 77.
- La correction tolérante (majuscules, ponctuation, article ou pronom facultatif) et le « ¡Casi! » pour un accent oublié. Rien à redire, et les tests la couvrent bien.
- Les sept formes de question. Trois d'entre elles sont déjà des gestes de jeu plus que des questions : **remettre une phrase en ordre**, **associer mot et image**, **placer des objets sur la ofrenda** (`docs/audit/11-pc-ofrenda-a-placer.jpg`). C'est le meilleur de la version 1, et elles ne représentent que 15 % des questions posées.
- Le garde-fou contre les questions voisines qui s'enchaînent (ton retour de l'étape 4) : il tient. Sur une partie gagnée, 7 questions sur 50 environ sont des répétitions, espacées.

**L'habillage**

- La scène de combat façon console portable : sprites pixelisés, cadres de PV, boîte de dialogue qui s'écrit. C'est l'identité visuelle du jeu, et elle plaît.
- Les ennemis ont de la personnalité : une réplique en espagnol à l'entrée (« ¡Estoy saliendo del horno! »), un comportement à eux (le Papel Picado qui disparaît, le Mariachi dont la musique monte).
- Papel picado en SVG, pétales, polices, palette : cohérent, original, sans rien d'emprunté.

**L'outillage du professeur**

- Espace professeur, import et export CSV, code de classe, code de fin de partie avec QR : tout fonctionne et rien ne sort de l'appareil.
- Le carnet d'erreurs en fin de partie (`docs/audit/10-defaite-carnet-d-erreurs.jpg`) : question, réponse de l'élève, bonne réponse, règle. C'est l'écran le plus utile pédagogiquement.

**La technique**

- Moteur en TypeScript pur, sans interface, piloté par une graine : on peut simuler 300 parties en quelques secondes. C'est ce qui a rendu cet audit possible et ce qui permettra d'équilibrer la version 2.
- Contenu entièrement en JSON validé : la séquence est déjà séparée du moteur.
- Hors ligne, profils locaux, aucune donnée personnelle, accessibilité (dyslexie, tailles, clavier, animations réduites).

## 2. Bugs

Gravité : 🔴 à corriger avant toute autre chose · 🟠 gênant · 🟡 mineur.

| # | Gravité | Bug | Vérification |
|---|---|---|---|
| 1 | 🔴 | **Le chrono ne peut pas être coupé en cours de partie.** Décocher « Chrono » dans les Options n'a aucun effet avant la partie suivante : les réglages sont copiés au lancement et jamais mis à jour (`App.tsx`). Un élève qui panique devant le chrono ne peut pas s'en débarrasser. | Reproduit dans le navigateur : chrono décoché à la question 1, toujours présent aux questions 2 à 7. |
| 2 | 🔴 | **Le chrono tourne pendant que le panneau d'Options est ouvert.** Ouvrir les Options pour régler le son ou la taille du texte coûte du temps de réponse. | Reproduit : 42 s → 39 s en 3 secondes, Options ouvertes. |
| 3 | 🔴 | **On peut mourir en gagnant.** Si l'élève est empoisonné avec 1 PV et donne le coup de grâce, le poison le tue quand même et la partie est comptée perdue (`game.ts`, ligne 923 : le poison s'applique même si l'ennemi vient de tomber). | Reproduit dans le moteur : ennemi à 0 PV, joueur à 0 PV, écran « défaite ». |
| 4 | 🟠 | **La voix espagnole peut passer par Internet.** Le jeu prend la première voix espagnole trouvée, sans vérifier qu'elle est installée sur l'appareil. Dans Chrome sur PC, les voix « Google español » sont synthétisées sur les serveurs de Google : le texte lu y est envoyé, ce qui contredit la règle « aucun service externe », et hors ligne la question d'écoute reste muette. | Lu dans le code (`speech.ts`). Non testable ici (mon navigateur de test n'a aucune voix). À corriger par précaution : n'accepter que les voix locales, sinon basculer sur la lecture éclair. |
| 5 | 🟠 | **Les « revanches » sont rares et peuvent se perdre.** Une question ratée ne revient dans la partie que s'il y a au moins deux questions en attente ; et si la revanche tirée n'est pas utilisable à ce moment-là, elle est retirée de la liste sans être posée. | Lu dans le code (`game.ts`, fonction `ask`). |
| 6 | 🟠 | **La Chuleta donne la réponse des vrai/faux.** L'antisèche affiche l'explication, et les 36 explications de vrai/faux commencent par « Verdadero : » ou « Falso : ». Le filtre anti-fuite ne couvre que les QCM. | Compté sur la banque : 36 sur 36. |
| 7 | 🟠 | **Le Traductor est inutilisable une fois sur deux.** 217 questions sur 454 n'ont pas de traduction (vocabulaire, consignes déjà en français) : le bouton est grisé. La relique « Diccionario de bolsillo », qui offre un Traductor par combat, en hérite. | Compté sur la banque ; visible sur `docs/audit/05-pc-catrina-boule-de-neige.jpg`. |
| 8 | 🟡 | **Le Reloj de arena ne sert à rien sans chrono**, mais il reste proposé en récompense et à la boutique. | Lu dans le code. |
| 9 | 🟡 | **Les questions « niveau jefe » n'existent presque pas** : 1,5 par partie gagnée en moyenne. Le réglage de niveau par acte les écarte. | Mesuré en simulation. |
| 10 | 🟡 | Après un temps écoulé sur une phrase à ordonner ou une scène, la bonne disposition n'est donnée qu'en texte, pas montrée. Les salles non accessibles de la carte ne sont pas lisibles au lecteur d'écran. Deux zones annoncent le même retour (boîte de dialogue et encadré). | Lu dans le code. |

Un point que je soupçonnais et qui **n'est pas** un bug : les touches 1 à 4 ne répondent pas à la question quand le panneau d'Options est ouvert (vérifié).

## 3. Équilibrage

### 3.1 Qui gagne, en combien de temps

300 parties simulées par profil, personnage Valentina, Niveau de Calavera 0.

| Réussite de l'élève | Victoires | Durée d'une victoire (10 % / médiane / 90 %) | Ce que ça veut dire |
|---|---|---|---|
| 50 % | 1 % | — | Partie perdue en 10 min. |
| 60 % | 7 % | — | Perdue en 11 min ; **une défaite sur deux à l'acte 1**. |
| 70 % | 35 % | 16 / 21 / 26 min | Zone agréable, mais 13 % des victoires dépassent 25 min. |
| 80 % | 84 % | 15 / 19 / 26 min | Dans la cible. |
| 90 % | 98 % | 14 / 17 / 22 min | Trop facile ; 22 % des victoires sous 15 min. |
| 97 % | 100 % | médiane 16 min | Aucun enjeu ; 38 % sous 15 min. |

La bande où le jeu est intéressant est étroite : entre 70 et 80 % de réussite. En dessous, l'élève qui a le plus besoin de réviser est celui qui joue le moins longtemps et qui voit le moins de contenu (il ne dépasse pas l'acte 1, donc ne rencontre que des questions de niveau 1). Au-dessus, rien ne résiste.

Les ennemis qui arrêtent les élèves à 60 % : l'Alebrije (19 % des défaites), la Piñata Furiosa (17 %), Mictlantecuhtli (14 %), la Cruz Florida (13 %).

### 3.2 La boule de neige

Les dégâts de l'élève grossissent tout au long de la partie (reliques, série), ceux des ennemis beaucoup moins.

- Partie A, acte 3 : 11 reliques, série de 12, **7 PV retirés par bonne réponse** à une Catrina dont chaque phase en compte 20 (`docs/audit/05-pc-catrina-boule-de-neige.jpg`). Catrina battue en 4 questions.
- En simulation à 80 % : un combat normal dure 4,2 questions, une élite 5,3, un jefe 7,3, **le boss final 7,1**. Les trois phases de la Catrina, qui sont le plus beau morceau de mise en scène du jeu, défilent en une minute.

### 3.3 Reliques : lesquelles pèsent

Écart de taux de victoire quand on donne la relique dès le départ à un élève à 70 % (base : 38 %).

| Très fortes | Correctes | Sans effet |
|---|---|---|
| Vela +28 · Maracas +26 · Calavera de la suerte +21 | Pluma de colibrí +17 · Máscara +17 · Cempasúchil +14 · Trompeta +14 · Pan de muerto +13 · Corazón +12 · Piñata +11 · Lotería +10 · Pluma +10 | Diccionario de bolsillo +5 · Tilde amable +3 · **Mapa de pétalos +1** |

- **Vela** (+1 dégât, classée « rare ») et **Maracas** valent à elles seules presque un niveau d'élève.
- **Mapa de pétalos** (un choix de plus par récompense) ne change rien : les choix proposés se valent trop.
- **Reloj de sol** (+10 s de chrono, ennemis +1) fait perdre 12 points à mon robot, qui n'a pas de pression de temps. Pour un élève lent, le bilan réel est inconnu ; sans chrono, la relique n'a que son défaut.
- **Tilde amable** n'est pas mesurable par le robot, qui n'oublie jamais un accent. Pour un vrai élève de 5e, elle vaut sans doute davantage.

### 3.4 Personnages

À 75 % de réussite : Valentina 53 % de victoires, Luz 60 %, **Mateo 80 %**. Mateo commence avec les Maracas, la deuxième meilleure relique du jeu, et 3 PV de plus. Le choix du personnage n'est pas un choix de style, c'est un choix de difficulté.

### 3.5 Monedas

Partie gagnée à 80 % : **103 monedas gagnées, 26 dépensées, 77 inutilisées**, alors que le robot achète tout ce qu'il peut payer à chaque boutique. Le frein n'est pas le prix : c'est qu'on ne croise qu'une boutique par partie en moyenne (1,1). Dans la partie A, l'élève arrive devant la Catrina avec 61 monedas en poche. Une monnaie qu'on ne dépense pas n'est pas une récompense.

### 3.6 Niveau de Calavera (la difficulté croissante)

| Réussite | C0 | C2 | C4 | C6 | C8 | C10 |
|---|---|---|---|---|---|---|
| 75 % | 59 % | 50 % | 40 % | 40 % | 42 % | 27 % |
| 90 % | 98 % | 98 % | 97 % | 97 % | 96 % | **90 %** |

Les dix niveaux ne rattrapent pas un bon élève : au niveau maximum, il gagne encore 9 fois sur 10. Et entre C4 et C8, la courbe est plate.

### 3.7 Les questions ratées reviennent peu

Le carnet d'erreurs annonce : « Ces questions reviendront plus souvent dans tes prochaines parties. » Dans les faits, une question ratée pèse 6 contre 4 pour une question jamais vue. Sur une banque de 454 questions, cela donne environ **une chance sur cinq** de la revoir à la partie suivante. Mesuré : après la défaite volontaire (9 erreurs), la partie suivante a posé 62 questions et n'en a reposé que 2 sur les 9.

La banque est devenue assez grande pour diluer la répétition espacée. C'est le défaut pédagogique le plus sérieux de la version 1.

### 3.8 Formes de question et niveaux

- QCM 44 à 50 % des questions, écrit 20 à 28 %, vrai/faux 12 à 14 %, phrase à ordonner 8 à 9 %, scène 5 à 6 %, association 2 à 3 %.
- Acte 1 : uniquement des questions de niveau 1. Un bon élève refait donc à chaque partie cinq minutes de questions qu'il maîtrise déjà.

## 4. Moments ennuyeux ou répétitifs

Par ordre d'importance.

1. **Tout se passe sous l'écran.** Sur PC, la page de combat empile : guirlande, compteurs, scène de combat, boîte de dialogue, consigne, puis les réponses, puis les pouvoirs. Seule la consigne tient à l'écran (`docs/audit/01-pc-ce-que-voit-l-eleve.jpg` montre ce que l'élève voit sans défiler ; `02-…` montre la page entière). Zone de réponse hors écran : 45 questions sur 48 sur PC, 27 sur 33 sur téléphone, jusqu'à 612 pixels à faire défiler. L'élève se cale sur les réponses et ne voit plus ni l'ennemi, ni les coups, ni l'intention annoncée. L'habillage qui te plaît n'est vu qu'à l'entrée du combat.
2. **Le rythme « question, Continuer, question ».** 48 clics sur « Continuer » dans une partie gagnée, un clic sur cinq. Chaque retour est une pause, même après une bonne réponse évidente.
3. **Les intentions de l'ennemi sont du décor.** « Attaque 1 », « Bouclier 2 », « Vol » : dans tous les cas, la meilleure action est de répondre juste, et la seule action possible est de répondre. L'information est affichée mais ne sert à aucune décision.
4. **Un acte 3 sans tension.** Avec la boule de neige, les derniers combats sont les plus faciles. La partie A a vu des combats à 2 et 3 questions juste avant la Catrina.
5. **Toujours les mêmes têtes.** 3 élites, 2 jefes, 1 boss final, 11 ennemis normaux : à la troisième partie, l'élève a tout vu. L'Alebrije clôt l'acte 1 et Mictlantecuhtli l'acte 2 à chaque partie, avec le même comportement.
6. **Les événements ne demandent pas de comprendre.** Les 13 événements sont de jolis petits textes en espagnol, mais chaque choix affiche sa traduction française, un encadré « Mots utiles » traduit les expressions, et un lien « Voir en français » traduit le reste (`docs/audit/04-pc-evenement-traduit.jpg`). L'élève lit le français et clique.
7. **La carte donne peu à réfléchir.** Les icônes indiquent le type de salle, sans rien sur ce qui s'y trouve : quel ennemi, quelle récompense, quel risque (`docs/audit/09-telephone-carte.jpg`). Le choix du chemin se réduit à « combat ou pas combat ». Et la boutique, sur téléphone, est une liste de six fiches à faire défiler sur cinq écrans (`08-telephone-tianguis.jpg`).
8. **La barre de pouvoirs devient un mur.** En fin de partie A : 5 aides, 11 reliques et 3 ensembles, soit 19 pastilles dont 14 ne se cliquent pas (reliques et ensembles sont passifs). Sur téléphone, c'est un écran entier.
9. **La première victoire donne tout d'un coup.** Partie A : 10 succès, 25 cartes de lotería, 2 personnages et le Niveau de Calavera 1 en un seul écran (`docs/audit/06-pc-victoire-bilan.jpg`). Il ne reste presque rien à aller chercher ensuite.
10. **La défaite à l'acte 1 est sèche.** Un élève fragile enchaîne les erreurs, perd en 10 questions, et retombe au tout début, face aux mêmes questions de niveau 1, sans rien avoir gagné d'autre qu'un carnet d'erreurs.

## 5. Ce qui manque pour que le jeu soit vraiment prenant

**Des décisions.** Un jeu, c'est une suite de choix intéressants. Ici le seul choix fréquent est « quelle est la bonne réponse ? », c'est-à-dire l'exercice lui-même. Il manque un deuxième niveau de décision au-dessus : quelle action jouer, sur qui, maintenant ou plus tard, en prenant quel risque.

**L'espagnol comme verbe, pas comme péage.** Aujourd'hui toute bonne réponse produit le même effet : des dégâts. Que l'élève conjugue *dormir* ou situe une bougie, il se passe la même chose. Rien dans le jeu ne dépend du **sens** de ce qu'il écrit. Les trois formes « gestuelles » (ordonner, associer, placer) montrent la direction, mais elles restent des questions notées juste ou faux.

**De l'incertitude et des retournements.** Le combat est une soustraction qui se déroule. Pas de tour dangereux à anticiper, pas de coup à préparer, pas de « ouf ».

**Une histoire.** Il y a un titre, trois lieux et une Catrina, mais pas de personnage, pas de but autre que « arriver au bout », pas de raison de s'attacher. Les textes d'introduction et de victoire tiennent en une phrase.

**Un projet d'une partie à l'autre.** La collection de lotería et les succès se remplissent tout seuls. Rien ne se construit, rien ne se choisit entre deux parties, et l'élève ne voit nulle part ce qu'il sait mieux faire qu'hier.

**Du son et du mouvement.** Quelques effets sonores, pas de musique. Les animations existent mais sont hors champ (point 1 ci-dessus).

**Un usage collectif.** Le mode « projecteur » n'est qu'une taille de texte. Rien n'est prévu pour que la classe joue ensemble, alors que c'est la situation de départ la plus probable en cours.

**Un retour utile au professeur.** Le code de fin contient le résultat et les notions à revoir d'une partie. Il ne dit rien de la progression, et rien n'agrège la classe.

## 6. Qualité du code et freins aux évolutions

### Ce qui est solide

- Moteur sans dépendance à l'interface, état d'une partie entièrement sérialisable, hasard reproductible par graine.
- Contenu validé par schéma à chaque construction ; un contenu incohérent bloque la mise en ligne plutôt que de casser le jeu en classe.
- 109 tests unitaires, 6 tests Playwright, un script d'équilibrage. Build de 505 ko (123 ko compressé), 36 fichiers en cache hors ligne.
- Dépendances peu nombreuses et à jour.

### Ce qui freinerait la version 2

| Frein | Pourquoi c'est un problème | Conséquence pour la suite |
|---|---|---|
| **`game.ts` : 1 446 lignes, une seule classe** | Carte, combat, tirage des questions, objets, boutique, événements et fin de partie sont mêlés. La méthode `answer` fait à elle seule juger, calculer les dégâts, appliquer les traits de l'ennemi, le poison, les phases. | Impossible d'ajouter un deuxième type d'action sans tout toucher. À découper en modules (combat, questions, salles, objets) **avant** d'ajouter quoi que ce soit. |
| **Un seul verbe câblé partout** | L'état de combat ne connaît que « une question en cours » et « un retour ». Les effets des reliques sont une liste fermée de cas dans le code (`damageBonus`, `streakBonus`…). | Un système de cartes ou de sorts demande un état « main, énergie, cible » et des effets décrits dans le contenu, pas dans le code. |
| **Comportements d'ennemis codés en dur** | `vanish`, `crescendo`, `juicio`, `abanico`… sont des `if` dans `answer`. | Chaque nouvel ennemi original coûte du code moteur. À transformer en petits effets déclaratifs. |
| **Réglages figés au lancement** | Cause du bug n° 1. | Le moteur doit lire les réglages courants, pas une copie. |
| **Mise en page du combat en colonne** | Cause du point « tout se passe sous l'écran ». | À refaire en écran fixe (scène et réponses visibles ensemble), sur PC comme sur téléphone. |
| **CSS global, 6 fichiers** | Pas de portée par composant ; les animations de combat sont pilotées par des classes ajoutées à la main. | Gérable, mais une couche d'effets (particules, secousses) doit vivre à part, dans un canvas, pour ne pas alourdir encore. |
| **Tests d'interface minces** | 6 scénarios Playwright, aucun ne vérifie qu'on peut répondre sans défiler, ni les réglages en cours de partie. | Les trois bugs 🔴 seraient passés au rouge avec un test chacun. À ajouter. |
| **Sauvegardes versionnées, migration à écrire** | Une partie en cours d'une ancienne version est simplement jetée, ce qui est acceptable. La progression (boîtes de Leitner, collection, succès) porte un numéro de version, mais aucune conversion n'existe encore. | La version 2 doit **reprendre** la progression des élèves, pas la remettre à zéro. Prévoir la conversion dès le début. |
| **`A_VERIFIER.md` à la racine** | Tu demandes `docs/A_VERIFIER.md`. | Déplacé à l'étape 1. |

### Ce qui n'a pas besoin de changer

La pile technique (Vite, TypeScript, Preact, zod, Vitest, Playwright), le format JSON du contenu, la PWA, le déploiement GitHub Pages. Rien de ce que demande la version 2 ne justifie de repartir d'une autre base. Le détail est dans `docs/V2.md`.

## 7. Captures d'écran

Dans `docs/audit/` :

| Fichier | Ce qu'on y voit |
|---|---|
| `01-pc-ce-que-voit-l-eleve.jpg` | Un écran de collège (1366 × 768) pendant une question : les réponses sont hors champ. |
| `02-pc-question-scene-pleine-page.jpg` | La même page en entier : il faut défiler d'un écran pour répondre. |
| `03-pc-carte.jpg` | La carte d'un acte. |
| `04-pc-evenement-traduit.jpg` | Un événement : texte espagnol, « Mots utiles », « Voir en français ». |
| `05-pc-catrina-boule-de-neige.jpg` | La Catrina, phase 2 : série de 12, −7 PV par réponse, 61 monedas inutilisées, 19 pastilles de pouvoirs. |
| `06-pc-victoire-bilan.jpg` | Fin de partie gagnée : tout se débloque d'un coup. |
| `07-telephone-question.jpg` | Une question sur téléphone. |
| `08-telephone-tianguis.jpg` | La boutique sur téléphone, 8 monedas en poche. |
| `09-telephone-carte.jpg` | La carte sur téléphone. |
| `10-defaite-carnet-d-erreurs.jpg` | Fin de partie perdue et carnet d'erreurs. |
| `11-pc-ofrenda-a-placer.jpg` | Une scène à composer : la forme de question la plus proche d'un geste de jeu. |

## 8. Ce que j'en tire pour la version 2

1. **Corriger d'abord** les trois bugs 🔴 et la mise en page du combat. Ces corrections profitent à la version en ligne et ne dépendent d'aucun choix de conception.
2. **Garder** la banque, la correction, la scène de combat, les outils du professeur, la pile technique.
3. **Changer le cœur** : donner au joueur plusieurs actions dont l'effet dépend du sens de l'espagnol qu'il produit, face à des ennemis dont l'intention compte.
4. **Resserrer la répétition espacée** pour que les erreurs reviennent vraiment, et la rendre visible à l'élève.
5. **Élargir la bande de difficulté** : que l'élève à 60 % aille au bout d'une partie en apprenant, et que l'élève à 95 % trouve une résistance.

La proposition détaillée est dans [`V2.md`](V2.md).
