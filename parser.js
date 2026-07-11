function parseQuestions(questionText, answerText){

const questions=[];

const blocks=questionText.split(/\n(?=\d+\.)/);

const answers=[];

// Works with:
// 1. **C)
// 2. C)
// 3. C
const answerRegex=/\d+\.\s*\**([A-D])\)/g;

let match;

while((match=answerRegex.exec(answerText))!==null){
answers.push(match[1].charCodeAt(0)-65);
}

let index=0;

for(let block of blocks){

block=block.trim();

if(block==="") continue;

let q=block.match(/^\d+\.\s*([\s\S]*?)A\)/);

if(!q) continue;

let question=q[1].trim();

let options=[];

let optionRegex=/[A-D]\)\s*(.*?)(?=\s+[A-D]\)|$)/gs;

let opt;

while((opt=optionRegex.exec(block))!==null){

options.push(opt[1].trim());

}

if(options.length===4){

questions.push({

question:question,

options:options,

answer:answers[index]??0

});

index++;

}

}

return questions;

}
