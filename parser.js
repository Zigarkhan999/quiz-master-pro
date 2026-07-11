function parseQuestions(questionText, answerText){

const questions=[];

// Split each question
const blocks=questionText.split(/\n(?=\d+\.)/);

// Read answers like:
// 1. B
// 2. D
const answers=[];

const answerLines=answerText.split("\n");

for(let line of answerLines){

const m=line.match(/^\d+\.\s*([A-D])/);

if(m){
answers.push(m[1].charCodeAt(0)-65);
}

}

let index=0;

for(let block of blocks){

block=block.trim();

if(block==="") continue;

const qMatch=block.match(/^\d+\.\s*(.*?)\n/s);

if(!qMatch) continue;

const question=qMatch[1].trim();

const optionRegex=/([A-D])\)\s*(.*?)(?=\s+[A-D]\)|$)/gs;

const options=[];

let opt;

while((opt=optionRegex.exec(block))!==null){

options.push(opt[2].trim());

}

if(options.length===4){

questions.push({

question:question,
options:options,
answer:answers[index] ?? -1

});

index++;

}

}

return questions;

}
