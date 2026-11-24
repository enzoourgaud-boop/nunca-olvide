# Étape 8 : ce que tu dois tester

Branche `etape-8-sans-repetition`. Les étapes 1 à 7 sont sur `main`.

## Le retour des élèves

> « Ce serait bien que les questions auxquelles on a répondu juste ne reviennent pas dans la même partie. »

## Ce qui a été fait

Avant, le jeu préférait les questions jamais posées, mais dès qu'il n'y en avait plus **au niveau et dans le thème visés**, il en reprenait n'importe laquelle, même déjà réussie. Je l'ai mesuré par simulation (élèves à 90 %, 60 parties par cas) :

| | Avant | Après |
|---|---|---|
| Tout mélangé, partie complète | 42 parties sur 60 avec au moins une question réussie reposée (1,4 par partie) | **0** |
| Le passé simple | 49 sur 60 (2,3 par partie) | **0** |
| Verbes réguliers | 60 sur 60 (8,7 par partie) | **0** |
| Verbes irréguliers | 59 sur 60 (9,9 par partie) | **0** |
| Le lexique (43 questions) | 57 sur 60 (9,3 par partie) | 29 sur 60 (1,8 par partie) |
| ¿Ser o ir ? (29 questions) | 60 sur 60 (15,0 par partie) | 12,4 par partie |
| L'histoire (27 questions) | 60 sur 60 (15,4 par partie) | 10,6 par partie |
| Partie courte, ces trois petits domaines | 6,6 à 7,2 par partie | **0 à 0,6** |

Désormais, le jeu cherche dans l'ordre : du neuf au niveau visé ; du neuf à un niveau voisin ; du neuf d'un autre type de question ; et **seulement en tout dernier recours** une question déjà réussie.

- Les **questions ratées reviennent toujours** (c'est voulu : « palabras pendientes »), jusqu'à ce qu'elles soient réussies.
- La liste des questions réussies est **sauvegardée avec la partie** : si l'élève quitte et reprend, rien ne revient.
- L'événement de la carte de l'Espagne n'apparaît plus s'il ne lui reste aucune question neuve (il reposait sinon une question déjà réussie).
- Les questions données par l'aide « La memoria » (qui donne la réponse) ne comptent pas comme réussies.

## Ce qu'on ne peut pas éviter

Dans les **deux plus petits domaines** (« ¿Ser o ir ? » : 29 questions ; « L'histoire » : 27), une partie complète pose 41 à 46 questions : il y en a donc plus que de questions disponibles et des répétitions apparaissent vers la fin. Trois solutions, à ton choix :
1. **Conseiller la partie courte** dans ces domaines (elle ne répète presque rien) ;
2. **me donner de nouveaux documents ou me demander d'écrire de nouvelles questions** sur ces sujets ;
3. **ne rien changer.**

## Tests automatiques (tous passent)

- **164 tests unitaires** (6 nouveaux) : sur 160 parties simulées en « Tout mélangé » (complètes et courtes, élèves à 75 % et à 90 %), **aucune** question réussie n'est reposée ; idem pour le passé simple, les verbes réguliers et irréguliers ; dans un petit domaine, toutes les questions sont posées une fois avant la première répétition (et le jeu ne se bloque pas) ; une question ratée revient mais jamais une question réussie ; la sauvegarde garde la liste.
- **22 tests Playwright** passent.
- Équilibrage inchangé (à 90 % : 98 % de victoires en 15,6 min ; à 75 % : 81 % en 18,6 min).

## À toi de tester (5 minutes)

1. Joue une partie complète en « Tout mélangé » : aucune question ne doit se répéter, sauf celles que tu as ratées.
2. Choisis « ¿Ser o ir ? » et joue une partie complète : des répétitions apparaissent-elles vers la fin ? (c'est attendu)
3. Dis-moi quelle solution tu préfères pour les petits domaines.
