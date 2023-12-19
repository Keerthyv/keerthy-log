// Capture names and details into an array on entering them (onsubmit form).
// If counter is even, start matching. else, ask user to enter one more name.
// Matching: Pick random

function Person(name, email, giftLink, address, giftGiven, giftTaken) {
  this.name = name;
  this.emailId = email;
  this.gift = giftLink;
  this.personAddress = address;
  this.isGiftGiver = false;
  this.isGiftTaker = false;
}

function MatchedPair(giver, taker) {
    this.santa = giver;
    this.receiver = taker;
}

const namesArray = [];
const personArray = [];
const matchedNames = [];
var groupName = "Group Name";
var groupLength = 0;
var toDisabled = "false";

let groupForm = document.getElementById("group-form");
let personForm = document.getElementById("person-form");

let nameInput = document.getElementById("name");
let email = document.getElementById("email");
let giftLink = document.getElementById("gift-link");
let address = document.getElementById("address");

const savePerson = document.getElementById("save-btn");
const submitPersons = document.getElementById("finish-btn");

groupForm.addEventListener("submit", submitGroupDetails);

savePerson.addEventListener("click", saveFormData);
submitPersons.addEventListener("click", matchSecretSantas);

function submitGroupDetails(event) {
  event.preventDefault();
  event.stopPropagation();

  groupName = event.target["group-name"].value;
  groupLength = event.target["group-length"].value;
  console.log(groupLength);

  if (Number(groupLength) % 2 != 0) {
    var message = document.createElement("p");
    message.innerHTML =
      "Your group should have even number of members to proceed.";
    document.getElementById("group-details-container").appendChild(message);
  } else {
    document.getElementById("group-details-container").style.display = "none";
    document.getElementById("input-container").style.display = "block";
    submitPersons.style.display = "none";
  }
}

function saveFormData(event) {
  event.preventDefault();
  event.stopPropagation();
  var len = Number(groupLength);

  var personName = nameInput.value;
  var personEmail = email.value;
  var personGift = giftLink.value;
  var personAddress = address.value;

  namesArray.push(personName);
  createNewPerson(personName, personEmail, personGift, personAddress);
  if (namesArray.length === len - 1) {
    savePerson.style.display = "none";
    submitPersons.style.display = "inline";
  }
  personForm.reset();
}

function matchSecretSantas(event) {
    saveFormData(event);
    disableFormElements("true");
    matchNames();
    displayNames();

}


function createNewPerson(personName, personEmail, personGift, personAddress) {
  personArray.push(
    new Person(personName, personEmail, personGift, personAddress)
  );
  console.log("The array of objects person: ");
  console.log(personArray);
}

function disableFormElements(toDisabled) {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = toDisabled;
  }

  var textareaElements = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareaElements.length; i++) {
    textareaElements[i].disabled = toDisabled;
  }
}

function matchNames() {
    for (var i = 0; i < personArray.length; i++ ) {
        //randomGiver = pickRandomGiver();
        randomTaker = pickRandomTaker();
        if (!(personArray[i].isGiftGiver)) {
            if (!(personArray[randomTaker].isGiftTaker)) {
                matchedNames.push(new MatchedPair(personArray[i].name, personArray[randomTaker].name));
                personArray[randomTaker].isGiftTaker = "true";
                personArray[i].isGiftGiver = "true";
            }
        }
    }
}


function pickRandomTaker() {
    var randomIndex = Math.floor(Math.random() * Number(groupLength));
    console.log("Taker: " + randomIndex);
    if (!(personArray[randomIndex].isGiftTaker)) {
        return randomIndex;
    }
    else if (matchedNames.length != groupLength) {
    pickRandomTaker();
    }
    else console.log("All names were matched!");
}

function pickRandomGiver() {
    var randomIndex = Math.floor(Math.random() * Number(groupLength));
    console.log("Giver: " + randomIndex);
    if (!(personArray[randomIndex].isGiftGiver)) {
        return randomIndex;
    }
    else if (matchedNames.length != groupLength) {
    pickRandomGiver();
    }
    else console.log("All names were matched!");
}

function displayNames() {
    for (var i = 0; i < matchedNames.length; i++) {
        console.log(matchedNames[i]);
    }
}