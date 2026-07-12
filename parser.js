    function parseQuestions(questionText, answerText){

const questions=[];

// Remove markdown headings
questionText=questionText
.replace(/^#.*$/gm,"")
.replace(/^##.*$/gm,"")
.replace(/^---.*$/gm,"")
.trim();

// Split questions
const blocks=questionText.split(/\n\s*(?=\d+\.)/);

// Read answers
const answers=[];
const answerRegex=/\d+\.\s*\**([A-D])\)/g;

let match;

while((match=answerRegex.exec(answerText))!==null){
answers.push(match[1].charCodeAt(0)-65);
}

let answerIndex=0;

for(let block of blocks){

block=block.trim();

if(block==="") continue;

// Question
let qMatch=block.match(/^\d+\.\s*([\s\S]*?)A\)/);

if(!qMatch) continue;

let question=qMatch[1].trim();

// Options on ONE line
let optionMatch=block.match(/A\)\s*(.*?)\s*B\)\s*(.*?)\s*C\)\s*(.*?)\s*D\)\s*(.*)/s);

if(!optionMatch) continue;

questions.push({

question:question,

options:[
optionMatch[1].trim(),
optionMatch[2].trim(),
optionMatch[3].trim(),
optionMatch[4].trim()
],

answer:answers[answerIndex] ?? 0

});

answerIndex++;

}

return questions;

    }         
