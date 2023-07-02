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
const messages = document.querySelector(".message");

// The hidden button that will appear prompting the player to play again.
const playAgain =  document.querySelector(".play-again");

const word = "magnolia";

const clearInput = function () {
    letterInput.value = "";
};

const wordHider = function(word){
    let wordArray = word.split('');
    wordArray.forEach( function(item, index, array){
        wordArray[index] = "●";
    });
    let hiddenWord = wordArray.join(' ');
    wordInProgress.innerText = hiddenWord;
};

wordHider(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    let letterGuess = letterInput.value;
    console.log(letterGuess);
    clearInput();
})