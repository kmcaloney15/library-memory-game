// ------------ Global Variables ---------------------------------------/
const gameboard = document.querySelector(".gameboard");
const books = document.querySelectorAll(".book");
const playerLivesCount = document.querySelector("span");
//how many lives they start with
const playerLives = 6;

let hasFlippedBook = false;
let firstFlip;
let secondFlip;
let clickLimit = false;

playerLivesCount.textContent = playerLives;

//  -------------------------- Event Listeners -------------------------/

books.forEach((book) => {
  book.addEventListener("click", flipBook);
});
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

//---------------------- FUNCTIONS ------------------------------------/

function flipBook() {
  //if clickLimit = true then the player won't be able to keep clicking on the board.
  if (clickLimit == true) {
    return;
  }
  //disables player from clicking the same book twice in a row
  if (this === firstFlip) {
    return;
  }
  //   console.log(clickLimit);

  this.classList.add("flip");
  // hasFlippedBook = true;
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
  } else {
    unflipBooks();
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
  console.log(clickLimit);
  //not a match
  setTimeout(function () {
    firstFlip.classList.remove("flip");
    secondFlip.classList.remove("flip");

    clickLimit = false;
  }, 1500);
}

function restartGame() {
  hasFlippedBook = false;
}

//array of array - inside book title and how many times //loop through //have it write in the class to randomize

let doubleBooks = [];

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
//TODO recreate the book divs here in js
function printBooks() {
  //loop through to create the div
  let bookElement = "";
  doubleBooks.forEach((book) => {
    bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.classList.add(book.class);
    console.log(bookElement.classList);
    //add in other divs with append and appendChild

    //creating the front and back of the books with the images
    const newBookFront = document.createElement("img");
    const newBookBack = document.createElement("img");
    newBookFront.classList = "front";
    newBookBack.classList = "back";

    //need to append newly created books to gameboard section
    gameboard.appendChild(bookElement);
    bookElement.appendChild(newBookFront);
    bookElement.appendChild(newBookBack);
  });
}

//creating the objects of each book to push into the array
let booksArray = [];
booksArray.push({
  title: "Where the Sidewalk Ends by Shel Silverstein",
  class: "sidewalk",
});
booksArray.push({
  title: "Eragon by Christopher Paolini",
  class: "eragon",
});
booksArray.push({
  title: "Virgin River by Robyn Carr",
  class: "virgin",
});
booksArray.push({
  title: "Rules of Redemption by T.A. White",
  class: "rules",
});
booksArray.push({
  title: "Lord of the Rings by J.R.R. Tolkein",
  class: "lotr",
});
booksArray.push({
  title: "Harry Potter and the Socerers Stone by J.K. Rowling",
  class: "hp",
});
booksArray.push({
  title: "The Bookshop on the Corner by Jenny Colgan",
  class: "bookshop",
});
booksArray.push({
  title: "Pride and Prejudice by Jane Ausin",
  class: "pride",
});
createsDoubleBooksArray(booksArray);
shuffleArray(doubleBooks);
printBooks();

//if random book picked then add class of book title to match
