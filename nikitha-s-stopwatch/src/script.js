const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');
const outerCircle = document.getElementById('outer-circle');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let laps = [];
let running = false;

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
  const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    outerCircle.classList.add('pulsing');
  }
}

function pause() {
  if (running) {
    clearInterval(intervalId);
    running = false;
    outerCircle.classList.remove('pulsing');
  }
}

function reset() {
  clearInterval(intervalId);
  running = false;
  elapsedTime = 0;
  laps = [];
  updateDisplay();
  lapsList.innerHTML = '';
  outerCircle.classList.remove('pulsing');
}

function lap() {
  if (running) {
    const lapTime = elapsedTime - (laps.length > 0 ? laps[laps.length - 1] : 0);
    laps.push(elapsedTime);
    const listItem = document.createElement('li');
    listItem.textContent = `${formatTime(lapTime)} (Total: ${formatTime(elapsedTime)})`;
    lapsList.appendChild(listItem);
  }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

updateDisplay();
