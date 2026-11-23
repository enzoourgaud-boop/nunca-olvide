# « Nunca olvidé » : document de conception

*Étape 1 — proposition à valider. Séquence « La guerra civil española », 3e (A2 vers B1).*
*Titre provisoire, tiré de la dernière phrase de la abuela Carmen : « Nunca olvidé esos años ».*

## En une page

**L'idée.** L'élève est la nieta (ou le nieto) de Carmen. Chez sa grand-mère, il ouvre **la caja de los recuerdos** : des photos, des lettres, un tebeo. Mais les souvenirs s'effacent. Des **sombras del olvido** (le Miedo, el Hambre, la Leyenda, las Sirenas…) en rongent les mots. Pour les sauver, il faut **raconter au passé** : chaque verbe bien conjugué au pretérito indefinido devient une action à l'écran, chaque souvenir sauvé reprend ses couleurs.

**Pourquoi c'est un jeu et pas un quiz.** La règle d'or (reprise de la version 2 de Cempasúchil) : *ce que l'élève dit en espagnol, c'est ce qui se passe à l'écran.*

- Le **verbe** choisit l'action : *corrí* (au refuge) esquive, *luchó* frappe, *esperamos* charge la carte suivante, *durmió* endort l'ennemi.
- La **personne** choisit la cible : *yo* = moi, *nosotros* = moi et Carmen enfant, *él / ella* = l'ennemi, *ellos* = tous les ennemis.
- La **règle de grammaire devient une règle du jeu** : les verbes comme *dormir* ou *pedir* ne sont irréguliers qu'à la 3e personne (fiche de grammaire). Donc *dormí* (je dors : je me soigne) est facile, mais *durmió* (l'ennemi s'endort) exige la forme irrégulière. Viser l'ennemi, c'est connaître l'irrégularité.
- L'**accent écrit** compte : *luchó* (il lutta) n'est pas *lucho* (je lutte). Sans l'accent, le coup part… dans le présent, c'est-à-dire nulle part.

**Le respect du sujet.** On ne combat **jamais** des Espagnols, des soldats ou un camp. On combat l'oubli. Aucune arme, aucun drapeau, aucun uniforme de camp, aucune violence montrée. Les faits historiques viennent uniquement de tes documents.

**Ce que je reprends.** Le moteur (carte à embranchements, correction tolérante, âmes pendientes, espace professeur, codes de fin de partie, QR code, hors ligne, accessibilité, tests) et la conception validée de la version 2 de Cempasúchil (combat à cartes, intention de l'ennemi annoncée, objets à construire).

**Ce que je te demande.** Lire les sections 2 et 3 (le cœur), puis trancher les **décisions de la section 12**.

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

### 2.1 Le tour (15 à 20 secondes)

```
1. L'ennemi annonce        « El Miedo preparó un ataque. »  ⚔ 5      (en espagnol, au passé, + icône)
2. Tu reçois 3 cartes      ✒ LUCHAR     ✒ CORRER     📖 LA ESPERANZA
3. Tu en joues UNE         (touche 1, 2 ou 3, ou clic)
4. Tu fais le geste        la carte s'ouvre : c'est le défi en espagnol
5. L'effet se joue         sur la scène, sous tes yeux
6. L'ennemi agit           s'il le peut encore
```

Exemple. Le Miedo a 4 PV et prépare une attaque de 5. En main :

- **LUCHAR → *luchó*** (4 dégâts sur lui) : je l'achève, si j'écris le bon accent.
- **CORRER → *corrí*** (j'esquive) : sans risque, mais le combat dure.
- **DORMIR → *durmió*** (il passe son tour) : très fort, mais irrégulier. Est-ce que je suis sûr de moi ?

La décision dépend de ce que l'élève **sait qu'il sait**. Une carte ratée ne fait rien : la correction s'affiche, l'intention de l'ennemi s'exécute, et la question revient plus tard (section 6).

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

- **su mazo de verbos** (son paquet de cartes) : une nouvelle carte au choix après chaque combat ;
- **la caja de los recuerdos** : les objets retrouvés, à ranger sur une **frise chronologique** (section 3.5).

### 2.3 Entre les parties

- **Las palabras pendientes** : les questions ratées attendent l'élève au début de la partie suivante (section 6).
- **Mi cuaderno** : les notions fragiles de l'élève (écran existant).
- **El álbum** : souvenirs sauvés, objets et ennemis rencontrés (collection).
- **El reto del día** : avec la même graine, toute la classe joue la même partie courte.

---

## 3. L'espagnol comme mécanique

Neuf gestes de langue. Chacun a un effet de jeu **et** un intérêt pédagogique. Entre parenthèses : le document source.

### 3.1 Contar : les verbes sont les actions (`gramatica-preterito`, `mision-secreta`, `evaluacion`)

Une carte porte un **infinitif**. Pour la jouer, l'élève produit la forme au pretérito indefinido. **Le sens du verbe donne l'effet, la personne donne la cible.**

| Personne | Cible |
|---|---|
| *yo* | moi |
| *nosotros* | moi et Carmen enfant (le compagnon) |
| *él / ella* | l'ennemi visé |
| *ellos / ellas* | tous les ennemis |

*Tú* et *vosotros* restent dans la banque de questions et dans les dialogues (Carmen te parle : « ¿Corriste al refugio? »).

**Les cartes de verbes** (tous les verbes viennent de tes documents) :

| Carte | Forme typique | Effet | Difficulté |
|---|---|---|---|
| LUCHAR | luchó / lucharon | 4 dégâts | régulier |
| VENCER | venció | 7 dégâts si l'ennemi a moins de la moitié de ses PV, sinon 2 | régulier |
| SUFRIR | sufrió | l'ennemi perd 2 PV par tour pendant 3 tours | régulier |
| CORRER | corrí / corrimos | esquive la prochaine attaque (« corrí al refugio ») | régulier |
| ESPERAR | esperé / esperamos | la carte suivante a un effet doublé | régulier |
| VIVIR | viví / vivimos | +4 PV | régulier |
| COMER | comí / comimos | +2 PV, et chasse el Hambre | régulier |
| VOLVER | volví | reprend en main une carte déjà jouée | régulier |
| CRUZAR | crucé / cruzó | change de ligne : hors de portée pendant un tour | régulier (*crucé* : z → c, voir A_VERIFIER) |
| CONSERVAR | conservé | garde une carte en main au tour suivant (« conservó la esperanza ») | régulier |
| DORMIR | dormí / **durmió** | *yo* : +3 PV ; *él* : l'ennemi passe son tour | **vocalique** |
| PEDIR | pedí / **pidió** | Carmen enfant frappe (4) ; *él* : l'ennemi perd son bouclier | **vocalique** |
| CREER | creí / **creyó** | *él* : l'ennemi croit une fausse piste et annule son action | **i → y** |
| PRODUCIR | **produje** | +3 monedas | **en j** |
| TENER | **tuve** | pioche 2 cartes | **fort** |
| ESTAR | **estuve** | bouclier 6 (« estuve en el refugio ») | **fort** |
| PODER | **pudimos** | moi et Carmen agissons tous les deux (deux effets) | **fort** |
| DECIR | **dijo / dijeron** | dit la vérité : brise un bouclier, démasque la Leyenda | **fort** (*dijeron*, pas *dijieron*) |
| SABER | **supe** | montre les 3 prochaines intentions | **fort** |
| TRAER | **trajo** | Carmen rapporte un objet de la caja | **fort** (*trajeron*) |
| VENIR | **vino** | un souvenir ami vient frapper (6) | **fort** |
| HACER | **hice** | copie la dernière carte jouée | **fort** (*hizo* : c → z) |
| PONER | **puse** | pose un objet sur la frise sans test | **fort** |
| SER / IR | **fue / fueron** | carte spéciale (3.2) | **fort** |
| OLVIDAR | **nunca olvidé** | coup final contre el Olvido (3.9) | régulier |

**Les irréguliers sont les cartes les plus puissantes** : risque et récompense vont ensemble.

**Quatre façons de jouer la même carte**, selon la maîtrise de l'élève sur cette notion :

1. choisir la bonne forme parmi trois (*luchó / lucho / luchaba*) ;
2. composer la forme avec des tuiles, pièges compris (*dormió*, *dijieron*, *tuvó*) ;
3. écrire la terminaison ;
4. écrire toute la phrase « a la pluma » (*Los aviones bombardearon la ciudad*) : effet renforcé.

**Les accents** (« Attention aux accents : é, ó, í ! », Misión secreta ; « aucun accent » sur les prétérits forts, fiche) :

- accent oublié sur *luché, viví* → « ¡Casi! » : la carte part à moitié ;
- accent oublié qui donne **une autre forme** (*luchó → lucho*, *llegó → llego*) → faux, avec l'explication « *lucho* = je lutte, au présent » ;
- accent ajouté sur un prétérit fort (*tuvó*, *hizó*) → faux, avec le rappel de la fiche.

*(Décision D4.)*

**Pour l'apprentissage.** La personne du verbe n'est plus une case de tableau : elle désigne quelqu'un à l'écran. Et la légende sous chaque personnage est elle-même au passé : *El Miedo durmió. Carmen corrió al refugio.* L'élève lit du pretérito à chaque tour pour savoir quoi faire.

### 3.2 ¿Ser o ir? : la carte « FUE » (`evaluacion` ex. 2 et 4, `mision-secreta` 3)

« SER et IR ont les mêmes formes ! » La carte **FUE** est la plus souple du jeu : on la joue en complétant une phrase, et **c'est le sens de la phrase qui décide de l'effet**.

- *La guerra **fue** fratricida* → **ser** : définir. L'ennemi est « nommé » : il prend +2 dégâts pendant deux tours.
- *Muchos españoles **fueron** a Francia* → **ir** : partir. Esquive et pioche une carte.

À la fin du coup, le jeu demande « ser ou ir ? ». Une bonne identification double l'effet. L'élève apprend à reconnaître le verbe par le contexte (*a* + lieu → ir).

### 3.3 Escuchar : las Sirenas (`mision-secreta` n° 5)

« Cuando sonaron las sirenas, corrí con mi madre al refugio. » Certains ennemis annoncent leur intention **à voix haute seulement**. L'élève écoute :

- s'il entend une attaque (*¡Los aviones bombardearon…!*) et joue CORRER ou ESTAR, il est protégé ;
- s'il entend *luchó* ou *lucho*, il doit savoir **qui** agit : l'accent tonique change la personne et le temps (fiche : « l'accentuation tombe sur la terminaison »).

La voix est celle du navigateur, si elle est installée. Sans voix ou son coupé, le texte s'affiche une seconde (« lecture éclair »), comme dans le jeu actuel. Le professeur peut désactiver l'écoute.

### 3.4 ¿Verdadero o falso? : la Leyenda (`tio-pepe-1`, `evaluacion` ex. 6)

« Tío Pepe… una especie de leyenda familiar. » La Leyenda déforme les souvenirs. À chaque tour, elle **affirme** quelque chose sur tes documents : *« Los republicanos ganaron la guerra. »* *« En 1926, la familia emigró de Cádiz a Barcelona. »*

- Affirmation fausse → l'élève répond **falso** : la Leyenda perd son bouclier et prend des dégâts.
- Affirmation vraie → **verdadero** : l'élève récupère 2 PV (le souvenir est confirmé).
- Erreur : la Leyenda se renforce.

C'est l'exercice 6 de l'évaluation, mais l'élève **veut** répondre juste, parce que c'est sa seule arme contre cet ennemi.

### 3.5 Situar en el tiempo : la frise et la caja de los recuerdos (`mision-secreta`, `tio-pepe-2`, `evaluacion` ex. 5)

La caja de los recuerdos est une **frise chronologique** : 1926 · 1928 · 1936 · 1938 · 1939. Chaque objet retrouvé se pose sur une année. **Bien placé, il donne son bonus complet** ; mal placé, la moitié. Exemples : la photo de famille (1926, l'arrivée à Barcelone), l'uniforme de segunda mano (1936, « al comenzar la guerra »), la lettre de Bielsa (1938).

Certains ennemis (el Remolino de Fechas) **mélangent la frise** : il faut la remettre en ordre (geste « phrase à remettre dans l'ordre » appliqué aux dates). Et le jefe final mélange les événements de toute la guerre.

**Pour l'apprentissage.** La chronologie de ta séquence (1926 → 1936 → 1938 → 1939) est manipulée vingt fois par partie.

### 3.6 Situar en el mapa (`ce-mi-tio`, 2e partie, question 1)

« Sitúa las ciudades en el mapa de España. » La carte de chaque acte est dessinée sur une **carte de l'Espagne originale et stylisée**. Avant certaines salles, l'élève doit **placer** un lieu (Cádiz, Barcelona, Huesca, la frontera con Francia) d'après une phrase en espagnol ; réussi, il ouvre un raccourci. Échouer ne coûte rien : on prend le chemin normal.

*(Les mots « en el norte, en el sur, en el este… » ne sont pas dans tes documents : voir D6 et `A_VERIFIER.md`.)*

### 3.7 Leer para decidir : las cartas (`tio-pepe-1`, `tio-pepe-2`, `mision-secreta`)

« Mi madre y yo esperamos sus cartas cada semana. » Les **événements** sont des lettres ou des scènes en espagnol, **sans traduction**. Pas de bonne ou de mauvaise réponse : l'élève obtient ce qu'il a choisi. Celui qui comprend obtient ce qu'il veut.

> **El rastro.** *—Este uniforme es de segunda mano. Es barato. ¿Lo quieres?*
>
> 1. *Sí, lo compré.* → objet « el uniforme » (bouclier au début des combats), −3 monedas.
> 2. *No, gracias. Quiero un balón de fútbol.* → objet « el balón ».
> 3. *No, prefiero comer algo.* → +4 PV.

Pour ne pas bloquer : l'élève peut **demander à la abuela** de traduire un mot, trois fois par partie (aide existante « traductor », renommée).

### 3.8 Nombrar y comprender : les cartes de mots et d'histoire (`evaluacion` ex. 7, `ce-mi-tio` 6)

- **📖 Palabras** (lexique) : cartes simples et fiables (*LA ESPERANZA* : bouclier 4 ; *EL RECUERDO* : 3 dégâts ; *EL EXILIO* : esquive). Le défi est une question de vocabulaire : association mot/traduction, mot/définition (*ateo, rebelde, madrastra*), mot/image.
- **📜 Historia** (contexte) : cartes puissantes, une fois par combat (*JULIO DE 1936*, *LA FICHA*, *EL EXILIO EN FRANCIA*). Le défi est une question sur l'histoire telle que tes documents la racontent.

### 3.9 La palabra misteriosa (`mision-secreta`, page 1)

Ta fiche cache un mot (LA GUERRA CIVIL) dans les cases jaunes. Dans le jeu, **chaque acte a son mot mystère**. Chaque verbe réussi « a la pluma » révèle une lettre. Si le mot est complet avant le jefe, l'élève connaît **son point faible**. Mots proposés : acte 1 *GUERRA CIVIL*, acte 2 *ESPERANZA*, acte 3 *EXILIO* (D7).

Et le **coup final** contre el Olvido s'écrit en entier : *Nunca olvidé esos años.*

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
| **Carmen niña** | compagnon de combat (cible de *nosotros*) | `mision-secreta` (« Carmen nació en 1928 ») |
| **Tío Pepe** | sujet de l'acte 2, présent par ses objets (photo, balón, uniforme). **Jamais dessiné en soldat, jamais jouable.** | `tio-pepe-1`, `tio-pepe-2` |
| Le joueur : **nieta** ou **nieto** | avatar au choix, sans prénom imposé | invention |

**Trois styles de jeu** (débloqués comme dans le jeu actuel), avec un paquet de départ différent :

| Style | Paquet de départ | Pour quel élève |
|---|---|---|
| **La cronista** | ESPERAR, LUCHAR, et des cartes « a la pluma » | celui qui est à l'aise à l'écrit |
| **El archivero** | PONER, TRAER, objets en plus sur la frise | celui qui aime construire |
| **La oyente** | CORRER, DECIR, cartes d'écoute | celui qui aime anticiper |

Objectif : moins de 8 points d'écart de victoire entre deux styles (vérifié par simulation).

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
| Tianguis | **El rastro** ⚠ (« de segunda mano », `tio-pepe-2`) | acheter des cartes et des objets |
| Ofrenda (repos) | **El refugio** (`mision-secreta`) | se soigner ou améliorer une carte |
| Cofre | **Una caja olvidada** | un objet |
| Jefe | **El jefe del acto** | voir 5.3 |

### 5.2 Ennemis ordinaires et élites

| Ennemi | Acte | Comportement (intention) | Ce qui marche contre lui | Source |
|---|---|---|---|---|
| **La Sombra** ⚠ | 1-3 | attaque simple | tout : ennemi d'apprentissage | ⚠ (*sombra*) |
| **El Miedo** | 1 | fait trembler : ta prochaine main n'a que 2 cartes | SABER (voir venir), ESPERAR | `mision-secreta` (« viví tres años con miedo ») |
| **El Hambre** | 1-2 | dévore une carte de ta main et se soigne | COMER, l'achever vite | `tio-pepe-1` |
| **El Remolino de Fechas** ⚠ | 1 (élite) | mélange ta frise ; bouclier tant qu'elle est en désordre | remettre la frise en ordre (3.5) | ⚠ (*remolino*) |
| **La Leyenda** | 2 | affirme des choses vraies ou fausses (3.4) | verdadero / falso, DECIR | `tio-pepe-1` |
| **La Ausencia** | 2 | disparaît un tour sur deux : on ne peut pas la viser | ellos (cibler tous), ESPERAR | `tio-pepe-1` (« mi tío ausente ») |
| **El Héroe de Tebeo** | 2 (élite) | bouclier de « hazañas heroicas » qui grossit | DECIR (la vérité : « no había hazañas heroicas »), FUE (ser) | `tio-pepe-1` |
| **Las Cartas Perdidas** | 3 | cache une de tes cartes chaque tour | VOLVER, TRAER | `mision-secreta` (« esperamos sus cartas ») |
| **El Silencio** ⚠ | 3 | coupe le texte de l'intention : il faut écouter | écoute (3.3) | ⚠ (*silencio*) |
| **La Frontera** | 3 (élite) | mur : insensible tant qu'on n'a pas joué CRUZAR | CRUZAR, puis tout | `mision-secreta`, `evaluacion` |

### 5.3 Jefes (à phases)

| Jefe | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| **Las Sirenas** (acte 1) | intentions **seulement à l'oral** : écouter, puis CORRER ou ESTAR au bon moment | à mi-vie, « los aviones » : grosse attaque annoncée deux tours à l'avance ; il faut l'endormir (*durmió*) ou s'abriter | — |
| **La Pesadilla** (acte 2) | « cotidiana » : elle répète chaque jour la même intention, ce qui la rend prévisible | « adherida a la espina dorsal de sus recuerdos » : elle se colle à un objet de ta frise et le désactive ; il faut décrire l'objet (question de compréhension de la BD) pour la décoller | — |
| **El Olvido** (final) | **efface** : les mots de tes cartes perdent des lettres, il faut les écrire | **mélange** : toute la chronologie de la guerre est en désordre (julio 1936 → 1938 → 1939) | **dernier mot** : l'attaque finale se joue en écrivant *Nunca olvidé esos años* |

La partie courte se termine par une version courte du jefe de l'acte choisi.

### 5.4 Objets de la caja de los recuerdos

| Objet | Année sur la frise | Bonus bien placé | Source |
|---|---|---|---|
| 📷 La foto de familia | 1926 | +4 PV max | `tio-pepe-2` |
| ⚽ El balón de fútbol | 1926 | les cartes 📖 Palabras font +1 | `tio-pepe-2` (« entusiasta del fútbol ») |
| 🗺 El mapa de España | 1926 | montre toute la carte de l'acte | `ce-mi-tio` |
| 🧥 El uniforme de segunda mano | 1936 | bouclier 2 au début de chaque combat | `tio-pepe-2` |
| ✉ Las cartas de cada semana | 1936 | une carte de plus au premier tour | `mision-secreta` |
| 🥣 El plato de sopa | 1936 | +2 PV après chaque combat | `tio-pepe-1` |
| 📰 El tebeo | 1938 | le premier bouclier ennemi de chaque combat se brise | `tio-pepe-1` |
| 🏔 La carta de Bielsa ⚠ | 1938 | les verbes forts font +1 | `tio-pepe-2` (lieu et date ; la lettre est inventée) |
| 🚪 La llave de casa ⚠ | 1939 | VOLVER pioche aussi une carte | ⚠ (*llave*) ; idée tirée de « volvió a casa en 1939 » |
| 🕯 La esperanza | — (légendaire) | une seule fois : revenir à 5 PV au lieu de perdre | `tio-pepe-1` (« conservó la esperanza ») |

**Recuerdos completos** (ensembles) : *La familia de Pepe* (foto + balón + uniforme : les cartes de l'acte 2 piochent mieux) ; *La casa de Carmen* (cartas + sopa + llave : soins doublés au refugio).

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
| **Suenan las sirenas** | « ¡Las sirenas! ¿Qué hiciste? » | *Corrí al refugio* (+bouclier au prochain combat) / *Esperé a mi madre* (+PV pour Carmen niña) / *No hice nada* (rien) |
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

Comme dans la version 2 : la maîtrise de chaque notion (verbes réguliers, vocaliques, forts, ser/ir, histoire, BD, lexique) règle le niveau du défi (choix → tuiles → terminaison → phrase entière). L'élève fragile choisit, l'élève à l'aise écrit.

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
| Correction tolérante (majuscules, ponctuation, pronoms, accents → ¡Casi!) | **gardée**, + la règle des accents « qui changent la forme » (3.1) |
| Âmes pendientes (erreurs qui reviennent) | **gardé**, renommé « palabras pendientes » |
| 7 types de questions, éditeur, import CSV, validation de la banque | **gardés** |
| Espace professeur, code de classe, QR, codes de fin de partie | **gardés** |
| Hors ligne (PWA), aucune donnée personnelle, aucun service externe | **gardés** |
| Accessibilité (OpenDyslexic, clavier, réduire les animations, tailles de texte) | **gardée** ; vérifiée à chaque étape |
| Tests (unitaires, équilibrage, Playwright), déploiement GitHub Pages | **gardés**, adaptés au nouveau contenu |
| Combat « une question par tour » | **remplacé** par le combat à cartes (3.1), sur la base du travail commencé dans Cempasúchil (D2) |
| Reliques en liste | **remplacées** par la caja de los recuerdos sur frise (3.5) |
| Questions, ennemis, objets, événements, textes, décors, sprites, sons, icône, titre | **remplacés** |
| Pétales qui tombent | **remplacés** par de la poussière de papier (désactivable) |
| `docs/AUDIT.md`, `docs/V2.md`, maquettes et captures de Cempasúchil | **retirés** de ce dépôt à l'étape 2 (ils restent dans Ddm) |

---

## 9. Ajouter les prochains documents

Quand tu ajouteras un document :

1. j'en transcris le texte dans `sources/contenu-sequence.md` avec un nouvel identifiant ;
2. j'ajoute ses questions (avec `source`), et ce qui n'y est pas écrit va dans `A_VERIFIER.md` ;
3. si le document le permet : un ennemi, un objet sur la frise, un événement, ou un nouvel acte. Le jeu est pensé pour **passer de 3 à 4 ou 5 actes** ; la partie longue tire alors 3 actes parmi ceux disponibles.

---

## 10. Contraintes techniques (rappel)

- Site statique (Vite + Preact), GitHub Pages, hors ligne après la première visite.
- **Aucune donnée personnelle**, aucun compte, aucun appel réseau vers un tiers. Progression dans le stockage local de l'appareil uniquement.
- Vieux PC, tablette, téléphone : le combat (ennemi, intention, cartes, zone de réponse) tient **sans défiler** à 1366 × 768, 1024 × 768 et 360 × 640. Testé par Playwright à chaque étape.
- Couleur jamais seule : chaque famille de cartes a une couleur **et** une icône **et** un nom ; chaque intention a une icône **et** une phrase.
- « Réduire les animations » respecté ; tout jouable au clavier (1/2/3 pour les cartes, V/F, Entrée).
- Interface en français, contenu en espagnol.

---

## 11. Étapes de réalisation

Une branche par étape. **Rien n'est fusionné dans `main` sans ta validation.** Chaque étape livre : tests unitaires, simulation d'équilibrage, un test Playwright qui joue une partie entière, des captures (PC, tablette, téléphone) dans `docs/etape-N/`, et un résumé de ce que tu dois tester.

| Étape | Branche | Contenu | Ce que tu pourras faire |
|---|---|---|---|
| 1 | `etape-1-conception` | ce document, la transcription, `A_VERIFIER.md` | valider |
| 2 | `etape-2-contenu` | nouveau thème sur le moteur actuel : banque de ~260 questions, ennemis, objets, événements, décors, sprites, musique, textes ; ancien contenu retiré ; README | **première version en ligne, jouable en classe** (encore « une question par tour ») |
| 3 | `etape-3-cartas` | combat à cartes : verbe = action, personne = cible, 4 niveaux de défi, accents | jouer les verbes |
| 4 | `etape-4-gestos` | ser/ir, écoute des Sirenas, Leyenda V/F, frise et caja, carte de l'Espagne, mot mystère | les gestes spéciaux |
| 5 | `etape-5-jefes` | jefes à phases, épilogue, styles de jeu, réglage des durées (15-25 min / 8-10 min) | une partie complète finale |
| 6 | `etape-6-classe` | espace professeur adapté (partie courte imposée, acte), README final | utilisation en classe |

L'étape 2 met en ligne une version utile tout de suite ; les étapes 3 à 5 la transforment en « vrai jeu » sans jamais casser la version en ligne.

---

## 12. Décisions à valider

| | Question | Ma proposition |
|---|---|---|
| **D1** | Titre et univers : « Nunca olvidé », la caja de los recuerdos, combattre l'oubli (jamais un camp) | oui |
| **D2** | Le combat à cartes existe à moitié dans la branche `etape-3-cartas` de Ddm (non fusionnée, non validée). Puis-je **copier ce code** dans le nouveau dépôt comme point de départ de l'étape 3 ? (Ddm n'est pas modifié.) | oui |
| **D3** | **L'évaluation** : ses phrases exactes (ex. 3, 4, 6, 8) sont-elles reprises telles quelles dans le jeu, ou seulement ses notions avec d'autres phrases (pour ne pas donner les réponses d'un futur contrôle) ? | notions seulement, phrases reformulées ; les phrases de la Misión secreta et de la BD restent telles quelles |
| **D4** | Accents : accent oublié = « ¡Casi! » (demi-effet) ; accent oublié qui donne une autre forme (*lucho* pour *luchó*) = faux ; accent ajouté sur un prétérit fort (*tuvó*) = faux | oui |
| **D5** | Réponses déduites (ficha de identidad, V/F « gobierno elegido democráticamente », « los republicanos ganaron » = falso, âge du narrateur) : voir `A_VERIFIER.md` | à cocher dans ce fichier |
| **D6** | Mots de position (en el norte / sur / este / oeste, a la izquierda…) pour placer les villes sur la carte : tes élèves les connaissent-ils ? Sinon, la carte se joue en cliquant sur la ville nommée, sans phrase de position | à toi de dire |
| **D7** | Mots mystères des actes : *GUERRA CIVIL*, *ESPERANZA*, *EXILIO* | oui |
| **D8** | **Nom du nouveau dépôt** : je ne peux pas créer de dépôt GitHub moi-même (voir le résumé). Proposition : `nunca-olvide`, public (obligatoire pour GitHub Pages gratuit) | crée-le vide, je l'y envoie |
| **D9** | Mots ou noms hors de tes documents (La Sombra, El Remolino de Fechas, El Silencio, el rastro, la llave, crucé…) : listés dans `A_VERIFIER.md` | à cocher |
