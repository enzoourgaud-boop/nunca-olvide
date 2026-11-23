# À vérifier par le professeur

> **Relu par le professeur le 12/11/2026.** Tout est validé (☑), sauf 3 questions désactivées (⛔) : `cult-petalos-guian`, `cult-calaveritas-azucar`, `cult-nombre-ofrenda`. Elles restent dans `cultura.json` avec `"disabled": true` et ne sont plus posées.
>
> **13/11/2026 :** la section 9 (points à valider pour la version 2) est validée.

Ce fichier liste tout ce qui, dans le jeu, **ne vient pas directement de tes documents** (`sources/`). Pour chaque point, trois options :
- **valider** : coche la case ;
- **corriger** : modifie la question dans `content/sequences/dia-de-muertos/questions/…json` ;
- **désactiver** : ajoute `"disabled": true` à la question (l'espace professeur de l'étape 5 le fera en un clic).

Les identifiants (`cult-alebrije`…) permettent de retrouver chaque question dans les fichiers JSON.

## 1. Questions de culture hors documents

| ✔ | Identifiant | Question | Réponse attendue | D'où ça vient |
|---|---|---|---|---|
| ⛔ désactivée | `cult-petalos-guian` | Según la tradición, ¿para qué sirven los pétalos de cempasúchil? | Para guiar a las almas | Prototype. Tes documents disent seulement qu'on décore les tombes avec ces fleurs. |
| ☑ | `cult-alebrije` | ¿Qué es un alebrije? | Una criatura fantástica de muchos colores | Prototype. L'image de la fiche « elementos » montre un alebrije, mais aucune définition n'est donnée. |
| ⛔ désactivée | `cult-calaveritas-azucar` | ¿De qué están hechas las calaveritas tradicionales? | De azúcar | Déduit de l'image (tête de mort en sucre) de la fiche « elementos ». |
| ☑ | `cult-pelicula` | ¿Cómo se llama la película de Pixar sobre el Día de Muertos? | Coco | Ton document de description d'affiche nomme le film. L'explication ajoute la date (2017), qui n'est pas dans tes documents. Le jeu n'affiche aucune image du film. |
| ☑ | `cult-color-cempasuchil` | ¿De qué color es la flor de cempasúchil? | Naranja | Déduit des images (fiche « elementos » et autel du court-métrage). |
| ⛔ désactivée | `cult-nombre-ofrenda` | ¿Cómo se llama el altar con fotos, velas, flores y comida? | La ofrenda | Le mot « ofrenda » vient de la transcription (`contenu-sequence.md`, « el altar / la ofrenda »), pas d'un texte de cours. |

## 2. Vocabulaire déduit ou ajouté

La fiche « Los elementos del Día de Muertos » ne donne que des images. Les mots ci-dessous sont ceux de la transcription (`contenu-sequence.md`), **à confirmer** :
- ☑ la calavera, la flor (de cempasúchil), el pan de muerto, la vela, el altar / la ofrenda, la cruz, el cementerio, la tumba, el esqueleto, la guitarra, la trompeta, el tambor (pour l'image « instruments de musique »).
- ☑ `voc-mariposa-*` : **la mariposa** (le papillon) vient du prototype, pas de tes documents.
- ☑ Mots tirés de l'affiche décrite (`cartel-descripcion`) : el niño, el hombre, la mujer, la ciudad, el vestido, volar, llevar.

## 3. Phrases d'exemple inventées

Les phrases des questions de conjugaison et de grammaire (« Mi hermano está leyendo un cuento de miedo », « La foto está en el centro del altar »…) sont des **exemples fabriqués** à partir des règles de tes fiches. Elles ne contiennent pas d'affirmation culturelle. À noter toutefois :
- ☑ `conj-frase-tu-escribiendo` : « Tú estás escribiendo una calaverita ». Le mot *calaverita* au sens de « petit poème » (*calaverita literaria*) n'apparaît pas dans tes documents.
- ☑ `gram-centro-hay-esta` : l'explication introduit la nuance « HAY + un/una, ESTAR + el/la ». Elle va au-delà de ta fiche, qui dit seulement « hay = il y a ; ESTAR para situar ».

## 4. Noms et éléments du décor du jeu

Ces noms ne sont pas posés en question. Ils servent d'habillage, mais les élèves les verront :

| ✔ | Élément | Où dans le jeu | Remarque |
|---|---|---|---|
| ☑ | **El Mictlán** | nom de l'acte 3 | Inframonde de la mythologie aztèque. Absent de tes documents. |
| ☑ | **Mictlantecuhtli** | jefe de l'acte 2 | Seigneur du Mictlán dans la mythologie aztèque. Absent de tes documents. |
| ☑ | **El Panteón** | nom de l'acte 2 | Au Mexique, « panteón » désigne couramment le cimetière. |
| ☑ | **El Xoloitzcuintle** | ennemi de l'acte 2 | Race de chien mexicaine. Absente de tes documents. |
| ☑ | **El Tianguis** | boutique entre les actes | Marché traditionnel mexicain. Absent de tes documents. |
| ☑ | **La Lechuza**, **El Jaguar de Obsidiana**, **La Serpiente**, **La Mariposa Negra** | ennemis | Créatures choisies pour l'ambiance, sans affirmation culturelle. |
| ☑ | **Papel picado**, **cartes de lotería** | décor (guirlande, cartes des ennemis) | Motifs traditionnels mexicains. Absents de tes documents. |
| ☑ | **El Mariachi de Huesos** | élite de l'acte 2 | « Mariachi » apparaît dans un distracteur, jamais comme bonne réponse. |
| ☑ | **Tamales**, **Chocolate** | objets de soin | Plats mexicains. Absents de tes documents. |

## 5. Ce qui vient bien de tes documents (pour mémoire)

Texte de compréhension (dates, origine maya et aztèque, États-Unis, fête de bienvenue, adjectifs, musique et danse) ; P2 (cimetières, prières, offrandes, déguisements) ; P3 (la Catrina, Posada, critique, déguisement) ; fiche ESTAR + GERUNDIO (toutes les formes et règles) ; outils de description d'image (izquierda, derecha, planos, hay, ser/estar, yo veo / podemos ver).

## 6. Ajouts de l'étape 2 (à relire)

### Événements (`content/sequences/dia-de-muertos/events.json`)
Ce sont 13 petites scènes **inventées** en espagnol A1, sans affirmation culturelle nouvelle. Relis surtout la langue et le niveau :
- ☐ `abuela-tamales` : une grand-mère prépare des tamales (plat déjà présent comme objet de soin).
- ☐ `musico-baile`, `banda-esqueletos` : musiciens et squelettes qui jouent de la trompette, du tambour, des maracas.
- ☐ `altar-sin-velas`, `foto-ofrenda` : un autel avec la photo d'un défunt (doc1, fiche « elementos »).
- ☐ `tumba-flores` : une famille décore une tombe avec des fleurs de cempasúchil (P2).
- ☐ `ninos-disfrazados` : des enfants déguisés en squelettes dans la rue (P2).
- ☐ `panaderia` : une boulangerie vend du pain de muerto.
- ☐ `loteria-plaza` : des gens jouent à la lotería sur la place (jeu de société mexicain, décor déjà validé).
- ☐ `alebrije-trato`, `calavera-pregunta`, `mariposas`, `vendedor-esqueleto` : scènes fantastiques, sans affirmation culturelle.

### Nouveaux objets (`items.json`)
- ☐ Incienso (aide), Pan de muerto, Trompeta, Diccionario de bolsillo, Mapa de pétalos, Pluma de colibrí, Reloj de sol, Máscara, Calavera de la suerte, Lotería (reliques). Ce sont des noms d'objets, sans affirmation culturelle.
- ☐ Ensemble « Ofrenda completa » (Vela + Cempasúchil + Pan de muerto) : il associe trois éléments de l'ofrenda vus en classe.
- ☐ Ensemble « Mariachi » (Maracas + Trompeta) : le mot apparaissait déjà dans le décor validé.

## 7. Ajouts de l'étape 3 (à relire)

### Vrai / faux (`questions/vrai-faux.json`, 36 affirmations)
Toutes viennent de tes documents (texte, P2, P3, fiche ESTAR + GERUNDIO, outils de description). Les affirmations fausses sont fabriquées pour être réfutées. Exemples : « La Catrina fue creada por Frida Kahlo » (falso) ; « Los disfraces típicos son princesas y piratas » (falso).
- ☐ Vérifie que chaque affirmation **vraie** est bien formulée comme dans tes documents.

### Compréhension orale (`questions/ecoute.json`, 30 questions)
- ☐ Les distracteurs « qui sonnent pareil » sont des mots **hors séquence**, choisis pour leur son (la cara, la caravana, la cadena, la bella, la tuba, la rumba, el escritorio, el delfín, la oferta, la merienda, el silencio, la avenida, el comentario, la maraca, la posada…). Ils ne sont jamais la bonne réponse.
- ☐ Les 6 questions orales de culture reprennent les questions de compréhension du texte (P4).

### Scènes (`scenes.json`, `questions/escenas.json`)
- ☐ Deux décors originaux : **une ofrenda à deux étages** (arriba / abajo × a la izquierda / en el centro / a la derecha) et **un cimetière en trois plans** (en el fondo / en segundo plano / en primer plano). Aucune image du court-métrage ni de l'affiche.
- ☐ Objets placés : vela, foto, calavera, flor, pan de muerto, frutas, cruz, tumba, esqueleto, guitarra, alebrije, mariposa, niño, mujer.
- ☐ Pour « Place les objets », les consignes mélangent « X está arriba, a la izquierda » (ESTAR + el/la) et « En el fondo, a la derecha, hay una cruz » (HAY + un/una), comme dans ta fiche de description.

### Associer mot et image (`questions/association.json`)
- ☐ Images (emoji) discutables à vérifier : ✏️ pour « el caricaturista », 🎭 pour « el disfraz », 🕊️ pour « volar », 😐 pour « serio ».

### Remettre dans l'ordre (`questions/ordre.json`, 24 phrases)
- ☐ Phrases reprises du texte, de P2, de P3, de la fiche ESTAR + GERUNDIO et des outils de description. Certaines contiennent une étiquette piège (ex. « leiendo » à côté de « leyendo »).

## 8. Ajouts de l'étape 4 (à relire)

### Cartes de lotería (`enemies.json` et `items.json`, champ `phrase`)
Chaque carte porte une petite phrase d'exemple en espagnol, inventée avec le vocabulaire de la séquence (« La vela está en el altar », « El esqueleto está tocando la trompeta », « La Catrina lleva un sombrero »…).
- ☐ Relis les 42 phrases : niveau A1-A2, sans affirmation culturelle nouvelle.

### Personnages (`sequence.json`, rubrique `characters`)
- ☐ Valentina (la ofrendera), Mateo (el trompetista), Luz (la poeta). La description de Luz parle de « vers pour les défunts », une allusion aux *calaveritas literarias* (validée à l'étape 1).

## 9. Version 2 : points à valider avant de coder

La proposition de version 2 ([`V2.md`](V2.md)) s'appuie sur quelques éléments qui **ne sont pas dans tes documents**. Pour chaque ligne : valide (☑), corrige, ou écarte (⛔).

> **Validé par le professeur le 13/11/2026** (« oui à tout »). Les textes espagnols nouveaux restent à relire au fur et à mesure (9.4).

### 9.1 Culture

| ✔ | Élément | Où dans la version 2 | Ce que le jeu affirmerait | Remarque |
|---|---|---|---|---|
| ☑ | **La lotería et son meneur** (« el Gritón ») | cartes du jeu, écoute, lotería imprimable | À la lotería, un meneur annonce les cartes à voix haute et les joueurs marquent leur planche. | Jeu traditionnel mexicain. Les cartes de lotería sont déjà validées comme décor ; le rôle du meneur et le mot *gritón* sont nouveaux. |
| ☑ | **Totopo, un xoloitzcuintle comme compagnon** | toute la partie | Rien : c'est le chien de la famille. | La croyance selon laquelle le xoloitzcuintle guide les âmes vers le Mictlán n'est pas dans tes documents : **le jeu ne le dira pas**, sauf si tu le demandes. Le nom *Totopo* (une chips de tortilla) est choisi pour sa sonorité. |
| ☑ | **La Catrina vaniteuse**, qui trouve la fête « trop bruyante, trop colorée » | histoire, boss final | Elle méprise la fête populaire, puis peut la rejoindre. | C'est une mise en scène de ton texte P3 (« crítica a la hipocresía de las clases privilegiadas »), pas un fait. L'idée souvent associée à Posada, « la mort rend tout le monde égal », n'est pas dans tes documents : **elle ne sera pas écrite**. |
| ☑ | **El Catrín** | élite de l'acte 2 | Le cavalier de la Catrina. | Vient de la transcription de la fiche « elementos » (« Catrina et Catrín »), elle-même déduite d'une image. |
| ☑ | **Don Chema, panadero**, grand-père défunt | une des trois fins | *Los muertos vuelven a visitar a sus familiares* (phrase de ton texte). | Personnage inventé. Dis-moi si tu préfères qu'aucun défunt de la famille ne soit nommé. |
| ☑ | **Les recetas de la ofrenda** (où poser la foto, les velas, le pan…) | construction de la ofrenda | Rien : ce sont des consignes de jeu. | Les dispositions sont inventées pour l'exercice de description. Le jeu ne prétend pas qu'il existe une disposition traditionnelle. |
| ☑ | **Mictlantecuhtli qui « juge »** | jefe de l'acte 2 | Il pose des questions sur tes textes. | Le nom est déjà validé. Le « jugement » est une invention de jeu, comme dans la version 1. |
| ☑ | **Les ennemis qu'on « calme »** au lieu de les vaincre | tous les combats | Les choses de la fête rejoignent la fête. | Choix de ton, sans affirmation culturelle. |
| ☑ | **El caricaturista** | une rencontre | Un dessinateur croque des calaveras et demande pourquoi la Catrina a été créée. | Le personnage n'est **pas** Posada et ne porte pas son nom ; Posada n'est cité que dans la réponse, comme dans ton texte. |
| ☑ | **Musique « dans l'esprit » mexicain** | toute la partie | Rien. | Mélodies originales fabriquées par le navigateur. Aucune œuvre existante n'est reprise. |

**Écarté d'office**, parce que tu as déjà désactivé la question correspondante ou que ce n'est pas dans tes documents :

- les pétales de cempasúchil qui guident les âmes (question `cult-petalos-guian` désactivée) : l'histoire ne le dira pas ; le titre du jeu ne change pas ;
- les papillons monarques comme âmes des défunts ;
- les calaveritas en sucre (question `cult-calaveritas-azucar` désactivée) ;
- toute ressemblance avec *Coco* : pas d'enfant musicien, pas d'ancêtre oublié, pas de pont de pétales, pas de photo manquante.

### 9.2 Vocabulaire hors séquence

Les **cartes, sorts, objets et défis** n'utilisent que le vocabulaire et les verbes de tes documents. L'**histoire et les dialogues** ont besoin de quelques mots en plus. Ils seront touchables pour en voir la traduction.

| ✔ | Mots | Où |
|---|---|---|
| ☑ | la abuela, el abuelo, la familia, el perro | personnages |
| ☑ | el viento, frío, el baile, elegante, el mercado, el panadero | histoire |
| ☑ | ahora, aquí, con, también, pero | liaisons |
| ☑ | ¿Me ayudas? · gracias · por favor · ¡cuidado! · ¡mira! | dialogues (¿Me ayudas? est déjà dans les événements de la version 1) |
| ☑ | dos, tres | recetas (« Hay dos velas ») |
| ☑ | les couleurs : azul, rojo, verde, amarillo, morado | jefe El Alebrije (« Ahora el alebrije es azul »). *Naranja* et *colorido* sont dans tes documents. |
| ☑ | Noms de cartes : *golpe*, *hechizo*, *mirada*, *saber*, *receta*, *baraja*, *alma pendiente* | interface du jeu, jamais interrogés |

Si ta classe n'a pas vu les couleurs ou les nombres, dis-le : le jefe et les recetas s'écrivent autrement.

### 9.3 Verbes des sorts

Chaque sort porte un verbe de ta fiche ESTAR + GERUNDIO ou de tes textes. À vérifier : que l'effet choisi corresponde bien au sens que tu donnes au verbe en classe.

| ✔ | Verbe | Source | Effet proposé |
|---|---|---|---|
| ☑ | comer | fiche | soigner |
| ☑ | rezar | P2 | protéger |
| ☑ | cantar | fiche | donner du courage |
| ☑ | bailar | texte | esquiver |
| ☑ | tocar (música) | texte | frapper tous les ennemis |
| ☑ | decorar | P2 | renforcer un objet de la ofrenda |
| ☑ | volar | description d'image | se mettre hors de portée |
| ☑ | dormir | fiche | endormir |
| ☑ | leer | fiche | prévoir |
| ☑ | oír | fiche | entendre le point faible |
| ☑ | traer | fiche | faire rapporter une carte |
| ☑ | pedir | fiche | demander de l'aide |
| ☑ | decir | fiche | dire la vérité : démasquer, briser un bouclier |

### 9.4 Textes à relire le moment venu

Tout texte espagnol nouveau (histoire, dialogues, recetas, légendes d'état) sera listé ici, étape par étape, **avant** d'entrer dans le jeu. Les exemples cités dans `V2.md` sont des échantillons pour juger du niveau.
