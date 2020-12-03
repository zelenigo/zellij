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
const startTwoBtn = document.getElementById('create-new-game');
startTwoBtn.addEventListener('submit', (event) => {
  game = new Game(2);
  game.setFactoryTileCoordinates();
  game.loop();
  event.preventDefault();
});
