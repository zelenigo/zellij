class Track {
  constructor(size) {
    this.maxSlots = size;
    this.usedSlots = 0;
    this.tileID = 0;
  }
}

const playerBoardImage = new Image();
playerBoardImage.src = 'images/player-board.png';

const playerDrawCoord = [
  { x: canvasWidth / 2 - 576 - 64, y: 334 },
  { x: canvasWidth / 2 + 64, y: 334 },
  { x: canvasWidth / 2 - 576 - 64, y: 720 },
  { x: canvasWidth / 2 + 64, y: 720 }
];

// playerBoardImage.addEventListener('load', () => {});

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.storage = [];
    for (let i = 0; i < 5; i++) {
      this.storage.push(new Track(i + 1));
    }
    this.penaltyLine = [];
    this.wallIDs = [
      [1, 2, 3, 4, 5],
      [5, 1, 2, 3, 4],
      [4, 5, 1, 2, 3],
      [3, 4, 5, 1, 2],
      [2, 3, 4, 5, 1]
    ];
    this.wallFill = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  }

  draw() {
    ctx.drawImage(playerBoardImage, 0, 0);
  }
}
