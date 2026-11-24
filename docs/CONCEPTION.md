# « Nunca olvidé » : document de conception

*Validé (étape 1) ; mis à jour aux étapes 2 à 6. Combat simplifié : chacun attaque à son tour. Pas de questions sur Pepe et sa famille, ni sur Carmen et la BD (étape 6), ni d'écoute. Temps du passé : uniquement passé simple et imparfait, jamais de plus-que-parfait. Séquence « La guerra civil española », 3e (A2 vers B1).*
*Titre provisoire, tiré de la dernière phrase de la abuela Carmen : « Nunca olvidé esos años ».*

## En une page

**L'idée.** L'élève est la nieta (ou le nieto) de Carmen. Chez sa grand-mère, il ouvre **la caja de los recuerdos** : des photos, des lettres, un tebeo. Mais les souvenirs s'effacent. Des **sombras del olvido** (el Miedo, el Hambre, la Leyenda, las Sirenas…) en rongent les mots. Pour les sauver, il faut répondre en espagnol.

**Le combat est simple : chacun attaque à son tour.**

1. **Ton tour** : une question s'affiche. Bonne réponse → tu attaques. Mauvaise réponse → ton attaque rate, la correction s'affiche.
2. **Le tour de l'ennemi** : il attaque. Ses dégâts sont affichés à l'avance.
3. On recommence jusqu'à ce que l'un des deux tombe.

Pas de cartes, pas de défense à choisir, pas de cible à viser.

**Où est l'espagnol dans le jeu.** Chaque ennemi a **sa façon de poser les questions** : las Sirenas ne parlent qu'à l'oral, la Leyenda n'affirme que des vrais/faux, el Remolino de Fechas mélange la chronologie. Une réponse écrite frappe plus fort qu'un QCM. Hors des combats, l'espagnol décide aussi : lettres à lire pour choisir, événements à placer sur la frise 1928 → 1939 ; à l'étape 3 : objets à ranger sur la frise, villes à placer sur la carte, mot mystère.

**Le respect du sujet.** On ne combat **jamais** des Espagnols, des soldats ou un camp. On combat l'oubli. Aucune arme, aucun drapeau, aucun uniforme de camp, aucune violence montrée. Les faits historiques viennent uniquement de tes documents.

**Ce que je reprends.** Le moteur du jeu actuel presque tel quel : carte à embranchements, combat au tour par tour, correction tolérante, erreurs qui reviennent, espace professeur, codes de fin de partie, QR code, hors ligne, accessibilité, tests.

**Ce que je te demande.** Lire les sections 2 et 3, puis trancher les **décisions de la section 12**.

---

## 1. Ce que contiennent tes documents

| Identifiant | Document | Ce que le jeu en tire |
|---|---|---|
| `gramatica-preterito` | Fiche « El pretérito indefinido » | Réguliers (bailar, comer, vivir), irrégularités vocaliques (pedir, dormir, gruñir, creer, producir), prétérits forts (andar, caber, conducir, decir, estar, haber, hacer, poder, poner, querer, saber, tener, venir, traer), la règle des accents |
| `mision-secreta` | Misión secreta (la abuela Carmen) | 11 phrases au passé (llegar, luchar, tener, esperar, correr, bombardear, abandonar, cruzar, vivir, volver, olvidar), dates 1936-1939, définition de « guerra civil », cambiar / salir / ser-ir, le mot mystère |
| `tio-pepe-1` | BD, planche 1 | **Plus utilisée dans les questions** (retirée à l'étape 6 à la demande du professeur). |
| `tio-pepe-2` | BD, planche 2 | **Plus utilisée dans les questions** (idem). |
| `ce-mi-tio` | Questionnaire de CE | **Plus utilisé dans les questions** (idem). |
| `evaluacion` | Évaluation Etapa 1 | luchar, vencer, sufrir ; ser / ir ; julio 1936, sublevarse, Franco, ayuda de la Alemania nazi y de la Italia fascista, sangrienta, exilio, campo de refugiados ; la ficha de identidad ; le lexique (guerra, bando, huir, fusilar, enterrar, sublevarse, exilio, gobierno) |

Le texte complet est transcrit dans [`sources/contenu-sequence.md`](../sources/contenu-sequence.md). Les PDF ne sont pas dans le dépôt.

**Ta séquence n'en est qu'à l'étape 1.** Le jeu est donc pensé pour grandir : chaque nouveau document pourra ajouter des questions, un ennemi, un objet, voire un acte, sans toucher au moteur (section 9).

---

## 2. La boucle de jeu

### 2.1 Le tour (10 à 15 secondes)

```
1. L'ennemi annonce son attaque   « El Miedo va a atacar. »  ⚔ 3     (phrase + icône + nombre)
2. Ton tour : une question         « Mi padre ___ (tener) que irse lejos. »
3. Tu réponds                      juste → tu frappes ; faux → raté, correction affichée
4. Le tour de l'ennemi             il frappe : tu perds 3 PV
```

**Ce qui change par rapport au jeu actuel :** aujourd'hui, l'ennemi n'attaque que quand l'élève se trompe. Ici, **l'ennemi attaque à chaque tour**. Une bonne réponse ne protège pas : elle fait avancer le combat. L'élève qui répond juste gagne parce qu'il frappe plus souvent, pas parce qu'il esquive.

**Ce qui rend ta frappe plus forte** (déjà dans le moteur) :

| Situation | Dégâts |
|---|---|
| Bonne réponse (QCM, vrai/faux, association…) | 1 |
| Bonne réponse **écrite** | 2 |
| **Série** de bonnes réponses (3 et plus) | +1 |
| Question du **thème faible** de l'ennemi (indiqué au début du combat) | +2 |
| Accent oublié (« ¡Casi! ») | 0, mais ta série continue |

Après une bonne réponse, pas de bouton « Continuer » : l'attaque se joue et l'ennemi riposte. Après une erreur, la correction reste affichée jusqu'au clic « Compris ».

### 2.2 La partie

| | Partie longue | Partie courte |
|---|---|---|
| Durée visée | 15 à 25 min | 8 à 10 min |
| Contenu | prologue + 3 actes + épilogue | 1 acte au choix (ou imposé par le professeur) + mini-jefe |
| Étages par acte | 5 (2-3 combats, 1 carta, 1 refugio ou rastro, 1 jefe) | 4 |

```
Prologue (30 s) : la caja de los recuerdos
  → ACTO 1  1936 · El pueblo de Carmen        (Misión secreta, verbes réguliers)
  → ACTO 2  La guerra en los recuerdos        (la BD : la guerre vécue, irréguliers)
  → ACTO 3  1939 · La frontera                 (l'évaluation, prétérits forts, ser / ir)
  → Épilogue : la ficha de identidad complète, « Nunca olvidé esos años »
```

En avançant, l'élève construit deux choses :

- **ses objets** : un objet au choix après certains combats ;
- **la caja de los recuerdos** : les objets retrouvés, à ranger sur une **frise chronologique** (section 3.5).

### 2.3 Entre les parties

- **Las palabras pendientes** : les questions ratées attendent l'élève au début de la partie suivante (section 6).
- **Mi cuaderno** : les notions fragiles de l'élève (écran existant).
- **El álbum** : souvenirs sauvés, objets et ennemis rencontrés (collection).
- **El reto del día** : avec la même graine, toute la classe joue la même partie courte.

---

## 3. L'espagnol dans le jeu

Le combat est le même pour tous les ennemis. Ce qui change, c'est **ce que chaque ennemi te demande**. Entre parenthèses : le document source.

### 3.1 Le pretérito indefinido partout (`gramatica-preterito`, `mision-secreta`, `evaluacion`)

La plupart des questions font conjuguer : QCM (*luchó / lucho / luchaba*), phrase à trou à écrire (*Mi padre ___ (tener) que irse lejos*), phrase à remettre dans l'ordre. Les phrases viennent de tes documents.

La légende du combat est elle-même au passé : *El Miedo atacó. Perdiste 3 PV.* L'élève lit du pretérito à chaque tour.

**Les accents** (« Attention aux accents : é, ó, í ! », Misión secreta ; « aucun accent » sur les prétérits forts, fiche) :

- accent oublié sur *luché, viví* → « ¡Casi! » ;
- accent oublié qui donne **une autre forme** (*luchó → lucho*, *llegó → llego*) → faux, avec l'explication « *lucho* = je lutte, au présent » ;
- accent ajouté sur un prétérit fort (*tuvó*, *hizó*) → faux, avec le rappel de la fiche.

*(Décision D4.)*

### 3.2 Chaque ennemi a son geste

| Ennemi | Ce qu'il te demande | Source |
|---|---|---|
| **Las Sirenas** | conjugaison au passé simple, puis histoire de la guerre (*¡Los aviones bombardearon la ciudad!*) | `mision-secreta` n° 5 |
| **La Leyenda** | vrai / faux sur tes documents (*Los republicanos ganaron la guerra*) | `evaluacion` ex. 6 |
| **El Remolino de Fechas** | remettre des événements dans l'ordre, placer 1936 et 1939 sur la frise | `mision-secreta`, `evaluacion` |
| **El Héroe de Tebeo** | ¿ser o ir? (*La guerra fue fratricida* → ser) | `evaluacion` ex. 4 |
| **La Ausencia** | disparaît au premier coup ; questions mélangées | — |
| **El Olvido** (jefe final) | réponses écrites uniquement, puis la phrase finale *Nunca olvidé esos años* | `mision-secreta` |

Les autres ennemis posent des questions mélangées, selon les réglages du professeur.

La compréhension orale (fichiers audio et questions d'écoute) a été **retirée à l'étape 6** : la voix de synthèse ne convenait pas.

### 3.3 Hors des combats

- **Las cartas (événements)** : lettres et scènes en espagnol, **sans traduction**. Pas de bonne ou de mauvaise réponse : l'élève obtient ce qu'il a choisi. Celui qui comprend obtient ce qu'il veut (exemples en 5.6). L'élève peut demander à la abuela de traduire, trois fois par partie.
- **La frise (caja de los recuerdos)** : deux souvenirs datés (1936, 1939) à ranger sur la frise 1928 · 1936 · 1938 · 1939 — voir 5.5.
- **La carte de l'Espagne** : un événement demande de situer la frontière avec la France et Madrid (voir 5.5). Les mots de position (*en el norte, en el este…*) sont connus des élèves (D6).
- **La palabra misteriosa** (`mision-secreta`) : chaque réponse écrite juste révèle une lettre du mot mystère de l'acte. Mot complet avant le jefe → tu connais son thème faible. *(D7.)*

---

## 4. Univers

### 4.1 Histoire

**Prologue.** Aujourd'hui. Chez la abuela Carmen, née en 1928. Elle te montre une boîte : *« Aquí están mis recuerdos. »* Quand tu l'ouvres, les photos pâlissent, les mots des lettres s'effacent. Les sombras del olvido sont là. Carmen te prend la main : *« Cuéntamelo en pasado y no se borrará. »* Te voilà dans ses souvenirs, aux côtés de **Carmen enfant**.

**Les trois actes.** Chacun correspond à un document : le souvenir de Carmen (1936), la guerre vécue racontée par la BD, l'exil (évaluation). Le jeu **n'invente aucun fait**, et ne parle pas de Pepe ni de sa famille.

**Épilogue.** La ficha de identidad de la guerra se remplit sous les yeux de l'élève (fecha de inicio, duración, año del final, los dos bandos, jefe de los militares). Carmen : *« Nunca olvidé esos años. »*

### 4.2 Personnages

| Personnage | Rôle | Source |
|---|---|---|
| **La abuela Carmen** | guide, voix du jeu, traductrice | `mision-secreta` |
| **Carmen niña** | t'accompagne dans les souvenirs (décor, dialogues) | `mision-secreta` (« Carmen nació en 1928 ») |
| Le joueur : **nieta** ou **nieto** | avatar au choix, sans prénom imposé | invention |

Le jeu actuel a 3 personnages à débloquer avec un petit bonus chacun ; je les garde, renommés (la cronista, el archivero, la oyente).

### 4.3 Direction artistique

- **Papier, encre et sépia.** Les souvenirs abîmés sont en noir et blanc délavé ; un souvenir sauvé **reprend ses couleurs** (ocre, bleu passé, vert olive). C'est la récompense visuelle principale.
- **Scène de combat** : on garde la scène « pixel art » du moteur, redessinée : décors (une cuisine de 1936 avec sa table et sa fenêtre, une rue de Barcelone, un chemin de montagne), Carmen niña et le joueur de dos.
- **Ennemis** : silhouettes de **taches d'encre et de papier déchiré**, chacune avec une forme reconnaissable (une spirale de dates, une bouche de sirène, un livre qui ment). Aucun visage humain réaliste, aucun uniforme, aucun drapeau, aucune arme.
- **Interdits** : pas de symboles politiques réels (drapeaux, emblèmes, sigles), pas de portrait de Franco ni d'une personne réelle, pas de reprise des dessins de la BD.
- **Police** : Atkinson Hyperlegible (texte) et OpenDyslexic (option) comme aujourd'hui ; une police « machine à écrire » libre (OFL) pour les titres, à la place de Sancreek.
- **Musique** : générée dans le navigateur, comme les effets actuels. Une mélodie originale lente (guitare et piano synthétisés), plus lumineuse quand un souvenir reprend ses couleurs. **Aucun chant ni hymne existant.**

### 4.4 Ton et sensibilité

Les élèves sont mineurs et le sujet est grave (une guerre fratricide, l'exil, des familles séparées). Règles :

- on ne gagne **jamais** contre un camp : l'ennemi, c'est l'oubli ;
- les mots *fusilar*, *enterrar* restent dans la banque (ils sont dans l'évaluation) mais **jamais comme actions de jeu**, et sans image ;
- les bombardements et le front sont **racontés** (phrases de tes documents), jamais montrés ;
- le jeu dit « los militares sublevados » et « los republicanos » comme tes documents, sans autre jugement que ceux de tes documents.

---

## 5. Listes (contenu actuel)

Valeurs réglées par simulation. Tout est modifiable dans `content/sequences/guerra-civil/` (fichiers `enemies.json`, `items.json`, `events.json`). ⚠ et noms hors documents : voir `A_VERIFIER.md`.

### 5.1 Salles de la carte

| Salle (moteur) | Nom dans le jeu | Rôle |
|---|---|---|
| Combate | **Una sombra** 🌑 | un ennemi de l'acte |
| Élite | **Una sombra fuerte** 🌘 | ennemi coriace, récompense : un souvenir |
| Evento | **Una carta** ✉️ | lettre ou scène à lire, choix |
| Tienda | **El rastro** 🧺 | acheter des aides et des souvenirs |
| Repos | **El refugio** 🏚️ | se soigner ou améliorer une aide |
| Coffre | **Una caja olvidada** 📦 | un souvenir |
| Jefe | 👁️ | voir 5.2 |

### 5.2 Ennemis

PV / attaque : valeurs de départ. **Chaque ennemi attaque à chaque tour.** Colonne « geste » : les questions qu'il pose.

| Ennemi | Acte | Type | PV / attaque | Geste | Phrase de l'álbum |
|---|---|---|---|---|---|
| 🌑 **La Sombra** | 1 | ombre | 5 / 1 | QCM, vrai/faux, ordre, association | « La sombra borró una carta. » |
| 😨 **El Miedo** | 1 | ombre | 6 / 1 | QCM, écrit | « Viví tres años con miedo. » |
| 🥣 **El Hambre** | 1 | ombre | 6 / 1 | questions mélangées ; se soigne | « Y hablando de hambre, ellos sabían muy bien lo que decían. » |
| 🌀 **El Remolino de Fechas** | 1 | élite | 8 / 2 | ordre, frise / carte | « La guerra empezó en 1936 y terminó en 1939. » |
| 🚨 **Las Sirenas** | 1 | jefe | 11 / 2 | Las sirenas suenan : QCM, ordre, vrai/faux → Los aviones : Pretérito : verbes réguliers, Historia de la guerra | « Cuando sonaron las sirenas, corrí con mi madre al refugio. » |
| 📜 **La Leyenda** | 2 | ombre | 8 / 2 | vrai/faux | « Una especie de leyenda familiar. » |
| 🫥 **La Ausencia** | 2 | ombre | 8 / 2 | questions mélangées ; disparaît au premier coup | « Mi tío ausente. » |
| 🍽️ **El Hambre Negra** | 2 | ombre | 9 / 2 | questions mélangées ; se soigne | « «A ti lo que hace falta es una buena guerra». » |
| 🤐 **El Silencio** | 2 | ombre | 8 / 2 | QCM, ordre ; brouillard (aides bloquées) | « Nadie habló de la guerra. » |
| 🦸 **El Héroe de Tebeo** | 2 | élite | 12 / 2 | Hazañas heroicas : ¿Ser o ir?, Historia de la guerra | « No era una guerra como las de los tebeos. » |
| 🌘 **La Pesadilla** | 2 | jefe | 17 / 2 | Cotidiana : Historia de la guerra, Léxico → Adherida a los recuerdos : Pretérito : verbes irréguliers, ¿Ser o ir? | « La guerra fue su pesadilla cotidiana. » |
| ✉️ **Las Cartas Perdidas** | 3 | ombre | 9 / 2 | association, QCM ; vole une aide | « Mi madre y yo esperamos sus cartas cada semana. » |
| 🏚️ **La Casa Vacía** | 3 | ombre | 10 / 2 | questions mélangées | « Muchas familias abandonaron sus casas. » |
| 😱 **El Gran Miedo** | 3 | ombre | 10 / 2 | écrit, QCM | « Muchas familias no pudieron volver a España. » |
| 🔇 **El Silencio Largo** | 3 | ombre | 10 / 2 | vrai/faux, QCM ; brouillard (aides bloquées) | « Durante muchos años, nadie habló. » |
| 🚧 **La Frontera** | 3 | élite | 13 / 3 | tout à l’écrit | « Mi tío cruzó la frontera con Francia. » |
| 🌫️ **El Olvido** | 3 | jefe final | 23 / 2 | El Olvido borra : Pretérito : verbes réguliers, Pretérito : verbes irréguliers, ¿Ser o ir? → El Olvido mezcla : ordre, frise / carte, vrai/faux → La última palabra : écrit, niveau jefe | « Nunca olvidé esos años. » |

### 5.3 Aides (à usage unique)

| Aide | Effet |
|---|---|
| 👵 Pregúntale a la abuela | Carmen traduit la question en français. S'il n'y a rien à traduire, elle donne la première lettre de la réponse. |
| 📓 El bloc de notas | Ton bloc de notas : montre la règle de conjugaison, ou la première lettre et la longueur du mot. |
| ✏️ El lápiz | Barre deux mauvaises réponses. À l’écrit, dévoile une lettre sur deux. |
| 💭 La memoria | Le souvenir revient : donne la bonne réponse (et frappe l’ombre). |
| 📄 Otra página | Change de question sans pénalité. |
| ⏳ El reloj | Ajoute 15 secondes au chrono de la question. |
| 🥣 Pan y sopa | Un bol de soupe et du pain : rend 6 points de vie. |

### 5.4 Souvenirs (objets permanents)

| Souvenir | Effet | Phrase de l'álbum |
|---|---|---|
| 🌱 La esperanza | +1 dégât à chaque bonne réponse. | « Mi familia conservó la esperanza. » |
| ✉️ Las cartas de cada semana | Les réponses écrites font +1 dégât de plus. Souvenir daté : à ranger sur la frise. | « Esperamos sus cartas cada semana. » |
| 📰 El tebeo | Le bonus de série démarre dès 2 bonnes réponses et vaut +2. | « No era una guerra como las de los tebeos. » |
| 🖼️ La foto | +4 points de vie maximum. | « Su recuerdo estuvo siempre presente en mi casa. » |
| 🪙 Las monedas de la abuela | +1 moneda par bonne réponse. | « La abuela me dio sus monedas. » |
| 🗝️ La llave del refugio | +2 points de vie après chaque combat. | « Corrí con mi madre al refugio. » |
| ✨ Tilde amable | Un accent oublié à l’écrit est pardonné. | « «Luchó» lleva tilde. » |
| 🪑 La mesa de la cocina | +3 points de vie maximum. | « Mis padres hablaban de la guerra en la mesa. » |
| 📜 La leyenda familiar | Le bonus de série fait +1 dégât de plus. | « Una especie de leyenda familiar. » |
| 📕 El diccionario | Une question traduite gratuitement à chaque combat. | « Busqué las palabras en el diccionario. » |
| 🗺️ El mapa de España | Un choix de plus dans chaque récompense. | « Sitúa las ciudades en el mapa de España. » |
| 📔 El cuaderno de Carmen | Règle modifiée : toutes les questions possibles passent à l’écrit, mais chaque réponse écrite fait +2 dégâts. | « Escribí todo en mi cuaderno. » |
| 🕰️ El reloj de pared | Règle modifiée : +10 secondes au chrono, mais les ombres frappent +1. | « El reloj de la pared no paró. » |
| 🕯️ El recuerdo | Une fois par partie, à 0 PV, tu reviens avec la moitié de ta vie. | « Su recuerdo estuvo siempre presente. » |
| 🔤 La palabra misteriosa | Toutes les 4 bonnes réponses, une aide gratuite au hasard. | « ¿Cuál es el tema? La guerra civil. » |
| 🗝️ La llave de casa | +1 dégât à chaque bonne réponse. Souvenir daté : à ranger sur la frise. | « Mi padre volvió a casa. » |

Ensembles :
- **La caja de los recuerdos** : La foto + Las cartas + El recuerdo : +1 PV à chaque bonne réponse.
- **El tebeo y la leyenda** : El tebeo + La leyenda familiar : le bonus de série est doublé.
- **Papel y tinta** : Las cartas + El diccionario : +1 moneda par réponse écrite juste.

### 5.5 Les gestes hors combat

- **La caja de los recuerdos.** Deux souvenirs sont *datés* : las cartas de cada semana (1936) et la llave de casa (1939). Quand l'élève en reçoit un, une fenêtre donne un indice en espagnol et la frise 1928 · 1936 · 1938 · 1939. Bonne année : il garde le souvenir et son effet. Mauvaise année : l'Olvido l'emporte. Touches 1 à 4 au clavier. *(Les souvenirs de Carmen bébé, 1928, et du Valle de Bielsa, 1938, ont été retirés à l'étape 6 : ils venaient de Carmen et de la BD.)*
- **La carte de l'Espagne.** Un événement (*El mapa de España*) propose de situer la frontière avec la France et Madrid (*en el norte, en el centro…*). Réussi : la carte de la abuela.
- **Le mot mystère.** Chaque acte a un mot (GUERRA CIVIL, ESPERANZA, EXILIO) en haut de l'écran : une lettre par bonne réponse, deux à l'écrit. Mot complet : le jefe est affaibli (+1 dégât).
- **L'épilogue.** Après la victoire finale, la ficha de identidad de la guerre est affichée (cinq rubriques de l'évaluation).

### 5.6 Événements

| Événement | Texte | Choix |
|---|---|---|
| 🚨 Suenan las sirenas | ¡Las sirenas! Carmen niña te coge de la mano. —¿Qué hacemos? | *Corrimos al refugio.* / *Esperamos a su madre.* |
| 🧺 El rastro | —Estas cosas son de segunda mano. Son baratas. ¿Qué quieres? | *Compré una foto vieja.* / *No compré nada.* |
| ✉️ Una carta del padre | Carmen niña tiene una carta de su padre. —No sé leer bien. ¿Me ayudas? | *Sí, leímos la carta juntas.* / *No, tengo prisa.* |
| 🔤 La misión secreta | En la caja hay una hoja con casillas y letras amarillas. —Si conjugas bien, descubres el secreto. | *Conjugué el verbo.* / *Cerré la caja.* |
| 📰 Un tebeo viejo | Encuentras un tebeo viejo: «¡Grandes batallas! ¡Hazañas heroicas!». La abuela dice: —No era una guerra como las de los tebeos. | *Le pregunté a la abuela cómo fue la guerra.* / *Leí el tebeo.* |
| 🍲 La comida | Tu primo no quiere comer la sopa. Su padre dice: «A ti lo que hace falta es una buena guerra». | *Comí toda la sopa.* / *Pregunté por qué.* |
| 🚧 La frontera | Un camino de montaña. A lo lejos, la frontera con Francia. Hace frío. | *Crucé la frontera.* / *Volví al pueblo.* |
| ⛺ El campo de refugiados | En Francia, un campo de refugiados. Una mujer te pregunta: —¿Cuándo saliste de España? | *Le contesté en español.* / *No dije nada.* |
| 📜 Una leyenda familiar | Tu tía dice: —Mi abuelo luchó en todas las batallas y nunca tuvo miedo. La abuela Carmen sonríe: —Eso es una leyenda. | *Busqué la verdad.* / *Creí la leyenda.* |
| 🌑 Una sombra en el camino | Una sombra te cierra el paso. —Si quieres pasar, lucha conmigo. | *Luché contra la sombra.* / *Busqué otro camino.* |
| 🗺️ El mapa de España | La abuela abre un mapa viejo. —¿Sabes dónde están estos lugares? | *Sí, los sitúo en el mapa.* / *No, prefiero seguir.* |

## 6. Pédagogie

### 6.1 Les erreurs reviennent : las palabras pendientes

On reprend le mécanisme qui existe et qui est testé (« almas pendientes » dans Cempasúchil), renommé :

1. une question ratée devient une **palabra pendiente** (un mot qui s'efface, visible dans le compteur en haut de l'écran) ;
2. elle est **reposée plus tard dans la même partie** (après 3 à 6 tours) ;
3. si elle n'est pas réussie, elle ouvre **la partie suivante** dans un court échauffement (4 questions au plus, sans chrono) ;
4. elle disparaît quand elle est réussie. Chaque mot sauvé donne +1 PV.

### 6.2 Une difficulté par notion

Comme dans le jeu actuel : les questions deviennent plus difficiles d'acte en acte, avec de plus en plus de réponses écrites (part réglable par le professeur).

### 6.3 Banque de questions

**288 questions**, toutes avec une correction expliquée en français et le document source. Les questions d'écoute, les questions sur Carmen et celles sur la BD ont été retirées (étape 6).

| Thème | Notions | Nb | Types |
|---|---|---|---|
| **Pretérito : verbes réguliers** | -ar, -er/-ir, accents | 91 | QCM, écrit, ordre, vrai/faux |
| **Pretérito : verbes irréguliers** | vocaliques (e→i, o→u, i→y, j), prétérits forts | 98 | QCM, écrit, ordre, vrai/faux (« *dijieron* est correct ») |
| **¿Ser o ir?** | identifier, conjuguer | 29 | QCM, vrai/faux, ordre |
| **Historia de la guerra** | dates, camps, Franco, aide étrangère, exil | 27 | QCM, écrit, vrai/faux, frise, carte |
| **Léxico** | lexique de la guerre | 43 | QCM, association mot/traduction et mot/image |

Types : QCM (232), vrai/faux (25), phrase à remettre dans l'ordre (13), association (7), placement sur la frise ou la carte (4), réponse écrite (7 questions « écrit seulement » ; la plupart des QCM peuvent aussi être posés à l'écrit). Le type « écoute » existe toujours dans le moteur, mais la banque n'en contient plus.

### 6.4 Bilan de fin de partie

Le **code de fin de partie** existant (sans pseudo, sans identifiant) contient le résultat, la durée et les notions ratées. Le professeur le décode dans son espace et voit les notions les plus ratées de la classe.

---

### 6.5 Choisir un domaine à travailler (étape 7)

Au menu principal, l'élève choisit ce qu'il veut réviser : **tout mélangé**, **le passé simple** (réguliers + irréguliers + ¿ser o ir?), les **verbes réguliers**, les **verbes irréguliers**, **¿ser o ir?**, **l'histoire de la guerre** ou **le lexique**. Le choix règle les thèmes de la partie et s'applique partout : combats, événements, coffres, échauffement des erreurs. Les événements qui posent des questions précises (la carte de l'Espagne) n'apparaissent pas si leur domaine est exclu. Un code de classe qui impose des thèmes verrouille le choix. Les domaines sont définis dans `sequence.json` (`domains`).

## 7. Espace professeur

Repris tel quel, avec les thèmes de cette séquence :

- choisir les **thèmes** et les **types de questions** ;
- **chrono** : désactivé par défaut, réglable ;
- **part de réponses écrites** ;
- accent oublié : « ¡Casi! », juste ou faux (et le cas *luchó/lucho* de 3.1) ;
- choisir la **partie courte** et l'acte imposé ;
- **code de classe** + **QR code** (générés sur l'appareil) ;
- **lire les codes de fin de partie** des élèves ;
- modifier, désactiver, créer des questions ; import / export CSV.

---

## 8. Ce que je reprends, ce que je change

| Élément | Décision |
|---|---|
| Moteur de carte, salles, étages, graine | **gardé** (noms de salles renommés dans le contenu) |
| Combat au tour par tour, une question par tour | **gardé**, avec un seul changement : **l'ennemi attaque à chaque tour**, pas seulement après une erreur |
| Correction tolérante (majuscules, ponctuation, pronoms, accents → ¡Casi!) | **gardée**, + la règle des accents « qui changent la forme » (3.1) |
| Âmes pendientes (erreurs qui reviennent) | **gardé**, renommé « palabras pendientes » |
| 7 types de questions, éditeur, import CSV, validation de la banque | **gardés** |
| Espace professeur, code de classe, QR, codes de fin de partie | **gardés** |
| Hors ligne (PWA), aucune donnée personnelle, aucun service externe | **gardés** |
| Accessibilité (OpenDyslexic, clavier, réduire les animations, tailles de texte) | **gardée** ; vérifiée à chaque étape |
| Tests (unitaires, équilibrage, Playwright), déploiement GitHub Pages | **gardés**, adaptés au nouveau contenu |
| Reliques en liste | **gardées**, présentées comme la caja de los recuerdos, avec la frise (3.3) |
| Questions, ennemis, objets, événements, textes, décors, sprites, sons, icône, titre | **remplacés** |
| Pétales qui tombent | **remplacés** par de la poussière de papier (désactivable) |
| `docs/AUDIT.md`, `docs/V2.md`, maquettes et captures de Cempasúchil | **retirés** de ce dépôt à l'étape 2 (ils restent dans Ddm) |
| Combat à cartes de la version 2 de Cempasúchil | **non repris** |

---

## 9. Ajouter les prochains documents

Quand tu ajouteras un document :

1. j'en transcris le texte dans `sources/contenu-sequence.md` avec un nouvel identifiant ;
2. j'ajoute ses questions (avec `source`), et ce qui n'y est pas écrit va dans `A_VERIFIER.md` ;
3. si le document le permet : un ennemi, un objet, un événement, ou un nouvel acte. La partie longue tire alors 3 actes parmi ceux disponibles.

---

## 10. Contraintes techniques (rappel)

- Site statique (Vite + Preact), GitHub Pages, hors ligne après la première visite.
- **Aucune donnée personnelle**, aucun compte, aucun appel réseau vers un tiers. Progression dans le stockage local de l'appareil uniquement.
- Vieux PC, tablette, téléphone : le combat (ennemi, attaque annoncée, question, zone de réponse) tient **sans défiler** à 1366 × 768, 1024 × 768 et 360 × 640. Testé par Playwright à chaque étape.
- Couleur jamais seule : chaque thème a une couleur **et** une icône **et** un nom ; chaque attaque a une icône **et** une phrase.
- « Réduire les animations » respecté ; tout jouable au clavier (1 à 4 pour les QCM, V/F, Entrée).
- Interface en français, contenu en espagnol.

---

## 11. Étapes de réalisation

Une branche par étape. **Rien n'est fusionné dans `main` sans ta validation.** Chaque étape livre : tests unitaires, simulation d'équilibrage, un test Playwright qui joue une partie entière, des captures (PC, tablette, téléphone) dans `docs/etape-N/`, et un résumé de ce que tu dois tester.

| Étape | Branche | Contenu | Ce que tu pourras faire |
|---|---|---|---|
| 1 | `etape-1-conception` | ce document, la transcription, `A_VERIFIER.md` | valider |
| 2 | `etape-2-contenu` | nouveau thème : banque de ~260 questions, ennemis, objets, événements, décors, sprites, musique, textes ; ancien contenu retiré ; l'ennemi attaque à chaque tour ; durées réglées par simulation ; README | **première version en ligne, jouable en classe** |
| 3 | `etape-3-gestes` | frise des souvenirs (caja de los recuerdos), carte de l'Espagne, mot mystère, épilogue (ficha de identidad) ; règle des accents faite à l'étape 2 | la version complète |
| 4 | `etape-4-classe` | espace professeur : acte de la partie courte (code de classe), partie courte lisible dans le code de fin ; symboles ✓/✗ ; test au clavier ; README final avec séance type | utilisation en classe |

---

## 12. Décisions à valider

| | Question | Ma proposition |
|---|---|---|
| **D1** | Titre et univers : « Nunca olvidé », la caja de los recuerdos, combattre l'oubli (jamais un camp) | oui |
| **D2** | Combat : chacun attaque à son tour, l'ennemi frappe à chaque tour (section 2.1) | ✅ validé |
| **D3** | **L'évaluation** : ses phrases exactes (ex. 3, 4, 6, 8) sont-elles reprises telles quelles dans le jeu, ou seulement ses notions avec d'autres phrases (pour ne pas donner les réponses d'un futur contrôle) ? | ✅ pas obligé de reformuler : les phrases de l'évaluation sont reprises telles quelles |
| **D4** | Accents : accent oublié = « ¡Casi! » ; accent oublié qui donne une autre forme (*lucho* pour *luchó*) = faux ; accent ajouté sur un prétérit fort (*tuvó*) = faux | oui |
| **D5** | Réponses déduites (ficha de identidad, V/F « gobierno elegido democráticamente », « los republicanos ganaron » = falso, âge du narrateur) : voir `A_VERIFIER.md` | à cocher dans ce fichier |
| **D6** | Mots de position (en el norte / sur / este / oeste…) pour placer les villes sur la carte : tes élèves les connaissent-ils ? | ✅ oui (étape 3) |
| **D7** | Mots mystères des actes : *GUERRA CIVIL*, *ESPERANZA*, *EXILIO* | oui |
| **D8** | **Nom du nouveau dépôt** : je ne peux pas créer de dépôt GitHub moi-même. Proposition : `nunca-olvide`, public (obligatoire pour GitHub Pages gratuit) | en attente : tu crées le dépôt plus tard |
| **D9** | Mots ou noms hors de tes documents (La Sombra, El Remolino de Fechas, el rastro, la llave…) : listés dans `A_VERIFIER.md` | à cocher |
