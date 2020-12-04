const canvasGame = document.querySelector('canvas');

const canvasWidth = canvasGame.width;
const canvasHeight = canvasGame.height;

const ctx = canvasGame.getContext('2d');

//Game Instance

const playerNames = [
  document.getElementById('nameone'),
  document.getElementById('nametwo')
];

let game;
ctx.clearRect(0, 0, canvasWidth, canvasHeight);
ctx.font = '3rem "Carter One"';
ctx.fillStyle = 'gainsboro';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.fillText(
  `Start a new game to tile a wall!`,
  canvasWidth / 2,
  canvasHeight / 4
);
ctx.fillText(
  `Take turns to pick tiles from factories`,
  canvasWidth / 2,
  canvasHeight / 4 + 150
);
ctx.fillText(
  `and fill your tracks to`,
  canvasWidth / 2,
  canvasHeight / 4 + 225
);
ctx.fillText(
  `transfer them on the wall!`,
  canvasWidth / 2,
  canvasHeight / 4 + 300
);
const startTwoBtn = document.getElementById('create-new-game');
startTwoBtn.addEventListener('submit', (event) => {
  game = new Game(2);
  game.setFactoryTileCoordinates();
  game.loop();
  event.preventDefault();
});
