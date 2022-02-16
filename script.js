'use strict';

const screen1 = document.querySelector('.screen1');
const firstNumber = document.querySelector('#first-number');
const secondNumber = document.querySelector('#second-number');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const bgColor = document.querySelector('body');
const highscoreBlock = document.querySelector('.highscore');
const scoreBlock = document.querySelector('.score');
const betweenTitle = document.querySelector('.between');
// BTNs
const startBtn = document.querySelector('.startScreenBtn');
const okBtn = document.querySelector('.btn-ok');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const resetBtn = document.querySelector('.reset');

const checkbox = document.querySelector('input[name=theme]');

let highscore = 0;
let randomNumber;
let score;

// FUNCTIONS
const resetGame = () => window.location.reload();

const randomNumberFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const displayMessage = (displayMessage) => message.textContent = displayMessage;

const trans = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 1000);
};

// Event Listeners
// Accept numbers -> Show StartBtn
okBtn.addEventListener('click', function () {
  if (firstNumber.value !== '' && secondNumber.value !== '') {
    startBtn.style.display = 'block';
    randomNumber = randomNumberFromInterval(+firstNumber.value, +secondNumber.value);
    score = +secondNumber.value - firstNumber.value + 1;
  
    scoreBlock.textContent = score;
    betweenTitle.textContent = `(Between ${+firstNumber.value} and ${+secondNumber.value})`;

    okBtn.style.opacity = 0;
  }
});

// Start Btn
startBtn.addEventListener('click', function(e) {
  e.preventDefault();
  screen1.classList.add('up');
});

// Check the guess
checkBtn.addEventListener('click', function() {
  const guess = +document.querySelector('.guess').value;
  
  // When there is no input
  if (!guess) {
    displayMessage('⛔ No number!');

  // When player wins
  } else if (guess === randomNumber) {
    displayMessage('🎉 Correct Number!');
    number.textContent = randomNumber;

    bgColor.style.backgroundColor = '#60b347';
    number.style.width = '30rem';
    againBtn.style.display = 'block';

    // Highscore func
    if (score > highscore) {
      highscore = score;
      highscoreBlock.textContent = highscore; 
    }
  
  // When guess is wrong
  } else if (guess !== randomNumber) {
    if (score > 1) {
      displayMessage(guess > randomNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreBlock.textContent = score;
    } else {
      displayMessage('💣 You lost the game!');
      scoreBlock.textContent = 0;
    }
  }
});

// Restart game 
againBtn.addEventListener('click', function() {
  randomNumber = randomNumberFromInterval(+firstNumber.value, +secondNumber.value);
  score = +secondNumber.value - firstNumber.value + 1;

  bgColor.style.backgroundColor = 'var(--bg-color)';
  bgColor.style.color = 'var(--text-color)';
  number.style.width = '15rem';
  againBtn.style.display = 'none';
  
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  scoreBlock.textContent = score;
  number.textContent = '?';
});

// Reset game
resetBtn.addEventListener('click', resetGame);

// Theme toggle
checkbox.addEventListener('change', function() {
  if(this.checked) {
    trans();
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    trans();
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});