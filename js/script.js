// The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");

// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");

// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");

// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");

// The paragraph where the remaining guesses will display.
const remainingGuessesParagraph = document.querySelector(".remaining");

// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".guesses-left");

// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");

//Global word
let word = "magnolia";

// Guessed letters array
let guessedLettersArray = [];

// Number of remaining guesses
let remainingGuesses = Number(8);

// Get word API call
const getWord = async function () {
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await data.text();
    const wordArray = words.split("\n");
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[randomIndex].trim();
    word = randomWord.toString();
    wordHider(word);
};

// INITIALIZE GAME
getWord();

// Function to clear letter input
const clearInput = function () {
    letterInput.value = "";
};

// Function to clear message
const clearMessage = function () {
    message.innerText = "";
};


// Function to hide letters with ● symbols
const wordHider = function (word) {
    let letterArray = word.split('');
    letterArray.forEach(function (item, index, array) {
        array[index] = "●";
    });
    let hiddenWord = letterArray.join('');
    wordInProgress.innerText = hiddenWord;
};

// Click listener for letter guesses
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    clearMessage();
    let letterGuess = letterInput.value;
    let validatedGuess = validator(letterGuess);
    console.log(validatedGuess);
    if (validatedGuess != undefined) {
        makeGuess(validatedGuess);
    }
    clearInput();
})

// Function to validate that the guess is actually a single letter A-Z
const validator = function (input) {
    const acceptedLetters = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "Please input a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Please input a SINGLE letter from A to Z.";
    } else if (input != input.match(acceptedLetters)) {
        message.innerText = "Thats not a letter from A to Z, silly!";
    } else {
        return input;
    }
};

// Function to make the guess and match it to previous guesses
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLettersArray.includes(letter) === true) {
        message.innerText = "You've already guessed that letter! Try another one!";
    } else {
        guessedLettersArray.push(letter);
        showLetters();
        remainingGuessesCount(letter)
        updater(guessedLettersArray);
    };
    console.log(guessedLettersArray);
};

//Function to update page with guessed letters
const showLetters = function () {
    guessedLetters.innerHTML = "";
    guessedLettersArray.forEach(function (item, index, array) {
        const listItem = document.createElement("li");
        listItem.innerText = array[index];
        guessedLetters.append(listItem);
    })
};

// Function to update word in progress
const updater = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    let letterArray = wordUpper.split("");
    letterArray.forEach(function (item, index, array) {
        if (guessedLettersArray.includes(array[index]) === true) {
            array[index] = item;
        } else {
            array[index] = "●"
        }
    });
    let hiddenWord = letterArray.join('')
    wordInProgress.innerText = hiddenWord;
    console.log(hiddenWord);
    winCheck(hiddenWord);
};

// Function to check if player successfully guessed word
const winCheck = function (hiddenWord) {
    if (hiddenWord === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the entire word correctly! Congrats!</p>`
        startOver();
    }
};

// Function to count guesses remaining
const remainingGuessesCount = function (guess) {
    let upperCaseWord = word.toUpperCase();
    if (upperCaseWord.includes(guess) === false) {
        remainingGuesses -= 1;
    };
    if (remainingGuesses === 0) {
        message.innerHTML = `<p> GAME OVER, the word was: ${word}!</p>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `ONE guess`;
    } else if (remainingGuesses >= 2) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Start over funciton
const startOver = function(){
    guessButton.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgain.classList.remove("hide");
};

// Play again button event listener
playAgain.addEventListener("click", function(){
    message.classList.remove("win");
    clearMessage();
    guessedLetters.innerHTML = "";
    remainingGuesses = Number(8);
    guessedLettersArray=[];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord()
})
