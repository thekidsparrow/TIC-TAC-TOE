
// Gets the first instance of <form> from the document.
const form = document.forms[0];
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');

let computerGoesFirst;
let computerSymbol;
let userSymbol;
let currentPlayer;
let userInputAccepted;
const gameState = []; // 8 positions, 0-8 = capacity of 9.

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
          changePlayer();
     }
     else {
          computerGoesFirst = false;
          computerSymbol = 'O';
          userSymbol = 'X';

          userInputAccepted = true;
     }
}

function clickPlayCell(event) {
     let cellId = event.target.id;

     if (userInputAccepted) {
          gameState[cellId] = userSymbol;
          document.getElementById(cellId).innerHTML = userSymbol;

          changePlayer();
     }
}

function computerPlayCell() {
     // Get a random cell ID between 0-8. This represents the array position.
     let randomCellId = Math.floor(Math.random() * 9);

     gameState[randomCellId] = computerSymbol;
     document.getElementById(randomCellId).innerHTML = computerSymbol;
}

function changePlayer() {
     // The current player is computer.
     // It is now user's turn. Enable input.
     if (currentPlayer === 0) {
          currentPlayer = 1;
          userInputAccepted = true;
     }
     // The current player is user.
     // It is now computer's turn. Disable input.
     else if (currentPlayer === 1) {
          currentPlayer = 0;
          userInputAccepted = false;
     }
}