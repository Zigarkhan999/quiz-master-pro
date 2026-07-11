function parseQuestions(questionText, answerText) {

    const questions = [];

    // Split by question number (1. 2. 3. ...)
    const blocks = questionText.split(/\n\s*\d+\.\s+/);

    // Get answers like: 1. C  2. D  3. A
    const answers = [];
    const answerRegex = /\d+\.\s*\*\*([A-D])\)/g;

    let match;

    while ((match = answerRegex.exec(answerText)) !== null) {
        answers.push(match[1].charCodeAt(0) - 65);
    }

    for (let i = 1; i < blocks.length; i++) {

        let block = blocks[i].trim();

        const optionMatch = block.match(/A\)(.*?)B\)(.*?)C\)(.*?)D\)(.*)/s);

        if (!optionMatch) continue;

        const question = block.substring(0, block.indexOf("A)")).trim();

        questions.push({
            question: question,
            options: [
                optionMatch[1].trim(),
                optionMatch[2].trim(),
                optionMatch[3].trim(),
                optionMatch[4].trim()
            ],
            answer: answers[i - 1] ?? -1
        });

    }

    return questions;
}
