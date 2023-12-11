// Command line wordle - Guess the 5 letter word of the day.

// 1. Verify if userInputWord is a valid English word
// 2. Check if userLetters are in wordleWord
// 3. If letters in correct position, change their background color to green, else yellow
// (userInputWord[i] in wordleWord, if userInputWord[i] === wordleWord[i] - green, else, yellow.)
// 4. change to gray if a letter is not present.
// 5. Check if userInputWord === wordleWord

import { validWordList } from './validWords.js';
import { wordleList } from './wordleList.js';

var inputField = document.getElementById("inputWord");
var inputForm = document.getElementById("puzzle-container");
var userMessage = document.getElementById("userMessage");
//console.log(wordleList.length);
//console.log(validWordList.length);
var randomIndex = Math.floor(Math.random() * 2309);
var randomWord = wordleList[randomIndex];
const wordleWord = randomWord.toUpperCase();
//console.log("Today's word: " + wordleWord);
var counter = 6;
var attempt = 1;

inputForm.addEventListener("submit", submitWord);

function submitWord(event) {
  event.preventDefault();
  var userInputWord = event.target["inputWord"].value;
  console.log(userInputWord);
  checkAttempts(counter, userInputWord);
  inputForm.reset();
}

function checkAttempts(counter, userInputWord) {
  if (counter == 0) {
    userMessage.innerHTML = `You have no attempts left! Today's word was ${wordleWord}`;
    inputField.disabled = true;
  } else if (counter > 0) {
    console.log("Counter: " + counter);
    console.log("Attempt" + attempt);
    validateWord(userInputWord);
  }
}

function validateWord(userInputWord) {
    //add code to validate if the word is a valid english word
    userInputWord = userInputWord.toLowerCase();
    if ((userInputWord.length != 5) || (!(validWordList.includes(userInputWord)))) {
        userMessage.innerHTML = "Please enter a valid five-letter word.";
    }
    else {
        console.log(userInputWord + " is a valid word");
        displayClues(userInputWord, counter);
        counter--;
        attempt++;
        console.log("New Counter: " + counter);
        console.log("New Attempt" + attempt);
    }
}
  

function displayClues(userInputWord, counter) {
  var rowId = "row" + counter;
  console.log(rowId);
  var inputWordUpperCased = userInputWord.toUpperCase();
  var word = inputWordUpperCased;
  console.log(word);

  for (var i = 0; i < word.length; i++) {
    var currentLetter = word[i];
    if (wordleWord.includes(word[i]) && word[i] === wordleWord[i]) {
      console.log("The guessed letter is in the correct position.");
      displayLetterWithColor(currentLetter, rowId, "green");
    } else if (wordleWord.includes(word[i])) {
      console.log("The letter is in the wrong position");
      displayLetterWithColor(currentLetter, rowId, "yellow");
    } else if (!wordleWord.includes(word[i])) {
      console.log("The letter is not in the word");
      displayLetterWithColor(currentLetter, rowId, "grey");
    }
  }
  if (word === wordleWord) {
    userMessage.innerHTML = `You have guessed the word on attempt ${attempt}`;
    inputField.disabled = true;
  }
}

function displayLetterWithColor(letter, rowId, color) {
  console.log(letter);
  var letterElement = document.createElement("td");
  letterElement.innerHTML = `<span class=${color}> ${letter} </span>`;
  document.getElementById(rowId).appendChild(letterElement);
  letterElement.classList.toggle(color);
}
