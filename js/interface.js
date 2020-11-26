const canvasGame = document.querySelector('canvas');

const canvasWidth = canvasGame.width;
const canvasHeight = canvasGame.height;

const ctx = canvasGame.getContext('2d');

//Game Instance

const playerNames = [
  document.getElementById('nameone'),
  document.getElementById('nametwo'),
  document.getElementById('namethree'),
  document.getElementById('namefour')
];

let game;
const startTwoBtn = document.querySelector('.start-two-players');
const startThreeBtn = document.querySelector('.start-three-players');
const startFourBtn = document.querySelector('.start-four-players');
startTwoBtn.addEventListener('click', () => {
  game = new Game(2);
  game.setFactoryTileCoordinates();
  game.loop();
});
startThreeBtn.addEventListener('click', () => {
  game = new Game(3);
  game.setFactoryTileCoordinates();
  game.loop();
});
startFourBtn.addEventListener('click', () => {
  game = new Game(4);
  game.setFactoryTileCoordinates();
  game.loop();
});
