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
  { x: canvasWidth / 2 - playerBoardImage.width - 64, y: 334 },
  { x: canvasWidth / 2 + 64, y: 334 },
  { x: canvasWidth / 2 - playerBoardImage.width - 64, y: 720 },
  { x: canvasWidth / 2 + 64, y: 720 }
];

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

  draw() {
    ctx.drawImage(playerBoardImage, 0, 0);
  }
}
