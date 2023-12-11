// Command line wordle - Guess the 5 letter word of the day.

// 1. Verify if userInputWord is a valid English word
// 2. Check if userLetters are in wordleWord
// 3. If letters in correct position, change their background color to green, else yellow
// (userInputWord[i] in wordleWord, if userInputWord[i] === wordleWord[i] - green, else, yellow.)
// 4. change to gray if a letter is not present.
// 5. Check if userInputWord === wordleWord

var inputField = document.getElementById("input");
var inputForm = document.getElementById("puzzle-container");
const wordleWord = "FALSE";
var counter = 5;

inputForm.addEventListener("submit", submitWord);

function submitWord(event) {
  event.preventDefault();
  var userInputWord = event.target["inputWord"].value;
  console.log(userInputWord);
  checkAttempts(counter, userInputWord);
  counter--;
  inputForm.reset();
}

function checkAttempts(counter, userInputWord) {
    if (counter > 0) {
        console.log("Attempt: " + counter);
        validateWord(userInputWord);
        displayClues(userInputWord, counter);
    }
    else {
        document.getElementById("numberOfAttempts").innerHTML = `You have no attempts left! Today's word was ${wordleWord}`;
    }
}
function validateWord(userInputWord) {
    //add code to validate if the word is a valid english word
    console.log(userInputWord + " is a valid word");
}


function displayClues(userInputWord, counter) {
    var rowId = "row" + counter;
    console.log(rowId);
    var inputWordUpperCased = userInputWord.toUpperCase();
    var word = inputWordUpperCased;
    console.log(word);

    for(i = 0; i < word.length; i++) {
        var currentLetter = word[i];
        if ((wordleWord.includes(word[i]) && (word[i] === wordleWord[i]))) {
            console.log("The guessed letter is in the correct position.");
            displayLetterWithColor(currentLetter, rowId, "green");  
        }
        else if(wordleWord.includes(word[i])) {
            console.log("The letter is in the wrong position");
            displayLetterWithColor(currentLetter, rowId, "yellow");
        }
        else if (!(wordleWord.includes(word[i]))) {
            console.log("The letter is not in the word");
            displayLetterWithColor(currentLetter, rowId, "grey");  
        } 
    }

}

function displayLetterWithColor(letter, rowId, color) {
    console.log(letter);
    var letterElement = document.createElement("td");
    letterElement.innerHTML = `<span class=${color}> ${letter} </span>`;
    document.getElementById(rowId).appendChild(letterElement);
    letterElement.classList.toggle(color);
}
