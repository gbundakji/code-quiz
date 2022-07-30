// Declaring variables
var timer = document.querySelector("#timer");
var timer = document.querySelector("#startQuiz");
var questId = document.querySelector("#questId");
var question = document.querySelector("#question");
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var score = 0;
var questionIndex = 0;
var ulCreate = document.createElement("ul"); 
// Variable containg array of questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        answer: "Alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ______.",
        choices: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        answer: "Parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ______.",
        choices: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        answer: "All of the above"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
        answer: "Quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["1. Javascript", "2. Terminal / Bash", "3. For loops", "4. Console log"],
        answer: "Console log"
    },
    {
        title: "Does Gassan deserve and A on this project?",
        choices: ["1. Yes", "2. I want to say no but yes", "3. Nah dude", "4. Kinda"],
        answer: "Yes"
    },

];

// Event listener for a button to begin function to start the timer
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timer.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Function to prompt the questions
function render(questionIndex) {

    questId.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {

        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questId.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questId.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Function to prompt the user if their asnwer is correct or wrong
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            answerDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            answerDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Provides the users score
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        answerDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questId.appendChild(answerDiv);
}

// Function for when the quiz is all done
function allDone() {
    questId.innerHTML = "";
    timer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questId.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questId.appendChild(createP);

    // If statement to calculate the final score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questId.appendChild(createP2);
    }
    // Creating the label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questId.appendChild(createLabel);

    // Creating the input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questId.appendChild(createInput);

    // Creating submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questId.appendChild(createSubmit);
    
    // Event listener for the submit button 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            // Stores the score in the local storage
            localStorage.setItem("initials", finalScore.initials)
            localStorage.setItem("score", finalScore.score)
            console.log(finalScore);
            var allScores = localStorage.getItem("initials","score");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./score.html");
        }
        
    });
    // here
    
}
