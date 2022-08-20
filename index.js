// Instructions:
// TIC-TAC-TOE
// As users playing a two player game we want to:
// enter our names and have them displayed -done
// have our order chosen for us by the game -done
// take turns placing our marks in empty spaces
// not be able to place our marks in an occupied space
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser

// As a user playing a one player game I want to:
// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space

// As a user playing a single player game I would be delighted to:
// have the Computer make 'better-than-guessing' choices when placing a mark on the board
// set the board size myself ("wider" or "taller" than 3x3)

// Gets the first instance of <form> from the document.
const form = document.forms[0];
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');

let computerGoesFirst;
let computerSymbol;
let userSymbol;
let currentPlayer;
let userInputAccepted;
const gameData = []; // 8 positions, 0-8 = capacity of 9.

// When this form posts, we do this.
form.addEventListener('submit', onSubmit);

// For each instance of class="cell", add an event listener that fires clickPlayCell() on click.
cells.forEach(x => x.addEventListener('click', clickPlayCell));

function onSubmit(event) {
     // Stops the form from posting/sending data to another page.
     event.preventDefault();

     // Get the name the user put inside of the text box.
     let inputName = form.elements['Name'].value;
     message.innerHTML = `Hello, ${inputName}. Welcome to Tic-tac-toe.`;

     // Math.Random() generates a number 0.00 - 1.00.
     // Math.Round() rounds that decimal to either 0 or 1.
     let randomNumber = Math.round(Math.random());

     // 0 represents the computer's turn,
     // 1 represents the user's turn.
     currentPlayer = randomNumber;

     // If the random number is 0, computer goes first.
     if (randomNumber === 0) {
          computerGoesFirst = true;
          computerSymbol = 'X';
          userSymbol = 'O';

          computerPlayCell();
     }
     else {
          computerGoesFirst = false;
          computerSymbol = 'O';
          userSymbol = 'X';
     }
}

function clickPlayCell(event) {
     let cellId = event.target.id;

     if (gameData[cellId] === undefined && currentPlayer === 1) {
          gameData[cellId] = userSymbol;
          document.getElementById(cellId).innerHTML = userSymbol;

          changePlayer();
          computerPlayCell();
     }
}

function computerPlayCell() {
     while (true) {
          // Get a random cell ID between 0-8. This represents the array position.
          let randomCellId = Math.floor(Math.random() * 9);

          // If the array index of the randomly generated cell ID is undefined,
          // set the gameState and break out of the loop.
          if (gameData[randomCellId] === undefined && currentPlayer === 0) {
               gameData[randomCellId] = computerSymbol;
               document.getElementById(randomCellId).innerHTML = computerSymbol;
               break;
          }
     }

     changePlayer();
}

function changePlayer() {
     // The current player is computer.
     // It is now user's turn. Enable input.
     if (currentPlayer === 0) {
          currentPlayer = 1;
          return;
     }

     // The current player is user.
     // It is now computer's turn. Disable input.
     if (currentPlayer === 1) {
          currentPlayer = 0;
          return;
     }
}