# « Nunca olvidé » : document de conception

*Étape 1 — proposition à valider, version 2 : combat simplifié, chacun attaque à son tour. Séquence « La guerra civil española », 3e (A2 vers B1).*
*Titre provisoire, tiré de la dernière phrase de la abuela Carmen : « Nunca olvidé esos años ».*

## En une page

**L'idée.** L'élève est la nieta (ou le nieto) de Carmen. Chez sa grand-mère, il ouvre **la caja de los recuerdos** : des photos, des lettres, un tebeo. Mais les souvenirs s'effacent. Des **sombras del olvido** (el Miedo, el Hambre, la Leyenda, las Sirenas…) en rongent les mots. Pour les sauver, il faut répondre en espagnol.

**Le combat est simple : chacun attaque à son tour.**

1. **Ton tour** : une question s'affiche. Bonne réponse → tu attaques. Mauvaise réponse → ton attaque rate, la correction s'affiche.
2. **Le tour de l'ennemi** : il attaque. Ses dégâts sont affichés à l'avance.
3. On recommence jusqu'à ce que l'un des deux tombe.

Pas de cartes, pas de défense à choisir, pas de cible à viser.

**Où est l'espagnol dans le jeu.** Chaque ennemi a **sa façon de poser les questions** : las Sirenas ne parlent qu'à l'oral, la Leyenda n'affirme que des vrais/faux, el Remolino de Fechas mélange la chronologie. Une réponse écrite frappe plus fort qu'un QCM. Hors des combats, l'espagnol décide aussi : lettres à lire pour choisir, objets à ranger sur la frise 1926 → 1939, villes à placer sur la carte, mot mystère.

**Le respect du sujet.** On ne combat **jamais** des Espagnols, des soldats ou un camp. On combat l'oubli. Aucune arme, aucun drapeau, aucun uniforme de camp, aucune violence montrée. Les faits historiques viennent uniquement de tes documents.

**Ce que je reprends.** Le moteur du jeu actuel presque tel quel : carte à embranchements, combat au tour par tour, correction tolérante, erreurs qui reviennent, espace professeur, codes de fin de partie, QR code, hors ligne, accessibilité, tests.

**Ce que je te demande.** Lire les sections 2 et 3, puis trancher les **décisions de la section 12**.

---

## 1. Ce que contiennent tes documents

| Identifiant | Document | Ce que le jeu en tire |
|---|---|---|
| `gramatica-preterito` | Fiche « El pretérito indefinido » | Réguliers (bailar, comer, vivir), irrégularités vocaliques (pedir, dormir, gruñir, creer, producir), prétérits forts (andar, caber, conducir, decir, estar, haber, hacer, poder, poner, querer, saber, tener, venir, traer), la règle des accents |
| `mision-secreta` | Misión secreta (la abuela Carmen) | 11 phrases au passé (llegar, luchar, tener, esperar, correr, bombardear, abandonar, cruzar, vivir, volver, olvidar), dates 1936-1939, définition de « guerra civil », cambiar / salir / ser-ir, le mot mystère |
| `tio-pepe-1` | BD, planche 1 | ausente, con frecuencia, leyenda, esperanza, recuerdo, pesadilla, hambre, tebeo, « desapareció 21 años antes de nacer yo » |
| `tio-pepe-2` | BD, planche 2 | 1926 Cádiz → Barcelona, la famille (José Luis, Lola, Pepe, Aurora, Rosendo, Lolita, Pepita), rebelde, Juventudes Socialistas, fútbol, el Español, la quinta, uniforme de segunda mano, el frente, División 43, Bielsa (Huesca), abril-junio 1938 |
| `ce-mi-tio` | Questionnaire de CE | ateo, socialista, cristiana, rebelde, madrastra et leurs définitions ; situer les villes sur la carte |
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
  → ACTO 2  Barcelona · Mi tío Pepe            (la BD, irréguliers vocaliques)
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
| **Las Sirenas** | écoute : la phrase est lue à voix haute (*¡Los aviones bombardearon la ciudad!*), il faut comprendre ou reconnaître la forme (*habló* ou *hablo* ?) | `mision-secreta` n° 5 |
| **La Leyenda** | vrai / faux sur tes documents (*Los republicanos ganaron la guerra*) | `tio-pepe-1`, `evaluacion` ex. 6 |
| **El Remolino de Fechas** | remettre des événements dans l'ordre (1926 → 1936 → 1938 → 1939) | `mision-secreta`, `tio-pepe-2` |
| **El Héroe de Tebeo** | ¿ser o ir? (*La guerra fue fratricida* → ser) | `evaluacion` ex. 4 |
| **La Ausencia** | compréhension de la BD (qui est Pepe ? qui est Lola ?) | `tio-pepe-1`, `tio-pepe-2` |
| **El Olvido** (jefe final) | réponses écrites uniquement, puis la phrase finale *Nunca olvidé esos años* | `mision-secreta` |

Les autres ennemis posent des questions mélangées, selon les réglages du professeur.

La voix de l'écoute est celle du navigateur, si elle est installée. Sans voix ou son coupé, le texte s'affiche une seconde (« lecture éclair »), comme dans le jeu actuel. Le professeur peut désactiver l'écoute.

### 3.3 Hors des combats

- **Las cartas (événements)** : lettres et scènes en espagnol, **sans traduction**. Pas de bonne ou de mauvaise réponse : l'élève obtient ce qu'il a choisi. Celui qui comprend obtient ce qu'il veut (exemples en 5.6). L'élève peut demander à la abuela de traduire, trois fois par partie.
- **La frise (caja de los recuerdos)** : chaque objet retrouvé se range sur une année (1926 · 1936 · 1938 · 1939). Bien placé, il donne son bonus complet ; mal placé, la moitié (`mision-secreta`, `tio-pepe-2`).
- **La carte de l'Espagne** : « Sitúa las ciudades en el mapa de España » (`ce-mi-tio`). Avant certaines salles, placer Cádiz, Barcelona ou Huesca ouvre un raccourci. Échouer ne coûte rien. *(Mots de position : voir D6.)*
- **La palabra misteriosa** (`mision-secreta`) : chaque réponse écrite juste révèle une lettre du mot mystère de l'acte. Mot complet avant le jefe → tu connais son thème faible. *(D7.)*

---

## 4. Univers

### 4.1 Histoire

**Prologue.** Aujourd'hui. Chez la abuela Carmen, née en 1928. Elle te montre une boîte : *« Aquí están mis recuerdos. »* Quand tu l'ouvres, les photos pâlissent, les mots des lettres s'effacent. Les sombras del olvido sont là. Carmen te prend la main : *« Cuéntamelo en pasado y no se borrará. »* Te voilà dans ses souvenirs, aux côtés de **Carmen enfant**.

**Les trois actes.** Chacun correspond à un document : le souvenir de Carmen (1936), la légende de Tío Pepe (BD), l'exil (évaluation). Le jeu **n'invente aucun fait** : il ne dit pas ce qui est arrivé à Pepe, puisque ta BD ne le dit pas.

**Épilogue.** La ficha de identidad de la guerra se remplit sous les yeux de l'élève (fecha de inicio, duración, año del final, los dos bandos, jefe de los militares). Carmen : *« Nunca olvidé esos años. »*

### 4.2 Personnages

| Personnage | Rôle | Source |
|---|---|---|
| **La abuela Carmen** | guide, voix du jeu, traductrice | `mision-secreta` |
| **Carmen niña** | t'accompagne dans les souvenirs (décor, dialogues) | `mision-secreta` (« Carmen nació en 1928 ») |
| **Tío Pepe** | sujet de l'acte 2, présent par ses objets (photo, balón, uniforme). **Jamais dessiné en soldat, jamais jouable.** | `tio-pepe-1`, `tio-pepe-2` |
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

## 5. Listes

Les nombres sont des points de départ ; la simulation les réglera. Colonne « Source » : document d'où vient le nom. ⚠ = mot ou idée hors de tes documents, repris dans `A_VERIFIER.md`.

### 5.1 Salles de la carte

| Salle (moteur actuel) | Nouveau nom | Rôle |
|---|---|---|
| Combate | **Una sombra** | un ennemi de l'acte |
| Élite | **Una sombra fuerte** | ennemi coriace, récompense : un objet |
| Evento | **Una carta** | lettre ou scène à lire, choix (3.7) |
| Tianguis | **El rastro** ⚠ (« de segunda mano », `tio-pepe-2`) | acheter des objets et des aides |
| Ofrenda (repos) | **El refugio** (`mision-secreta`) | se soigner ou améliorer une aide |
| Cofre | **Una caja olvidada** | un objet |
| Jefe | **El jefe del acto** | voir 5.3 |

### 5.2 Ennemis ordinaires et élites

| Ennemi | Acte | PV / attaque (départ) | Particularité | Source |
|---|---|---|---|---|
| **La Sombra** ⚠ | 1-3 | 3 / 1 | aucune : ennemi d'apprentissage | ⚠ (*sombra*) |
| **El Miedo** | 1 | 4 / 2 | conjugaison | `mision-secreta` (« viví tres años con miedo ») |
| **El Hambre** | 1-2 | 4 / 2 | se soigne de 1 PV quand tu te trompes | `tio-pepe-1` |
| **El Remolino de Fechas** ⚠ | 1 (élite) | 6 / 2 | phrases et dates à remettre dans l'ordre | ⚠ (*remolino*) |
| **La Leyenda** | 2 | 5 / 2 | vrai / faux | `tio-pepe-1` |
| **La Ausencia** | 2 | 5 / 2 | compréhension de la BD | `tio-pepe-1` (« mi tío ausente ») |
| **El Héroe de Tebeo** | 2 (élite) | 7 / 3 | ¿ser o ir? | `tio-pepe-1` |
| **Las Cartas Perdidas** | 3 | 5 / 3 | lexique | `mision-secreta` (« esperamos sus cartas ») |
| **La Frontera** | 3 (élite) | 8 / 3 | prétérits forts, à l'écrit | `mision-secreta`, `evaluacion` |

### 5.3 Jefes

Même combat, plus de PV, et un changement de geste à mi-vie (le moteur sait déjà le faire).

| Jefe | Première moitié | Seconde moitié |
|---|---|---|
| **Las Sirenas** (acte 1) | questions à l'oral | attaque plus forte, questions sur le récit de Carmen |
| **La Pesadilla** (acte 2) | compréhension de la BD | « cotidiana » : elle repose les questions que tu as ratées |
| **El Olvido** (final) | réponses écrites uniquement | dernier coup : écrire *Nunca olvidé esos años* |

La partie courte se termine par une version courte du jefe de l'acte choisi.

### 5.4 Objets de la caja de los recuerdos

| Objet | Année sur la frise | Bonus bien placé | Source |
|---|---|---|---|
| 📷 La foto de familia | 1926 | +4 PV max | `tio-pepe-2` |
| ⚽ El balón de fútbol | 1926 | +1 dégât sur les questions de lexique | `tio-pepe-2` (« entusiasta del fútbol ») |
| 🗺 El mapa de España | 1926 | montre toute la carte de l'acte | `ce-mi-tio` |
| 🧥 El uniforme de segunda mano | 1936 | +3 PV max | `tio-pepe-2` |
| ✉ Las cartas de cada semana | 1936 | +1 moneda par bonne réponse | `mision-secreta` |
| 🥣 El plato de sopa | 1936 | +2 PV après chaque combat | `tio-pepe-1` |
| 📰 El tebeo | 1938 | +1 dégât sur les réponses écrites | `tio-pepe-1` |
| 🏔 La carta de Bielsa ⚠ | 1938 | les verbes forts font +1 | `tio-pepe-2` (lieu et date ; la lettre est inventée) |
| 🚪 La llave de casa ⚠ | 1939 | +1 dégât à chaque bonne réponse | ⚠ (*llave*) ; idée tirée de « volvió a casa en 1939 » |
| 🕯 La esperanza | — (légendaire) | une seule fois : revenir à 5 PV au lieu de perdre | `tio-pepe-1` (« conservó la esperanza ») |

**Recuerdos completos** (ensembles) : *La familia de Pepe* (foto + balón + uniforme : +1 PV à chaque bonne réponse) ; *La casa de Carmen* (cartas + sopa + llave : séries doublées).

### 5.5 Aides (consommables, effets du moteur actuel)

| Aide | Effet | Ancien nom |
|---|---|---|
| 📓 **El bloc de notas** | affiche le rappel de conjugaison de ta fiche (« Rappel : le pretérito indefinido ») | chuleta (`ce-mi-tio` : « apúntalos en tu bloc de notas ») |
| 👵 **Pregúntale a la abuela** | traduit l'énoncé | traductor |
| ✏ **El lápiz** | barre deux mauvaises propositions | tijeras |

### 5.6 Événements (cartas)

Une dizaine au départ, toutes écrites avec les phrases et le vocabulaire de tes documents. Exemples :

| Événement | Situation | Choix |
|---|---|---|
| **Suenan las sirenas** | « ¡Las sirenas! ¿Qué hiciste? » | *Corrí al refugio* (+3 PV) / *Esperé a mi madre* (+2 monedas) / *No hice nada* (rien) |
| **El rastro** | 3.7 | voir plus haut |
| **La foto de familia** | une photo, 7 personnes, des étiquettes : *ateo, muy cristiana, rebelde…* | association : qui est qui (José Luis, Lola, Pepe) → réussi : objet « la foto » |
| **El partido** | Pepe juega al fútbol | lire pour choisir : récompense différente |
| **La quinta** | « Al comenzar la guerra, fue movilizado con su quinta. » ¿Fue = ser o ir? | identification ser / ir (3.2) |
| **El tebeo** | « No era una guerra como las de los tebeos. » | V / F sur la planche 1 |
| **Una carta del frente** ⚠ | Carmen lit une lettre (texte inventé avec les mots de la BD, sans fait nouveau) | réponse au passé à composer |
| **El mapa** | « Sitúa Cádiz y Barcelona. » | placement (3.6) → raccourci |
| **La misión secreta** | une ligne de cases et une lettre jaune | conjuguer → une lettre du mot mystère |
| **La frontera** | « Mi tío cruzó la frontera con Francia. » | *Crucé la frontera* / *Volví a casa* : deux suites différentes |

---

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

Environ **260 questions** au départ, toutes avec correction expliquée en français et document source :

| Thème | Notions | Nb | Types |
|---|---|---|---|
| **Pretérito : regulares** | -ar, -er/-ir, accents | ~70 | QCM, écrit, écoute (habló / hablo), ordre, tuiles |
| **Pretérito : irregulares** | vocaliques (e→i, o→u, i→y, j), prétérits forts | ~70 | QCM, écrit, tuiles, vrai/faux (« *dijieron* est correct ») |
| **¿Ser o ir?** | identifier, conjuguer | ~15 | QCM, vrai/faux |
| **Historia** | dates, bandos, Franco, aide extérieure, exil, ficha | ~35 | QCM, écrit, vrai/faux, frise (placement), ordre |
| **Mi tío Pepe / Carmen** | compréhension des deux récits | ~40 | QCM, vrai/faux, association (qui est qui), placement (carte) |
| **Léxico** | lexique de la guerre, de la mémoire, de la famille | ~30 | association mot/traduction, mot/définition, mot/image, écrit |

Les 7 types du moteur sont utilisés : **QCM, réponse écrite, vrai/faux, phrase à remettre dans l'ordre, association mot/image, placement sur une scène** (frise chronologique et carte), **écoute**.

Les phrases de l'évaluation : voir **D3**.

### 6.4 Bilan de fin de partie

Le **code de fin de partie** existant (sans pseudo, sans identifiant) contient le résultat, la durée et les notions ratées. Le professeur le décode dans son espace et voit les notions les plus ratées de la classe.

---

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
| 3 | `etape-3-gestes` | règle des accents, frise des objets, carte de l'Espagne, mot mystère, jefes | la version complète |
| 4 | `etape-4-classe` | espace professeur adapté (partie courte imposée, acte), README final | utilisation en classe |

---

## 12. Décisions à valider

| | Question | Ma proposition |
|---|---|---|
| **D1** | Titre et univers : « Nunca olvidé », la caja de los recuerdos, combattre l'oubli (jamais un camp) | oui |
| **D2** | Combat : chacun attaque à son tour, l'ennemi frappe à chaque tour (section 2.1) | ✅ validé par toi |
| **D3** | **L'évaluation** : ses phrases exactes (ex. 3, 4, 6, 8) sont-elles reprises telles quelles dans le jeu, ou seulement ses notions avec d'autres phrases (pour ne pas donner les réponses d'un futur contrôle) ? | notions seulement, phrases reformulées ; les phrases de la Misión secreta et de la BD restent telles quelles |
| **D4** | Accents : accent oublié = « ¡Casi! » ; accent oublié qui donne une autre forme (*lucho* pour *luchó*) = faux ; accent ajouté sur un prétérit fort (*tuvó*) = faux | oui |
| **D5** | Réponses déduites (ficha de identidad, V/F « gobierno elegido democráticamente », « los republicanos ganaron » = falso, âge du narrateur) : voir `A_VERIFIER.md` | à cocher dans ce fichier |
| **D6** | Mots de position (en el norte / sur / este / oeste…) pour placer les villes sur la carte : tes élèves les connaissent-ils ? Sinon, la carte se joue en cliquant sur la ville nommée | à toi de dire |
| **D7** | Mots mystères des actes : *GUERRA CIVIL*, *ESPERANZA*, *EXILIO* | oui |
| **D8** | **Nom du nouveau dépôt** : je ne peux pas créer de dépôt GitHub moi-même. Proposition : `nunca-olvide`, public (obligatoire pour GitHub Pages gratuit) | crée-le vide, je l'y envoie |
| **D9** | Mots ou noms hors de tes documents (La Sombra, El Remolino de Fechas, el rastro, la llave…) : listés dans `A_VERIFIER.md` | à cocher |
