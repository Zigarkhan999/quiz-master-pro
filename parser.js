             function parseQuestions(questionText, answerText){

const questions=[];

// Remove markdown headings
questionText=questionText
.replace(/^#.*$/gm,"")
.replace(/^##.*$/gm,"")
.replace(/^---.*$/gm,"")
.trim();

// Split into question blocks
const blocks=questionText.split(/\n(?=\d+\.)/);

// Read answers
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

let answerIndex=0;

for(let block of blocks){

block=block.trim();

if(block==="") continue;

let qMatch=block.match(/^(\d+\.\s*[\s\S]*?)A\)/);

if(!qMatch) continue;

let question=qMatch[1]
.replace(/^\d+\.\s*/,"")
.trim();

let optionRegex=/([A-D])\)\s*(.*?)(?=\s+[A-D]\)|$)/gs;

let options=[];

let opt;

while((opt=optionRegex.exec(block))!==null){

options.push(opt[2].trim());

}

if(options.length===4){

questions.push({

question:question,

options:options,

answer:answers[answerIndex] ?? 0

});

answerIndex++;

}

}

return questions;

    }   
