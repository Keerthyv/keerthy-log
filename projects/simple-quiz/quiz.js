// Problem Statement:
// 1. Take user input - yes / no for quiz.
// 2. Load first question on clicking Yes
// 3. Allow user to select an answer from 4 choices - radio buttons / selecting the total textbox
// 4. Click event on Next button - load next question
// 5. Repeat 3, 4 until end of quiz
// 6. On clicking Submit quiz, compute score and display.


    const questions = [
        { 
            question: "What is the capital of Kentucky?",
            options: [
                {text: "Springfield", correct: false},
                {text: "Albany", correct: false},
                {text: "Frankfort", correct: true},
                {text: "Helena", correct: false}
            ]
        },
        { 
            question: "What is the capital of Illinois?",
            options: [
                {text: "Springfield", correct: true},
                {text: "Albany", correct: false},
                {text: "Frankfort", correct: false},
                {text: "Helena", correct: false}
            ]
        },
        { 
            question: "What is the capital of New York?",
            options: [
                {text: "Springfield", correct: false},
                {text: "Albany", correct: true},
                {text: "Frankfort", correct: false},
                {text: "Helena", correct: false}
            ]
        },
        { 
            question: "What is the capital of Montana?",
            options: [
                {text: "Springfield", correct: false},
                {text: "Albany", correct: false},
                {text: "Frankfort", correct: false},
                {text: "Helena", correct: true}
            ]
        }
    ]

    let startHeader = document.getElementById("header-container");
    let yesBtn = document.getElementById("load-quiz");
    let noBtn = document.getElementById("no-quiz");
    let quiz = document.getElementById("quiz-div");
    let newQues = document.getElementById("ques");
    let answerButtons = document.getElementById("answer-buttons");

    let nextButton = document.getElementById("next-ques");
    let prevButton = document.getElementById("prev-ques");

    let gIndex;
    let score = 0;

    yesBtn.addEventListener("click", loadQuiz);
    noBtn.addEventListener("click", loadMessage);

    nextButton.addEventListener('click', loadNext);
    


    function loadQuiz() {

        let index = 0;
        nextButton.innerHTML = "Next";
        nextButton.style.visibility = "visible";
        startHeader.style.display = "none";

        console.log("index: "   + index);

        questionNo = index + 1;
        let q = questions[index].question;
        newQues.innerHTML = questionNo + ". " + q;

        console.log("index: "   + index);

        options = questions[index].options;
        options.forEach(displayOptionButtons);

        answerButtons.addEventListener("click", validateAnswer);

        gIndex = index + 1;
        console.log("gIndex: " + gIndex);

    }

    function displayOptionButtons(item) {
        const optionList = document.getElementById("answer-buttons");
        let btn = document.createElement("button");
        btn.innerHTML = item.text;
        btn.classList.add("btn");
        // tag correct answer with a class name
        if (item.correct) {
            btn.classList.add("correct");
        }
        else {
            btn.classList.add("incorrect");
        }
        optionList.appendChild(btn);
    }

    function loadMessage() {
        console.log("Ok, next time!");
        window.alert("It's ok, let's try next time!");
        
    }

    function validateAnswer(event) {
        //disable clicking after selecting one answer.
        parent = event.target.parentNode;
        console.log("Value of parent is: " + parent);
        children = Array.from(parent.children);
        children.forEach(showColor);
        

        let givenAnswer = event.target.innerHTML;
        console.log(givenAnswer);

        //let optionsList = questions[gIndex].options;

        if (event.target.classList.contains('correct')) {
            score = score + 1;
            console.log("Current score is: " + score);
        }
        else {
            event.target.style.backgroundColor = "red";
            console.log("Wrong choice!");
            console.log("Current score is: " + score);
        }
    }

    function showColor(item) {
        item.disabled = true;
        if (item.classList.contains("correct")) {
            item.style.backgroundColor = "lightgreen";
        }
    }
    

    function loadNext() {
        //reset the state of the quiz div before loading next question.
        resetQuiz();
        index = gIndex;
        console.log("index in Next load: " + gIndex);
        console.log("No.of questions: " + questions.length);

        startHeader.style.display = "none";

        if (index >= questions.length) {
            console.log("Quiz complete!");
            nextButton.style.visibility = "hidden";
            newQues.innerHTML = "Quiz complete! Your score is: " + score;
        }
        else {
            if (index === (questions.length - 1)) {
                nextButton.innerHTML = 'Submit'
            }
            questionNo = index + 1;
            let q = questions[index].question;
            newQues.innerHTML = questionNo + ". " + q;

            console.log("Current question no: "   + questionNo);

            options = questions[index].options;
            options.forEach(displayOptionButtons);
            gIndex = index + 1;
            console.log("gIndex Next: " + gIndex);
        }
    }

    function resetQuiz() {
        newQues.innerHTML = "";
        while(answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }




