'use strict';

class Game {
  constructor(playerCount) {
    //optimized for 2, 3 & 4
    this.playerCount = playerCount;
    this.firstPlayer = 0;
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
    this.yard = [0, 0, 0, 0, 0];
    this.lid = [0, 0, 0, 0, 0];
    this.tiles = [];
    this.tiles.push(new Tile(1));
    this.tiles.push(new Tile(2));
    this.tiles.push(new Tile(3));
    this.tiles.push(new Tile(4));
    this.tiles.push(new Tile(5));
    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      this.players.push(
        new Player(playerNames[i].value || 'Player ' + (i + 1))
      );
    }
    this.round = 0;
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
      }
      for (let factory = 0; factory < this.factoryCount; factory++) {
        for (let i = 0; i < 4; i++) {
          if (
            event.layerX > this.factoriesTileCoordinates[factory][i].x &&
            event.layerX < this.factoriesTileCoordinates[factory][i].dx &&
            event.layerY > this.factoriesTileCoordinates[factory][i].y &&
            event.layerY < this.factoriesTileCoordinates[factory][i].dy
          ) {
            this.factoryTileSelected[factory][i] = true;
            if (this.factoryTileSelected[factory][i]) {
              let highlightedTile = this.factories[factory][i];
              for (let j = 0; j < 4; j++) {
                if (this.factories[factory][i] === this.factories[factory][j]) {
                  this.factoryTileSelected[factory][j] = true;
                }
              }
            }
          }
        }
      }
    });
  }

  loop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    this.drawFactories();
    for (let noOfPlayers = 0; noOfPlayers < this.playerCount; noOfPlayers++) {
      ctx.save();
      ctx.translate(
        playerDrawCoord[noOfPlayers].x,
        playerDrawCoord[noOfPlayers].y
      );
      this.players[noOfPlayers].draw();
      if (noOfPlayers === this.currentPlayer) {
        ctx.fillRect(playerBoardImage.width - 50, 0, 50, 50);
      }
      ctx.restore();
    }

    window.requestAnimationFrame(() => {
      this.loop();
    });
  }
}
