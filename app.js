const options = ['rock', 'paper', 'scissor'];

function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return options[rand];
}

function getHumanChoice() {
  const input = prompt('Choose "Rock", "Paper", or "Scissor": ');

  if (input === null) {
    alert('You cancelled the game');
    return null;
  }

  const trimmedInput = input.trim().toLowerCase();

  if (options.includes(trimmedInput)) {
    return trimmedInput;
  } else {
    alert(
      `${
        trimmedInput === ''
          ? 'Empty or blank space is not a valid value'
          : `${trimmedInput} is not a valid value`
      }.\n\tUse only "Rock", "Paper", or "Scissor"`
    );
  }
}

let computerScore = 0;
let humanScore = 0;

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return;
  } else if (humanChoice === 'paper' && computerChoice === 'rock') {
    humanScore++;
  } else if (humanChoice === 'rock' && computerChoice === 'scissor') {
    humanScore++;
  } else if (humanChoice === 'scissor' && computerChoice === 'paper') {
    humanScore++;
  } else {
    computerScore++;
  }
}

function playGame(numberOfGames = 5) {
  numberOfGames = prompt('Best of? ');
  if (isNaN(+numberOfGames) || +numberOfGames <= 0) {
    alert('Invalid value, please try again! Use number only, and more than 0');
    return;
  }

  numberOfGames = +numberOfGames;

  for (let i = 1; i <= numberOfGames; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    if (humanSelection === null) {
      alert('You cancelled the game');
      break;
    }

    if (humanSelection === undefined) {
      alert(
        `${
          trimmedInput === ''
            ? 'Empty or blank space is not a valid value'
            : `${trimmedInput} is not a valid value`
        }.\n\tUse only "Rock", "Paper", or "Scissor"`
      );
      i--;
      continue;
    }

    playRound(humanSelection, computerSelection);

    alert(
      `Round ${i}: You chose ${humanSelection}, Computer chose ${computerSelection}\n\tScores:\n\tYou: ${humanScore},\n\tComputer: ${computerScore}`
    );
  }

  if (humanScore > computerScore) {
    return 'You win the game!';
  } else if (humanScore < computerScore) {
    return 'Computer wins the game!';
  } else {
    return 'The game is a tie!';
  }
}

const button = document.getElementById('btn');
button.addEventListener('click', (e) => {
  e.preventDefault();
  computerScore = 0;
  humanScore = 0;

  const result = playGame();
  if (computerScore !== 0 && humanScore !== 0) {
    alert(result);
  }
});
