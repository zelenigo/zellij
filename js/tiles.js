const tileImage = new Image();
tileImage.src = 'images/tiles.png';

const factoryImage = new Image();
factoryImage.src = 'images/factory.png';

class Tile {
  constructor(id) {
    this.id = id;
    this.count = 20;
  }
}
