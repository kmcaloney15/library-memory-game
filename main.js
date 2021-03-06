// ------------ Global Variables ---------------------------------------/
const gameboard = document.querySelector(".gameboard");
const playerLivesCount = document.querySelector("span");
const livesText = document.querySelector("lives");
const intro = document.querySelector(".intro");
const gameDiv = document.querySelector(".gameDiv");

//game buttons
const startButton = document.getElementById("startButton");
const instructionsButton = document.getElementById("instructions");
const closeButton = document.querySelector("#closeButton");
const reloadGame = document.querySelector("#restartButton");

//winning message
const winningMessage = document.querySelector(".winMessage");

//loosing message
const loosingMessage = document.querySelector(".loseMessage");

//audio file
const cellPhone = document.querySelector(".myAudio").volume = 0.1;

//
let playerLives = 10;
let matchedBookCount = 0;
let hasFlippedBook = false;
let firstFlip;
let secondFlip;
let clickLimit = false;
let booksArray = [];

//how many lives they start with
playerLivesCount.textContent = playerLives;

//list of all books included in game
booksArray.push({
  imgSrc: "img/eragon.jpeg",
  class: "eragon",
});
booksArray.push({
  imgSrc: "img/sidewalk.jpeg",
  class: "sidewalk",
});
booksArray.push({
  imgSrc: "img/rules-of-redemption.jpg",
  class: "rules",
});
booksArray.push({
  imgSrc: "img/lotr.jpeg",
  class: "lotr",
});
booksArray.push({
  imgSrc: "img/harry-potter.jpg",
  class: "hp",
});
booksArray.push({
  imgSrc: "img/bookshop-on-the-corner.jpeg",
  class: "bookshop",
});
booksArray.push({
  imgSrc: "img/pride-and-prejudice.jpeg",
  class: "pride",
});
booksArray.push({
  imgSrc: "img/clean-sweep.jpeg",
  class: "sweep",
});

//---------------- Calling Functions ----------------------------------/
let doubleBooks = [];

// startGame();
createsDoubleBooksArray(booksArray);
shuffleArray(doubleBooks);
printBooks();

//  -------------------------- Event Listeners -------------------------/
const books = document.querySelectorAll(".book");
//clicking on the books
books.forEach((book) => {
  book.addEventListener("click", flipBook);
});

startButton.addEventListener("click", startGame);
reloadGame.addEventListener('click', restartGame);

//---------------------- FUNCTIONS ------------------------------------/

//to run the start game page and instructions
function startGame() {
  intro.style.display = "none";
  gameDiv.style.display = "block";
}

function flipBook() {
  //if clickLimit = true then the player won't be able to keep clicking on the board.
  if (clickLimit == true) {
    return;
  }
  //disables player from clicking the same book twice in a row
  if (this === firstFlip) {
    return;
  }
  //console.log(clickLimit);

  this.classList.add("flip");

  //if hasFlippedBook is false - then it's the first time a player has clicked the book
  if (hasFlippedBook === false) {
    //first click
    hasFlippedBook = true;
    firstFlip = this;
  } else {
    hasFlippedBook = false;
    secondFlip = this;

    // look for matching books
    //if match
    checkMatch();
  }
}

//put each function seperate, then call function in main one
function checkMatch() {
  if (firstFlip.classList[1] === secondFlip.classList[1]) {
    disableFlip();
    matchedBookCount++;
    console.log(matchedBookCount);
    setTimeout(checkWin, 1000);
  } else {
    unflipBooks();
    //take away a life
    playerLives--;
    playerLivesCount.textContent = playerLives;
    setTimeout(endGame, 1000);
    // console.log(playerLives)
    //play ring sound
    playAudio();
  }
}

function disableFlip() {
  firstFlip.removeEventListener("click", flipBook);
  secondFlip.removeEventListener("click", flipBook);
  console.log("matched pair");
}

function unflipBooks() {
  //clickLimit = true here so that they can only click on the books after they have been flipped
  clickLimit = true;
  //console.log(clickLimit);
  //not a match
  setTimeout(function () {
    firstFlip.classList.remove("flip");
    secondFlip.classList.remove("flip");

    clickLimit = false;
  }, 1500);
}

//creates duplicate books to be randomized
function createsDoubleBooksArray(array) {
  for (let i = 0; i < array.length; i++) {
    doubleBooks.push(array[i]);
    doubleBooks.push(array[i]);
  }
}

//shuffles the books in the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // console.log(array);
}

//recreate the book divs here in js and print them in html
function printBooks() {
  //loop through to create the div
  let bookElement = "";
  doubleBooks.forEach((book) => {
    bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.classList.add(book.class);
    // console.log(bookElement.classList);
    //add the divs that surround the front and back images
    divFront = document.createElement("div");
    divBack = document.createElement("div");
    divFront.classList = "front";
    divBack.classList = "back";

    //creating the front and back of the books with the images
    const newBookFront = document.createElement("img");
    newBookFront.src = "img/closed-book-green.png";
    newBookFront.classList = "frontImg";
    const newBookBack = document.createElement("img");
    newBookBack.classList = "testing";

    //attach the image files to the back
    newBookBack.src = book.imgSrc;
    // console.log(book.imgSrc)

    //append books to gameboard section
    gameboard.appendChild(bookElement);
    bookElement.appendChild(divFront);
    bookElement.appendChild(divBack);
    divFront.appendChild(newBookFront);
    divBack.appendChild(newBookBack);
  });
}

function checkWin() {
  if (matchedBookCount === 8) {
    gameDiv.style.display = "none";
    winningMessage.style.display = "block";
  }
}

function endGame() {
  if (playerLives === 0) {
    gameDiv.style.display = "none";
    loosingMessage.style.display = "block";
  }
}

function restartGame() {
  //to reload the page
  // window.location.reload();
  //remove lose message - then run start game
  startGame();
//want to build in all logic that would reset all the things I need. like changing image 

}

//for win message/ have a restart button there too
//if wein condition is equal to blank || lose condition is = to blank, then run restartGame

function playAudio() {
  //audio for cell phone ringing
  cellPhone.play();
  console.log(cellPhone);
}
