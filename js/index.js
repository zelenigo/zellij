'use strict';

class Game {
  constructor(playerCount) {
    //optimized for 2, 3 & 4
    this.playerCount = playerCount;
    this.factoryCount = playerCount * 2 + 1;
    this.factories = [];
    for (let i = 0; i < this.factoryCount; i++) {
      this.factories[i] = [];
    }
    this.satchel = [20, 20, 20, 20, 20];
    this.yard = [0, 0, 0, 0, 0];
    this.lid = [0, 0, 0, 0, 0];
    this.tiles = [];
    this.tiles.push(new Tile(1, 'green', 'images/green.png'));
    this.tiles.push(new Tile(2, 'blue', 'images/blue.png'));
    this.tiles.push(new Tile(3, 'yellow', 'images/yellow.png'));
    this.tiles.push(new Tile(4, 'orange', 'images/orange.png'));
    this.tiles.push(new Tile(5, 'brown', 'images/brown.png'));
    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player('Player' + 1));
    }
  }

  fill;
}

class Tile {
  constructor(id, color, image) {
    this.id = id;
    this.color = color;
    this.count = 20;
    this.pattern = image;
  }
}

class Track {
  constructor(size) {
    this.maxSlots = size;
    this.usedSlots = 0;
    this.tileID = 0;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.storage = [];
    for (let i = 0; i < 5; i++) {
      this.storage.push(new Track(i + 1));
    }
    this.penaltyLine = [];
    this.wall = [
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5]
      ],
      [
        [0, 5],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4]
      ],
      [
        [0, 4],
        [0, 5],
        [0, 1],
        [0, 2],
        [0, 3]
      ],
      [
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 1],
        [0, 2]
      ],
      [
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 1]
      ]
    ];
  }
}

const game = new Game(2);
