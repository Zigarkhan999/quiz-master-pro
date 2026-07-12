function parseQuestions(questionText, answerText){

    const questions = [];

    // Remove markdown headings
    questionText = questionText
        .replace(/^#.*$/gm,"")
        .replace(/^##.*$/gm,"")
        .replace(/^---.*$/gm,"")
        .trim();

    // Split into question blocks
    const blocks = questionText.split(/\n(?=\d+\.)/);

    // Read answers
    const answers = [];

    const answerRegex = /\d+\.\s*\**([A-D])\)/g;

    let match;

    while((match = answerRegex.exec(answerText)) !== null){

        answers.push(match[1].charCodeAt(0)-65);

    }

    let answerIndex = 0;

    for(let block of blocks){

        block = block.trim();

        if(block==="") continue;

        const lines = block.split("\n");

        let question = "";
        let options = [];

        for(let line of lines){

            line = line.trim();

            if(line==="") continue;

            if(/^\d+\./.test(line)){

                question = line.replace(/^\d+\.\s*/,"").trim();

            }

            else if(/^A\)/.test(line)){

                options.push(line.replace(/^A\)\s*/,"").trim());

            }

            else if(/^B\)/.test(line)){

                options.push(line.replace(/^B\)\s*/,"").trim());

            }

            else if(/^C\)/.test(line)){

                options.push(line.replace(/^C\)\s*/,"").trim());

            }

            else if(/^D\)/.test(line)){

                options.push(line.replace(/^D\)\s*/,"").trim());

            }

        }

        if(question && options.length===4){

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
