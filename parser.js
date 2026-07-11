function parseQuestions(questionText, answerText){

const questions = [];

const qLines = questionText.split("\n");
const aLines = answerText.split("\n");

let current = null;

for(let line of qLines){

line = line.trim();

if(line === "") continue;

if(/^\d+\./.test(line)){

if(current) questions.push(current);

current = {
question: line.replace(/^\d+\.\s*/,""),
options: [],
answer: -1
};

}

else if(/^[A-D][\)\.]/.test(line)){

current.options.push(
line.substring(2).trim()
);

}

}

if(current) questions.push(current);

let index = 0;

for(let line of aLines){

line = line.trim();

if(/^[A-D]$/.test(line)){

questions[index].answer =
line.charCodeAt(0)-65;

index++;

}

}

return questions;

}
