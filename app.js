let bestOfGame = 0;
let playerChoice = '';
let computerChoice = '';
let computerScore = 0;
let playerScore = 0;

const selectOption = document.createElement('select');
const options = ['🪨', '📃', '✂️'];

const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'Select your weapon';
selectOption.appendChild(defaultOption);

options.forEach((optionText) => {
  const option = document.createElement('option');
  option.value = optionText;
  option.textContent = optionText;
  selectOption.appendChild(option);
});

const player = document.querySelector('.playerScore > p');
const computer = document.querySelector('.computerScore > p');
player.innerText = playerScore;
computer.innerText = computerScore;
const btnBox = document.querySelector('.btnBox');
const btnStart = document.querySelector('.btnStart');
const inputBestOf = document.createElement('input');

inputBestOf.type = 'number';
inputBestOf.id = 'bestOf';
inputBestOf.max = '10';
inputBestOf.min = '1';

const labelBestOf = document.createElement('label');
labelBestOf.setAttribute('for', 'bestOf');
labelBestOf.innerText = 'Best of?';

btnStart.addEventListener('click', () => {
  btnStart.remove();
  btnBox.appendChild(labelBestOf);
  btnBox.appendChild(inputBestOf);
  inputBestOf.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      bestOfGame = parseInt(inputBestOf.value.trim(), 10);
      if (isNaN(bestOfGame)) {
        alert('Use a whole number only');
        inputBestOf.value = '';
      } else if (bestOfGame < 1 || bestOfGame > 10) {
        alert('The maximum game is 10');
        inputBestOf.value = '';
      } else {
        inputBestOf.remove();
        labelBestOf.remove();
        const p = document.createElement('p');
        p.innerText = 'Pick your weapon';
        btnBox.appendChild(p);
        btnBox.appendChild(selectOption);
        selectOption.addEventListener('change', playGame);
      }
    }
  });
});

let currentRound = 1;

function playGame() {
  playerChoice = selectOption.value;
  if (playerChoice) {
    computerChoice = getComputerChoice();
    playRound(playerChoice, computerChoice);
    document.querySelector('.playerBox > p').innerText = playerChoice;
    document.querySelector('.computerBox > p').innerText = computerChoice;

    currentRound++;

    if (
      currentRound > bestOfGame ||
      playerScore > Math.floor(bestOfGame / 2) ||
      computerScore > Math.floor(bestOfGame / 2)
    ) {
      document.querySelector('.playerBox > p').innerText = playerChoice;
      document.querySelector('.computerBox > p').innerText = computerChoice;
      setTimeout(() => {
        endGame();
      }, 500);
    } else {
      selectOption.value = '';
    }
  }
}

function endGame() {
  if (playerScore > computerScore) {
    alert('You win the game!');
  } else if (computerScore > playerScore) {
    alert('Computer wins the game!');
  } else {
    alert("It's a tie!");
  }
  resetGame();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  player.innerText = playerScore;
  computer.innerText = computerScore;
  selectOption.value = '';
  setTimeout(() => {
    alert('The window will refresh after 2 seconds...');
    window.location.reload();
  }, 2000);
}

function getComputerChoice() {
  const rand = Math.floor(Math.random() * options.length);
  return options[rand];
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return;
  } else if (
    (playerChoice === '🪨' && computerChoice === '✂️') ||
    (playerChoice === '✂️' && computerChoice === '📃') ||
    (playerChoice === '📃' && computerChoice === '🪨')
  ) {
    playerScore++;
  } else {
    computerScore++;
  }

  player.innerText = playerScore;
  computer.innerText = computerScore;
}
