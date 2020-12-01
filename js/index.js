'use strict';

class Game {
  constructor(playerCount) {
    //optimized for 2, 3 & 4
    this.playerCount = playerCount;
    this.firstPlayer = Math.floor(Math.random() * playerCount);
    this.currentPlayer = this.firstPlayer;
    this.factoryCount = playerCount * 2 + 1;
    this.factories = [];
    this.factoriesTileCoordinates = [];
    this.factoryTileSelected = [];
    for (let i = 0; i < this.factoryCount; i++) {
      this.factories[i] = [];
      this.factoriesTileCoordinates[i] = [];
      this.factoryTileSelected[i] = [false, false, false, false];
    }
    this.satchel = [20, 20, 20, 20, 20];
    this.discardYard = [0];
    this.discardSelected = [0];
    this.lid = [0, 0, 0, 0, 0];
    this.tiles = [];
    this.tiles.push(new Tile(1));
    this.tiles.push(new Tile(2));
    this.tiles.push(new Tile(3));
    this.tiles.push(new Tile(4));
    this.tiles.push(new Tile(5));
    this.selectedTile = {};
    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      this.players.push(
        new Player(playerNames[i].value || 'Player ' + (i + 1), i + 1)
      );
    }
    this.roundProgress = 0;
    this.clickX = 0;
    this.clickY = 0;
    this.endGame = false;
  }

  setFactoryTileCoordinates() {
    const startFactoriesX = canvasWidth / 2 - 24 * 2 - 75 * 5;
    const startFactoriesY = 0;
    const tileHeight = 50;
    const tileWidth = 50;
    for (let factory = 0; factory < this.factoryCount; factory++) {
      const currentFactoryX = startFactoriesX + (150 + 24) * factory;
      const currentFactoryY = startFactoriesY;
      this.factoriesTileCoordinates[factory].push({
        x: currentFactoryX + 75 - 54,
        y: currentFactoryY + 75 - 54,
        dx: currentFactoryX + 75 - 54 + tileWidth,
        dy: currentFactoryY + 75 - 54 + tileHeight
      });
      this.factoriesTileCoordinates[factory].push({
        x: currentFactoryX + 75 + 4,
        y: currentFactoryY + 75 - 54,
        dx: currentFactoryX + 75 + 4 + tileWidth,
        dy: currentFactoryY + 75 - 54 + tileHeight
      });
      this.factoriesTileCoordinates[factory].push({
        x: currentFactoryX + 75 - 54,
        y: currentFactoryY + 75 + 4,
        dx: currentFactoryX + 75 - 54 + tileWidth,
        dy: currentFactoryY + 75 + 4 + tileHeight
      });
      this.factoriesTileCoordinates[factory].push({
        x: currentFactoryX + 75 + 4,
        y: currentFactoryY + 75 + 4,
        dx: currentFactoryX + 75 + 4 + tileWidth,
        dy: currentFactoryY + 75 + 4 + tileHeight
      });
    }
  }

  drawYard() {
    const startingX =
      canvasWidth / 2 - ((50 + 8) * this.discardYard.length) / 2;
    const startingY = 150 + 24;
    for (let tile = 0; tile < this.discardYard.length; tile++) {
      if (this.discardSelected[tile] === 1) {
        ctx.fillStyle = 'red';
        ctx.fillRect(startingX + tile * (50 + 8) - 2, startingY - 2, 54, 54);
      }
      ctx.drawImage(
        tileImage,
        this.discardYard[tile] * 50,
        0,
        50,
        50,
        startingX + tile * (50 + 8),
        startingY,
        50,
        50
      );
    }
  }

  drawFactories() {
    for (let factory = 0; factory < this.factoryCount; factory++) {
      const startFactories = canvasWidth / 2 - 24 * 2 - 75 * 5;
      const currentFactoryX = startFactories + (150 + 24) * factory;
      const currentFactoryY = 0;
      ctx.drawImage(factoryImage, currentFactoryX, currentFactoryY, 150, 150);
      if (this.factories[factory].length > 0) {
        for (let i = 0; i < 4; i++) {
          if (this.factoryTileSelected[factory][i]) {
            ctx.fillStyle = 'red';
            ctx.fillRect(
              this.factoriesTileCoordinates[factory][i].x - 2,
              this.factoriesTileCoordinates[factory][i].y - 2,
              54,
              54
            );
          }
        }
        ctx.drawImage(
          tileImage,
          this.factories[factory][0] * 50,
          0,
          50,
          50,
          this.factoriesTileCoordinates[factory][0].x,
          this.factoriesTileCoordinates[factory][0].y,
          50,
          50
        );
        ctx.drawImage(
          tileImage,
          this.factories[factory][1] * 50,
          0,
          50,
          50,
          this.factoriesTileCoordinates[factory][1].x,
          this.factoriesTileCoordinates[factory][1].y,
          50,
          50
        );
        ctx.drawImage(
          tileImage,
          this.factories[factory][2] * 50,
          0,
          50,
          50,
          this.factoriesTileCoordinates[factory][2].x,
          this.factoriesTileCoordinates[factory][2].y,
          50,
          50
        );
        ctx.drawImage(
          tileImage,
          this.factories[factory][3] * 50,
          0,
          50,
          50,
          this.factoriesTileCoordinates[factory][3].x,
          this.factoriesTileCoordinates[factory][3].y,
          50,
          50
        );
      }
    }
  }

  supplyFactories() {
    if (
      this.satchel.reduce((acc, val) => acc + val, 0) <
      this.factoryCount * 4
    ) {
      for (let tileTypes = 0; tileTypes < this.factoryCount; tileTypes++) {
        this.satchel[tileTypes] += this.lid[tileTypes];
        this.lid[tileTypes] = 0;
      }
    }
    for (let factory = 0; factory < this.factoryCount; factory++) {
      for (let placeInFactory = 0; placeInFactory < 4; placeInFactory++) {
        const randomPiece = Math.floor(
          Math.random() * this.satchel.reduce((acc, val) => acc + val, 0)
        );
        switch (true) {
          case randomPiece <= this.satchel[0]:
            this.satchel[0]--;
            this.factories[factory].push(this.tiles[0].id);
            break;
          case randomPiece <=
            this.satchel.slice(0, 2).reduce((acc, val) => acc + val, 0):
            this.satchel[1]--;
            this.factories[factory].push(this.tiles[1].id);
            break;
          case randomPiece <=
            this.satchel.slice(0, 3).reduce((acc, val) => acc + val, 0):
            this.satchel[2]--;
            this.factories[factory].push(this.tiles[2].id);
            break;
          case randomPiece <=
            this.satchel.slice(0, 4).reduce((acc, val) => acc + val, 0):
            this.satchel[3]--;
            this.factories[factory].push(this.tiles[3].id);
            break;
          case randomPiece <=
            this.satchel.slice(0, 5).reduce((acc, val) => acc + val, 0):
            this.satchel[4]--;
            this.factories[factory].push(this.tiles[4].id);
            break;
        }
      }
    }
  }

  pickTile() {
    window.addEventListener('click', (event) => {
      if (event.layerY < 334) {
        for (let i = 0; i < this.factoryCount; i++) {
          this.factoryTileSelected[i] = [false, false, false, false];
        }
        for (let i = 0; i < this.discardYard.length; i++) {
          this.discardSelected[i] = 0;
        }
        this.selectedTile.color = 0;
        this.selectedTile.factory = undefined;
        this.selectedTile.amount = 0;
        this.selectedTile.firstMarker = false;

        if (event.layerY > 150) {
          //Check Tiles in Yard
          const xStartYard =
            canvasWidth / 2 - ((50 + 8) * this.discardYard.length) / 2;
          const yStartYard = 150 + 24;
          for (let tile = 0; tile < this.discardYard.length; tile++) {
            if (
              event.layerX > xStartYard + tile * (50 + 8) &&
              event.layerX < xStartYard + tile * (50 + 8) + 50 &&
              event.layerY > yStartYard &&
              event.layerY < yStartYard + 50 &&
              this.discardYard[tile] !== 0
            ) {
              console.log(`Tile #${tile} from the yard has been clicked.`);
              this.selectedTile.color = this.discardYard[tile];
              for (let i = 0; i < this.discardYard.length; i++) {
                if (
                  this.discardYard[i] === this.selectedTile.color ||
                  this.discardYard[i] === 0
                ) {
                  this.discardSelected[i] = 1;
                  if (this.discardYard[i] === 0) {
                    this.selectedTile.firstMarker = true;
                  } else {
                    this.selectedTile.amount++;
                  }
                }
              }
            }
          }
        } else {
          //Check Tiles in Factories
          for (let factory = 0; factory < this.factoryCount; factory++) {
            for (let i = 0; i < 4; i++) {
              if (
                event.layerX > this.factoriesTileCoordinates[factory][i].x &&
                event.layerX < this.factoriesTileCoordinates[factory][i].dx &&
                event.layerY > this.factoriesTileCoordinates[factory][i].y &&
                event.layerY < this.factoriesTileCoordinates[factory][i].dy
              ) {
                this.factoryTileSelected[factory][i] = true;
                this.selectedTile.factory = factory;
                this.selectedTile.color = this.factories[factory][i];
                this.selectedTile.amount = 0;
                if (this.factoryTileSelected[factory][i]) {
                  for (let j = 0; j < 4; j++) {
                    if (
                      this.factories[factory][i] === this.factories[factory][j]
                    ) {
                      this.factoryTileSelected[factory][j] = true;
                      this.selectedTile.amount++;
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  pickTrack(active) {
    window.addEventListener('click', (event) => {
      if (
        event.layerX > playerDrawCoord[active].x &&
        event.layerX < playerDrawCoord[active].x + 406 &&
        event.layerY > playerDrawCoord[active].y + 298 &&
        event.layerY < playerDrawCoord[active].y + 298 + 58 &&
        this.selectedTile.color !== 0
      ) {
        console.log('Penalty line has been clicked.');
        if (this.selectedTile.firstMarker === true) {
          this.players[active].penaltyLine.push(0);
          this.selectedTile.firstMarker = false;
        }
        for (let tile = 0; tile < this.selectedTile.amount; tile++) {
          this.players[active].penaltyLine.push(this.selectedTile.color);
        }
        this.emptyFactory();
        this.switchPlayer();
      } else {
        for (let track = 0; track < 5; track++) {
          if (
            event.layerX > playerDrawCoord[active].x + 290 &&
            event.layerX <
              playerDrawCoord[active].x + 290 + (track + 1) * (50 + 8) &&
            event.layerY > playerDrawCoord[active].y + track * (50 + 8) &&
            event.layerY < playerDrawCoord[active].y + (track + 1) * (50 + 8) &&
            this.selectedTile.color !== 0 &&
            this.players[active].storage[track].available === true
          ) {
            console.log(`Track #${track} has been clicked.`);
            for (let i = 0; i < 5; i++) {
              this.players[active].storage[i].available = false;
            }
            if (this.selectedTile.firstMarker === true) {
              this.players[active].penaltyLine.push(0);
              this.selectedTile.firstMarker = false;
            }
            let availableSlots =
              this.players[active].storage[track].maxSlots -
              this.players[active].storage[track].usedSlots;
            if (this.selectedTile.amount <= availableSlots) {
              this.players[active].storage[
                track
              ].usedSlots += this.selectedTile.amount;
            } else {
              this.selectedTile.amount -= availableSlots;
              this.players[active].storage[track].usedSlots = this.players[
                active
              ].storage[track].maxSlots;
              for (
                let extraTiles = 0;
                extraTiles < this.selectedTile.amount;
                extraTiles++
              ) {
                this.players[active].penaltyLine.push(this.selectedTile.color);
              }
            }
            this.players[active].storage[
              track
            ].tileID = this.selectedTile.color;

            this.emptyFactory();
            this.switchPlayer();
          }
        }
      }
    });
  }
  emptyFactory() {
    if (this.selectedTile.factory !== undefined) {
      for (let tile = 0; tile < 4; tile++) {
        if (
          this.factoryTileSelected[this.selectedTile.factory][tile] === false
        ) {
          this.discardYard.push(
            this.factories[this.selectedTile.factory][tile]
          );
        }
      }
      this.factories[this.selectedTile.factory] = [];
    } else {
      for (let i = this.discardYard.length; i >= 0; i--) {
        if (this.discardSelected[i] === 1) {
          this.discardYard.splice(i, 1);
          this.discardSelected.splice(i, 1);
        }
      }
    }

    this.selectedTile.factory = undefined;
    this.selectedTile.color = 0;
    this.selectedTile.amount = 0;
    this.selectedTile.firstMarker = false;
    this.factoryTileSelected[this.selectedTile.factory] = [
      false,
      false,
      false,
      false
    ];
  }
  switchPlayer() {
    if (this.currentPlayer === this.playerCount - 1) {
      this.currentPlayer = 0;
    } else {
      this.currentPlayer++;
    }
    this.pickTrack(this.currentPlayer);
  }

  tilesNotInPlay() {
    let tiles = 0;
    for (let factory = 0; factory < this.factoryCount; factory++) {
      tiles += this.factories[factory].reduce((a, b) => a + b, 0);
    }
    tiles += this.discardYard.length;
    if (tiles > 0) {
      return false;
    } else {
      return true;
    }
  }

  scoring() {
    for (let player = 0; player < this.playerCount; player++) {
      for (let track = 0; track < 5; track++) {
        if (
          this.players[player].storage[track].maxSlots ===
          this.players[player].storage[track].usedSlots
        ) {
          if (this.players[player].storage[track].maxSlots !== 1) {
            this.lid[this.players[player].storage[track].tileID - 1] +=
              this.players[player].storage[track].maxSlots - 1;
          }

          let wallIndex = this.players[player].wallIDs[track].indexOf(
            this.players[player].storage[track].tileID
          );
          this.players[player].wallFill[track][wallIndex] = 1;

          let roundScoreRow = 0;
          let scoreStartCol = wallIndex;
          do {
            roundScoreRow += 1;
            scoreStartCol++;
          } while (
            this.players[player].wallFill[track][scoreStartCol] === 1 &&
            scoreStartCol < 5
          );
          scoreStartCol = wallIndex - 1;
          while (
            this.players[player].wallFill[track][scoreStartCol] === 1 &&
            scoreStartCol >= 0
          ) {
            roundScoreRow += 1;
            scoreStartCol--;
          }
          if (roundScoreRow === 5) {
            roundScoreRow += 2;

            //Checks for endgame conditions
            if (track < 2) {
              this.players[player].lowerEndside = 1;
            } else if (track === 2) {
              this.players[player].midEndside = 1;
            } else {
              this.players[player].upperEndside = 1;
            }
            if (
              this.players[player].lowerEndside +
                this.players[player].midEndside +
                this.players[player].upperEndside >
              0
            ) {
              this.endGame = true;
            }
          }

          let roundScoreCol = 0;
          let scoreStartRow = track;
          for (let i = scoreStartRow; i < 5; i++) {
            if (this.players[player].wallFill[i][wallIndex] === 1) {
              roundScoreCol++;
            } else {
              i = 5;
            }
          }
          if (track > 0) {
            scoreStartRow = track - 1;
            for (let i = scoreStartRow; i > -1; i--) {
              if (this.players[player].wallFill[i][wallIndex] === 1) {
                roundScoreCol++;
              } else {
                i = -1;
              }
            }
          }
          //Adding Column Bonus
          if (roundScoreCol === 5) {
            roundScoreRow += 7;
          }
          roundScoreCol--;

          //Adding Bonus for filling all tiles of the same color
          let colorID = this.players[player].storage[track].tileID;
          let roundScoreAll = 0;
          for (let i = 0; i < 5; i++) {
            roundScoreAll += this.players[player].wallFill[i][
              this.players[player].wallIDs[i].indexOf(colorID)
            ];
          }
          if (roundScoreAll === 5) {
            roundScoreAll = 12;
          } else {
            roundScoreAll = 0;
          }
          this.players[player].score +=
            roundScoreRow + roundScoreCol + roundScoreAll;
          this.players[player].storage[track].usedSlots = 0;
          this.players[player].storage[track].tileID = 0;
          console.log(
            this.players[player].name,
            roundScoreRow,
            roundScoreCol,
            roundScoreAll
          );
        }
      } //Calculating penalties
      if (this.players[player].penaltyLine.length > 0) {
        let penaltyTiles = this.players[player].penaltyLine.length;
        let totalPenalty = 0;
        for (let tile = 0; tile < penaltyTiles; tile++) {
          totalPenalty += this.players[player].penaltyValues[tile];
          let penaltyLineTileColor = this.players[player].penaltyLine[tile];
          console.log(penaltyLineTileColor);
          if (penaltyLineTileColor === 0) {
            this.discardYard = [0];
            this.firstPlayer = player;
            console.log(this.firstPlayer, player);
          } else {
            this.lid[penaltyLineTileColor - 1]++;
          }
        }
        this.players[player].penaltyLine = [];
        console.log(this.players[player].name, totalPenalty);
        if (totalPenalty > this.players[player].score) {
          this.players[player].score = 0;
        } else {
          this.players[player].score -= totalPenalty;
        }
      }
    }
  }

  endScreen() {
    console.log('The game ends');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = '3rem "Carter One"';
    ctx.fillStyle = 'gainsboro';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(`Well done!`, canvasWidth / 2, canvasHeight / 4);
    const playerScores = [];
    for (let i = 0; i < this.playerCount; i++) {
      playerScores.push(this.players[i].score);
    }
    const winnerScore = Math.max(...playerScores);
    const winnerIdx = [];
    for (let i = 0; i < this.playerCount; i++) {
      if (this.players[i].score === winnerScore) {
        winnerIdx.push(i);
      }
    }
    ctx.font = '1.5rem "Carter One"';
    if (winnerIdx.length === 1) {
      ctx.fillText(
        `${this.players[winnerIdx].name} won with ${winnerScore} points.`,
        canvasWidth / 2,
        canvasHeight / 4 + 50
      );
    } else {
      ctx.fillText(
        `Both players won with ${winnerScore} points.`,
        canvasWidth / 2,
        canvasHeight / 4 + 50
      );
    }
  }

  playRound() {
    if (this.roundProgress === 0) {
      this.supplyFactories();
      this.currentPlayer = this.firstPlayer;
      this.roundProgress++;
    }
    if (this.roundProgress === 1) {
      this.pickTile();
      this.pickTrack(this.currentPlayer);
      this.roundProgress++;
    }
    if (this.roundProgress === 2 && this.tilesNotInPlay()) {
      this.scoring();
      this.roundProgress = 0;
    }
  }

  loop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.drawFactories();
    this.drawYard();
    for (let noOfPlayers = 0; noOfPlayers < this.playerCount; noOfPlayers++) {
      ctx.save();
      ctx.translate(
        playerDrawCoord[noOfPlayers].x,
        playerDrawCoord[noOfPlayers].y
      );
      if (noOfPlayers === this.currentPlayer) {
        this.players[this.currentPlayer].drawAsActive();
        this.players[this.currentPlayer].drawAvailableTrack(
          this.selectedTile.color
        );
      }
      this.players[noOfPlayers].draw();
      ctx.restore();
    }

    this.playRound();

    if (this.endGame === false) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      this.endScreen();
    }
  }
}
