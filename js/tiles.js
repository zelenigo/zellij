const tileImage = new Image();
tileImage.src = 'images/tiles.png';

const factoryImage = new Image();
factoryImage.src = 'images/factory.png';

class Tile {
  constructor(id, color, image) {
    this.id = id;
    this.color = color;
    this.count = 20;
    this.pattern = image;
  }
}
