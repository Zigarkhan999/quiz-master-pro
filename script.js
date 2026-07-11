let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
const question = document.getElementById("question");
const message = document.getElementById("message");
const buttons = document.querySelectorAll("button");

function loadQuestion() {
clearInterval(timer);

timeLeft = 60;

document.getElementById("timer").innerHTML = timeLeft;

timer = setInterval(function(){

timeLeft--;

document.getElementById("timer").innerHTML = timeLeft;

if(timeLeft <= 0){

clearInterval(timer);

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();

}else{

document.querySelector(".container").innerHTML = `
<h1>🎉 Quiz Finished</h1>
<h2>Your Score: ${score} / ${questions.length}</h2>
<button onclick="location.reload()">Play Again</button>
`;

}

}

},1000);
    message.innerHTML = "";
let percent = ((currentQuestion + 1) / questions.length) * 100;

document.getElementById("progressBar").style.width = percent + "%";
    question.innerHTML = questions[currentQuestion].question;
document.getElementById("questionNumber").innerHTML =
"Question " + (currentQuestion + 1) + "/" + questions.length;
    for (let i = 0; i < 4; i++) {

        buttons[i].innerHTML = questions[currentQuestion].options[i];

        buttons[i].onclick = function () {

            if (i === questions[currentQuestion].answer) {
                message.innerHTML = "✅ Correct!";
                message.style.color = "green";
                score++;
            } else {
                message.innerHTML = "❌ Wrong!";
                message.style.color = "red";
            }

            buttons.forEach(btn => btn.disabled = true);

            setTimeout(function () {

                currentQuestion++;

                if (currentQuestion < questions.length) {

                    buttons.forEach(btn => btn.disabled = false);

                    loadQuestion();

                } else {

                    document.querySelector(".container").innerHTML = `
                        <h1>🎉 Quiz Finished</h1>
                        <h2>Your Score: ${score} / ${questions.length}</h2>
                        <button onclick="location.reload()">Play Again</button>
                    `;

                }

            }, 1000);

        };

    }

}

loadQuestion();
