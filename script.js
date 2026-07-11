let questionsText = localStorage.getItem("questionsText");
let answersText = localStorage.getItem("answersText");

if(!questionsText || !answersText){
    alert("Please upload Questions and Answers first.");
    window.location.href = "upload.html";
}

let questions = parseQuestions(questionsText, answersText);

if(questions.length === 0){
    alert("No questions found. Please check your files.");
    window.location.href = "upload.html";
}

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const question = document.getElementById("question");
const options = document.getElementById("options");
const message = document.getElementById("message");
const timerText = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

function loadQuestion(){

    clearInterval(timer);

    timeLeft = 60;
    timerText.textContent = timeLeft;

    message.textContent = "";

    let q = questions[currentQuestion];

    question.textContent = q.question;

    questionNumber.textContent =
    "Question " + (currentQuestion + 1) + " / " + questions.length;

    progressBar.style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";

    options.innerHTML = "";

    for(let i = 0; i < q.options.length; i++){

        let btn = document.createElement("button");

        btn.textContent = q.options[i];

        btn.onclick = function(){

            checkAnswer(i);

        };

        options.appendChild(btn);

    }

    startTimer();

                }
function checkAnswer(selected){

    clearInterval(timer);

    let correct = questions[currentQuestion].answer;

    let allButtons = options.querySelectorAll("button");

    allButtons.forEach(btn => btn.disabled = true);

    if(selected === correct){

        message.textContent = "✅ Correct!";
        message.style.color = "green";
        score++;

    }else{

        message.textContent = "❌ Wrong!";
        message.style.color = "red";

        allButtons[correct].style.background = "green";
        allButtons[selected].style.background = "red";

    }

    setTimeout(nextQuestion,1000);

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){

        clearInterval(timer);

        document.querySelector(".container").innerHTML = `
        <h1>🎉 Quiz Finished</h1>
        <h2>Your Score</h2>
        <h1>${score} / ${questions.length}</h1>

        <button onclick="location.href='upload.html'">
        Start New Quiz
        </button>
        `;

        return;

    }

    loadQuestion();

}

function startTimer(){

    timer = setInterval(function(){

        timeLeft--;

        timerText.textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            nextQuestion();

        }

    },1000);

}

loadQuestion();
