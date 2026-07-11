let currentQuestion = 0;

document.getElementById("question").innerHTML =
questions[currentQuestion].question;

let buttons = document.querySelectorAll("button");

for(let i=0; i<4; i++){
    buttons[i].innerHTML = questions[currentQuestion].options[i];
}
