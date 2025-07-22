const table = document.querySelector("table");
const box = document.querySelectorAll(".box");
const indicator = document.getElementById("indicator");
const title = document.getElementById("title");

const winningCombi = [
  //Horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  //vertical
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  //diagonal
  [1, 5, 9],
  [3, 5, 7],
];

const playerInput = {
  one: [],
  two: [],
};

const player = {
  one: "x",
  two: "o",
};

let correctNums = [];
let currentPlayer = player.one;
let totalMoveCount = 0;

function clickedBox(boxNum) {
  //check if box is not yet clicked
  if (!box[boxNum - 1].classList.contains("disabled")) {
    totalMoveCount++;
    changeStyle(boxNum);

    updatePlayerState(boxNum);

    checkWinner();

    //disable box after being clicked
    box[boxNum - 1].classList.add("disabled");
  }
}

function updatePlayerState(inputNum) {
  if (currentPlayer === player.one) {
    playerInput.one.push(inputNum);
    currentPlayer = player.two;
  } else {
    playerInput.two.push(inputNum);
    currentPlayer = player.one;
  }
}

function changeStyle(boxIndex) {
  if (currentPlayer === player.one) {
    box[boxIndex - 1].style.backgroundColor = "red";
    box[boxIndex - 1].textContent = "X";
    indicator.textContent = "O's turn to play!";
  } else {
    box[boxIndex - 1].style.backgroundColor = "blue";
    box[boxIndex - 1].textContent = "O";
    indicator.textContent = "X's turn to play!";
  }
}

function checkCorrectInput(playerInput) {
  for (let combi of winningCombi) {
    let isWinning = true;

    for (let num of combi) {
      if (!playerInput.includes(num)) {
        isWinning = false;
        break;
      }
      correctNums.push(num);
    }

    if (isWinning) return isWinning;
    correctNums = [];
  }

  return false;
}

function checkWinner() {
  if (playerInput.one.length >= 3 && checkCorrectInput(playerInput.one)) {
    displayWinnerText("X");
    disableAllBox();
    showWinningBox();
    return;
  }

  if (playerInput.two.length >= 3 && checkCorrectInput(playerInput.two)) {
    displayWinnerText("O");
    disableAllBox();
    showWinningBox();
    return;
  }

  if (
    totalMoveCount === 9 &&
    !checkCorrectInput(playerInput.one) &&
    !checkCorrectInput(playerInput.two)
  ) {
    displayDrawText();
    disableAllBox();
  }
}

function displayWinnerText(winner) {
  title.textContent = `Player ${winner} is the Winner!`;
  indicator.textContent = "Well played :)";
}

function displayDrawText() {
  title.textContent = `DRAW!`;
  indicator.textContent = "Good game!";
}

function disableAllBox() {
  box.forEach((b) => b.classList.add("disabled"));
}

function showWinningBox() {
  correctNums.forEach((correctNum) => {
    box[correctNum - 1].style.backgroundColor = "green";
  });
}
