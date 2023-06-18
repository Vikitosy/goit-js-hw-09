

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function setRandomHexColor() {
  const newColor = getRandomHexColor();
  bodyEl.style.backgroundColor = newColor;

  console.log(`newColor`);
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', () => {
  setRandomHexColor();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(setRandomHexColor, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  console.log(`Color stopped!`);
});
