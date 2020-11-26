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
