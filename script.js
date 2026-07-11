let currentQuestion = 0;
let score = 0;

let buttons = document.querySelectorAll("button");

function loadQuestion() { document.getElementById("message").innerHTML = "";

document.getElementById("question").innerHTML =
questions[currentQuestion].question;

for(let i=0; i<4; i++){

buttons[i].innerHTML =
questions[currentQuestion].options[i];

buttons[i].onclick = function(){

if(i === questions[currentQuestion].answer){

document.getElementById("message").innerHTML = "✅ Correct!";
document.getElementById("message").style.color = "green";
score++;

}else{

document.getElementById("message").innerHTML = "❌ Wrong!";
document.getElementById("message").style.color = "red";

}

currentQuestion++;

if(currentQuestion < questions.length){

loadQuestion();

}else{

document.body.innerHTML =
"<h1 style='text-align:center'>Quiz Finished 🎉<br>Score: "
+ score + " / " + questions.length + "</h1>";

}

};

}

}

loadQuestion();
