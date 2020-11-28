class Track {
  constructor(size) {
    this.maxSlots = size;
    this.usedSlots = 0;
    this.tileID = 0;
    this.available = false;
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

  drawPenaltyLine() {
    for (let i = 0; i < this.penaltyLine.length; i++) {
      ctx.drawImage(
        tileImage,
        this.penaltyLine[i] * 50,
        0,
        50,
        50,
        4 + (50 + 8) * i,
        (8 + 50) * 5 + 12,
        50,
        50
      );
    }
  }

  drawWorkers() {
    for (let track = 0; track < 5; track++) {
      for (let tile = 0; tile < this.storage[track].usedSlots; tile++) {
        ctx.drawImage(
          tileImage,
          this.storage[track].tileID * 50,
          0,
          50,
          50,
          290 + 4 + tile * (50 + 8),
          4 + track * (50 + 8),
          50,
          50
        );
      }
    }
  }

  draw() {
    ctx.drawImage(playerBoardImage, 0, 0);
    this.drawPenaltyLine();
    this.drawWorkers();
  }

  drawAvailableTrack(color) {
    this.checkAvailableTrack(color);
    for (let i = 0; i < 5; i++) {
      if (this.storage[i].available) {
        ctx.fillStyle = 'green';
        ctx.fillRect(290, i * (50 + 8), (i + 1) * (50 + 8), 50 + 8);
      }
    }
  }

  checkAvailableTrack(color) {
    for (let i = 0; i < 5; i++) {
      if (
        this.storage[i].usedSlots < this.storage[i].maxSlots &&
        (this.storage[i].tileID === 0 || this.storage[i].tileID === color) &&
        this.wallFill[i][this.wallIDs[i].indexOf(color)] === 0
      ) {
        this.storage[i].available = true;
      } else {
        this.storage[i].available = false;
      }
    }
  }
}
