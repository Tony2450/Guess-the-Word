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
const remainingGuessesNum = document.querySelector(".guess-left-num");

// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again.
const playAgain =  document.querySelector(".play-again");

// Word to guess
const word = "magnolia";

// Guessed letters array
const guessedLettersArray = [];

// Function to clear letter input
const clearInput = function () {
    letterInput.value = "";
};

// Function to clear message
const clearMessage = function () {
    message.innerText = "";
};


// Function to hide letters with ● symbols
const wordHider = function(word){
    let wordArray = word.split('');
    wordArray.forEach( function(item, index, array){
        wordArray[index] = "●";
    });
    let hiddenWord = wordArray.join(' ');
    wordInProgress.innerText = hiddenWord;
};

wordHider(word);

// Click listener for letter guesses
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    clearMessage();
    let letterGuess = letterInput.value;
    let validatedGuess = validator(letterGuess);
    console.log(validatedGuess);
    if (validatedGuess != undefined){
        makeGuess(validatedGuess);
    }
    clearInput();
})

// Function to validate that the guess is actually a single letter A-Z
const validator = function(input){
    const acceptedLetters = /[a-zA-Z]/;
    if (input === ""){
        message.innerText = "Please input a letter from A to Z.";
    } else if (input.length > 1){
        message.innerText = "Please input a SINGLE letter from A to Z.";
    } else if (input != input.match(acceptedLetters)) {
        message.innerText = "Thats not a letter from A to Z, silly!";
    } else {
        return input;
    }
};

// Function to make the guess and match it to previous guesses
const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLettersArray.includes(letter) === true){
        message.innerText = "You've already guessed that letter! Try another one!";
    } else {
        guessedLettersArray.push(letter);
    };
    console.log(guessedLettersArray);
}