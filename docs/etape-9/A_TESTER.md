# Étape 9 : ce que tu dois tester

Branche `etape-9-nouvelles-questions`. Les étapes 1 à 8 sont sur `main`.

## Ta demande

> Pour les petits domaines (¿Ser o ir ?, Histoire) : **écris de nouvelles questions**. Dans les verbes irréguliers, **priorise ser, ir, tener, estar, hacer**. Pour les autres, libre à moi.

## Ce qui a été fait : 214 questions nouvelles (288 → 502)

| Domaine | Avant | Après | Ce qui s'ajoute |
|---|---|---|---|
| Verbes irréguliers | 98 | **195** | 97 questions sur **ser, ir, tener, estar, hacer** (voir ci-dessous) |
| ¿Ser o ir ? | 29 | **82** | 53 : nouvelles phrases (« ¿de quel verbe vient *fuimos* ? »), vrai/faux, « *fue* peut venir de ser **et** de ir », phrases à remettre dans l'ordre, associations forme ↔ traduction, 3 questions à écrire |
| L'histoire | 27 | **67** | 40 : les **mêmes faits que ton évaluation**, sous d'autres formes (qui s'est soulevé, deux camps, aide de l'Allemagne nazie / de l'Italie fasciste, exil en France, durée, frise 1936 / 1939…) |
| Le lexique | 43 | **67** | 24 : *fratricida, sangriento, el jefe, la ayuda, los refugiados, los militares, la República, volver*, et *luchar, vencer, sufrir* (traductions de ton évaluation) |
| Verbes réguliers | 91 | 91 | inchangé |

**Pour ser, ir, tener, estar, hacer** (97 questions, fichier `irregulares-extra.json`) : de quel verbe vient la forme (« *estuvimos* viene del verbo… »), à quelle personne elle correspond (« *tuviste* corresponde a… »), 27 phrases à compléter avec traduction, 14 vrai/faux sur les pièges (*tuvó, hacieron, fué*, « *hizo* s'écrit avec z »…), 10 phrases à remettre dans l'ordre avec une forme-piège, 8 associations (pronom ↔ forme, forme ↔ infinitif, forme ↔ traduction), 6 questions « écrit seulement » pour le boss. Aucun accent sur les prétérits forts, comme sur ta fiche. Les mauvaises réponses proposées sont des erreurs réalistes d'élèves (*tenió, estuvó, hizó, hacieron, fuí, fuistes*).

Les fichiers sont `irregulares-extra.json`, `ser-ir-extra.json`, `historia-extra.json`, `lexico-extra.json` (identifiants `nv-…`) dans `content/sequences/guerra-civil/questions/`.

## Résultat : plus aucune répétition

Simulation de 40 parties par cas (élèves à 60, 75, 90 et 100 %), parties complètes et courtes, **chaque domaine du menu** :

| Domaine | Répétitions par partie complète avant (étape 8) | Après |
|---|---|---|
| ¿Ser o ir ? | 12,4 | **0** |
| L'histoire | 10,6 | **0** |
| Le lexique | 1,8 | **0** |
| Les autres domaines | 0 | 0 |

Au passage, j'ai corrigé un cas limite du moteur : face à un ennemi qui exige des **réponses écrites** (la Frontera), s'il ne restait plus de question neuve à écrire, le jeu reposait une question déjà réussie. Il donne maintenant une question neuve en choix multiple.

## À vérifier par toi (docs/A_VERIFIER.md, partie 6)

- les **phrases d'entraînement inventées** et leurs traductions ;
- la **définition de « fratricida »** (guerre entre gens d'un même pays, comme entre frères) : le mot est dans ton évaluation, pas sa définition ;
- « Muchos republicanos estuvieron en campos de refugiados en Francia » **généralise** ta phrase sur le bisabuelo ;
- les faits historiques sont tous ceux de ton évaluation / Misión secreta (aucun fait nouveau), avec les mêmes réserves (1939, trois ans).

Pour retirer une question qui ne te plaît pas : espace professeur → Questions, ou `"disabled": true` dans le fichier, ou dis-le-moi.

## Ce que tu peux tester à la main

1. Menu → **¿Ser o ir ?** → Partie complète : joue une dizaine de questions, tu dois voir des phrases nouvelles et plusieurs types (QCM, vrai/faux, phrase à ordonner, association).
2. Menu → **Verbes irréguliers** : repère les questions sur *tener, estar, hacer, ser/ir*.
3. Menu → **L'histoire de la guerre** : les questions reprennent les faits de l'évaluation, formulées autrement.
4. Dans chaque domaine, une question réussie ne doit **jamais** revenir dans la même partie ; une question ratée revient (palabras pendientes).

## Captures

PC et téléphone, combat + réponses visibles sans défiler : `01-…-ser-o-ir-…`, `02-…-irreguliers-…`, `03-…-histoire-…` (dossier `docs/etape-9/`).

## Tests automatiques (tous passent)

- **167 tests unitaires** (2 nouveaux, 2 adaptés) : chaque domaine du menu, partie complète ou courte, élèves à 60 / 90 / 100 % : **0 répétition** ; ser, ir, tener, estar, hacer ont au moins 12 questions chacun ; ¿Ser o ir ? et l'histoire ont au moins 50 questions et 5 types différents ; plus de plus-que-parfait, de Carmen, de Pepe, de BD, d'écoute.
- **Validateur de banque** : 502 questions, aucune erreur.
- **22 tests Playwright** (PC, téléphone) : tous passent.
- Équilibrage inchangé (à 90 % : 98 % de victoires en 16,0 min ; à 75 % : 84 % en 18,7 min).
- Deux tests dépendaient d'une graine aléatoire précise que les nouvelles questions ont déplacée (la partie complète automatique, un test de longueur de partie) : je les ai rendus indépendants de la graine, sans changer ce qu'ils vérifient.
