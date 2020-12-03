# Zellij

1st Ironhack Project — a game

Deployed version: https://zellij.netlify.app/

## 1. Rules

Zellij is a digital board game for two players, based on Azul.

### 1.1 Setup

a. Both players have their own **wall** that they need to decorate with colorful tiles.
b. **Five factories** are filled with **four tiles** each randomly, out of a total amount of _100 tiles in five colors_.
c. The first player is chosen at _random_.

### 1.2 Gameplay

a. In order to **add tiles to the wall** and **score points**, the players need to form _complete rows of tiles of the same color_.
b. Tiles can be _claimed from factories_ or from the discard yard. When claiming, the player **takes all tiles of the chosen color**, while all the other tiles will end in the discard yard.
c. A player can also choose all tiles of a color _from the discard yard_, instead of a factory. The first player to do so will also take hold of the **first player marker**, which will be added to the penalty line — it cannot be directly targeted.
d. Claimed tiles can then be _added to one track_ if the color hasn't been placed on the wall on that particular track. One needs to fill the **whole row with one color**. You can add tiles to the same track in multiple rounds.
e. Any tiles that don't fit in the row must be placed on the **penalty line**. Each filled space will take out a number of points, but the score cannot go negative.
f. When there are no more tiles in the factories or in the yard, scoring begins.

### 1.3 Scoring

a. Starting from the top track, all complete rows will send one tile to the wall, corresponding to the line of the track.
b. _Each placed tile will score one point for itself_ and another _point for each adjacent tile_ and all other tiles next to them, both on rows and on columns.
c. Each complete row will earn two bonus points.
d. Each complete column will earn seven bonus points.
e. If all five matching tiles are on the wall, twelve bonus points will be added.
f. The tiles from the penalty line will be deducted from the score, without going negative.
g. Unused tiles from steps a. and c. (from the tracks and the penalty line) will be placed in a separate pile that will be reused if there aren't any more available tiles.
h. A new round begins, resupplying the factories with four tiles each, and the one that has the first player marker will get to choose first.

### 1.4 Endgame

a. The game ends once a player fills a row and the scoring for that round ends.
b. Highest score wins — in case of a tie, a rematch is in order.
