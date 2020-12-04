# Zellij

1st Ironhack Project — a game

Deployed version: https://zellij.netlify.app/
[Presentation](https://docs.google.com/presentation/d/1ZFhB8KOBH06fW0RV_sXBYAB9PQxMDf6bfituXrEkNIk/edit?usp=sharing)

## 1. Rules

Zellij is a digital board game for two players, based on Azul.

### 1.1 Setup

1. Both players have their own **wall** that they need to decorate with colorful tiles.
1. **Five factories** are filled with **four tiles** each randomly, out of a total amount of _100 tiles in five colors_.
1. The first player is chosen at _random_.

### 1.2 Gameplay

1. In order to **add tiles to the wall** and **score points**, the players need to form _complete rows of tiles of the same color_.
1. Tiles can be _claimed from factories_ or from the discard yard. When claiming, the player **takes all tiles of the chosen color**, while all the other tiles will end in the discard yard.
1. A player can also choose all tiles of a color _from the discard yard_, instead of a factory. The first player to do so will also take hold of the **first player marker**, which will be added to the penalty line — it cannot be directly targeted.
1. Claimed tiles can then be _added to one track_ if the color hasn't been placed on the wall on that particular track. One needs to fill the **whole row with one color**. You can add tiles to the same track in multiple rounds.
1. Any tiles that don't fit in the row must be placed on the **penalty line**. Each filled space will take out a number of points, but the score cannot go negative.
1. When there are no more tiles in the factories or in the yard, scoring begins.

### 1.3 Scoring

1. Starting from the top track, all complete rows will send one tile to the wall, corresponding to the line of the track.
1. _Each placed tile will score one point for itself_ and another _point for each adjacent tile_ and all other tiles next to them, both on rows and on columns.
1. Each complete row will earn two bonus points.
1. Each complete column will earn seven bonus points.
1. If all five matching tiles are on the wall, twelve bonus points will be added.
1. The tiles from the penalty line will be deducted from the score, without going negative.
1. Unused tiles from steps a. and c. (from the tracks and the penalty line) will be placed in a separate pile that will be reused if there aren't any more available tiles.
1. A new round begins, resupplying the factories with four tiles each, and the one that has the first player marker will get to choose first.

### 1.4 Endgame

1. The game ends once a player fills a row and the scoring for that round ends.
1. Highest score wins — in case of a tie, a rematch is in order.

## 2. Credits

- Original Gameplay: [Azul](https://planbgames.com/games/azul-next-move-games-michael-kiesling-strategy-abstract-board-game-winner-spiel-des-jahres-game-of-the-year-cannes-portuguese-tiles-royal-palace-of-evora-1) by Michael Kiesling / Next Move Games
- The current player marker — Blue Magician by [maaot](https://maaot.itch.io/mossy-cavern) at itch.io.
- Icons by Chunk Icons and Rainbow Designs from the [Noun Project](https://thenounproject.com/)
