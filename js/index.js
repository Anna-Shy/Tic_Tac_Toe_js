const statusDisplay = document.querySelector('.game__status');
const userXEL = document.getElementById('userX-score');
const userOEL = document.getElementById('userO-score');

let userXScore = 0;
let userOScore = 0;
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellPlayed = (cell, cellIndex) => {
  gameState[cellIndex] = currentPlayer;
  cell.innerHTML = currentPlayer;
};

const playerChange = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
};

const resultValidation = () => {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const condition = winConditions[i];
    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer} won!`;
    
    if (currentPlayer === 'X') {
      userXScore++;
      userXEL.innerHTML = userXScore;
    } else {
      userOScore++;
      userOEL.innerHTML = userOScore;
    }
    
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = `Draw!`;
    gameActive = false;
    return;
  }

  playerChange();
};

const cellClick = (cellEvent) => {
  const cell = cellEvent.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  cellPlayed(cell, cellIndex);
  resultValidation();
};

const restartGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  document.querySelectorAll('.game__cell').forEach((cell) => {
    cell.innerHTML = '';
  });
};

const clearGame = () => {
  userXScore = 0;
  userOScore = 0;
  userXEL.innerHTML = userXScore;
  userOEL.innerHTML = userOScore;
  restartGame();
};

document
  .querySelectorAll('.game__cell')
  .forEach((cell) => cell.addEventListener('click', cellClick));
document
  .querySelector('.game__btn-restart')
  .addEventListener('click', restartGame);
document.querySelector('.game__btn-clear').addEventListener('click', clearGame);
