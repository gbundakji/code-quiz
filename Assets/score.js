// Declaring Variables for the high score page
var highScore = document.querySelector("#highScore");
var clearScores = document.querySelector("#clearScores");
var restart = document.querySelector("#restart");

// Clearing scores from the local storage
clearScores.addEventListener("click", function () {
    localStorage.removeItem("allScores");
    location.reload();
});

// Provides scores that are in the local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Restart button which bring user back to the begining 
restart.addEventListener("click", function () {
    window.location.replace("./index.html");
});