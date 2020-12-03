const helpOverlay = new Image();
helpOverlay.src = 'images/help-image.png';

const helpBtn = document.querySelector('.help');

let helpImage = false;

function drawHelp() {
  if (helpImage === true) {
    ctx.drawImage(helpOverlay, 15, 0);
  }
}

helpBtn.addEventListener('click', () => {
  if (helpImage === false) {
    helpImage = true;
  } else {
    helpImage = false;
  }
});
