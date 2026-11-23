# Étape 6 : ce que tu dois vérifier

Branche `etape-6-retrait`. Les étapes 1 à 5 sont sur `main`.

## Ce qui a été retiré (à ta demande)

| Retrait | Détail |
|---|---|
| **Audio** | les 72 fichiers `.mp3`, le script qui les générait, le lecteur et leurs tests. Le jeu est de nouveau plus léger (1 Mo au lieu de 2,9 Mo). |
| **Questions d'écoute** | les 36 questions. Les ombres qui en posaient ont changé : *Las Sirenas* (jefe de l'acte 1) pose maintenant des questions de conjugaison, plus rapides si tu actives le chrono ; *El Eco* a disparu ; *El Silencio* et *El Silencio Largo* posent des QCM, des phrases à remettre dans l'ordre et des vrai/faux. |
| **Questions sur la BD et son questionnaire** | 35 questions (Bielsa, tebeo, pesadilla, leyenda, esperanza, recuerdo, hambre…). |
| **Questions sur Carmen** | le thème « souvenirs » (20 questions) et 14 autres dont l'énoncé parle de Carmen. |

**Total : 106 questions retirées, 288 restent** : 98 irréguliers, 91 réguliers, 43 lexique, 29 ¿ser o ir?, 27 histoire. La liste des identifiants retirés est dans `docs/etape-6/QUESTIONS_RETIREES.txt` ; si l'une te manque, dis-le-moi, je la remets.

Conséquences :
- **Le thème « souvenirs » n'existe plus** : il y a 5 thèmes dans l'espace professeur.
- **La frise** n'a plus que 2 souvenirs datés (*las cartas*, 1936 ; *la llave de casa*, 1939). Les souvenirs « Carmen bébé » (1928) et « Valle de Bielsa » (1938) sont retirés. Les années 1928 et 1938 restent sur la frise comme mauvaises réponses.
- **La carte de l'Espagne** n'a plus que 2 questions (la frontière avec la France, Madrid) : celles qui parlaient de Huesca et de Bielsa venaient de la BD.
- Il reste 4 questions de frise et de carte au total.

## Ce que je n'ai PAS retiré (dis-moi si tu veux)

Tu as parlé des *questions*. Je n'ai pas touché au décor du jeu :
- le personnage de la **abuela Carmen** (guide, aide « Pregúntale a la abuela »), le titre « Nunca olvidé » et la phrase de l'épilogue ;
- les **ombres** dont le nom vient de la BD : la Leyenda, la Ausencia, la Pesadilla, el Héroe de Tebeo ;
- les événements *Un tebeo viejo* et *La comida* (citations de la BD) ;
- les **phrases d'entraînement à la première personne** tirées de ta Misión secreta (« Mi padre volvió a casa en 1939 », « Corrí con mi madre al refugio »…) : ce sont des exercices de conjugaison, pas des questions sur Carmen.

## Tests automatiques

- **152 tests unitaires** passent (les tests du contenu retiré ont été adaptés ou supprimés ; un test vérifie toujours qu'il n'y a aucun plus-que-parfait).
- **20 tests Playwright** passent (partie entière sur PC et téléphone, espace professeur, hors-ligne, clavier, combat visible sans défiler, frise, mot mystère, animations).
- Équilibrage (simulation, 200 parties par niveau) : à 90 % de bonnes réponses, 97 % de victoires en 16 min ; à 75 %, 82 % en 19 min ; à 60 %, 31 % ; à 50 %, 9 % ; partie courte : 8 à 10 min.

## À toi de vérifier (10 minutes)

1. Joue une **partie courte** : le jeu te paraît-il toujours assez varié avec 288 questions ?
2. Dans l'espace professeur, onglet **Questions** : cherche « Carmen » et « tebeo ». Il ne doit rester aucune question sur eux.
3. Réponds à une question avec **Madrid** (carte) : à garder ou à retirer ? (hors de tes documents)
4. Dis-moi si tu veux aussi retirer ce qui est listé au-dessus dans « Ce que je n'ai PAS retiré ».
