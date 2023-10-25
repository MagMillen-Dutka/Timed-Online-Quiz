
var questions = [
    {
        prompt: "Where is the correct place to insert JavaScript?",
        options: ["<head>", "<footer>", "<body>", "<all of the above>"],
        answer: "<body>"
    },
    {
        prompt: "How does a FOR loop start?",
        options: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for (i = 5)", "for (i = 0; i++)"],
      answer: "for (i = 0; i <= 5; i++)"
    },
    {
        prompt: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        prompt: "How do you call a function named myFunction?",
        options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
    },
    {
        prompt: "In JavaScript, which of the following is a logical operator?",
        options: ["|", "&&", "%", "/"],
        answer: "&&" 
    },
    {
        prompt: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        options: ["method", "assignment operator", "variable", "string"],
        answer: "variable"
    }];

// variables
var timing = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#options");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var reStartBtn = document.querySelector("#restart");

var Index = 0;
var time = questions.length * 10;
var timerId;

// At start of quiz main screen hidden

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timing.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    myQuestions();
}

// Loop for questions
// Added buttons for questions 


  function myQuestions() {
  var currentQuestion = questions[Index];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check answers

function questionClick() {
    if (this.value !== questions[Index].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timing.textContent = time;
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    Index++;
    if (Index === questions.length) {
      quizEnd();
    } else {
      myQuestions();
    }
}

// End quiz by hiding questions and stopping timing

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timing.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// local storage of leaderboard - this can be erased with button

function saveLeaderboard() {
    var name = nameEl.value;
    if (name !== "") {
      var leaderboard =
        JSON.parse(window.localStorage.getItem("leaderboard")) || [];
      var newScore = {
        score: time,
        name: name
      };
      leaderboard.push(newScore);
      window.localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveLeaderboard();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveLeaderboard;


// start / restart buttons - Added additional button for re-start following completion of game. Gives users choice between submitting score or restarting at end of game.

startBtn.onclick = quizStart;