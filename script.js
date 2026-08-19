let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 60;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Storage se selected subject check karna
  const selectedSubject = localStorage.getItem('selectedSubject') || 'biology';

  // 2. Custom (Uploaded) data ya Default Data fetch karna
  let allQuestions = JSON.parse(localStorage.getItem('customQuizData'));
  
  if (!allQuestions || allQuestions.length === 0) {
    if (typeof defaultQuizData !== 'undefined') {
      allQuestions = defaultQuizData;
      localStorage.setItem('customQuizData', JSON.stringify(defaultQuizData));
    } else {
      allQuestions = [];
    }
  }

  // 3. Subject wise MCQs filter karna
  let quizData = allQuestions.filter(q => q.subject && q.subject.toLowerCase() === selectedSubject.toLowerCase());

  // Agar filter mein koi question na mile toh saare questions load kar lena
  if (quizData.length === 0) {
    quizData = allQuestions;
  }

  if (quizData.length === 0) {
    alert("No quiz found! Redirecting to upload page.");
    window.location.href = 'upload.html';
    return;
  }

  // Active Quiz Data ko session mein save rakhna
  window.currentQuizData = quizData;

  renderQuiz();
  startTimer();
});

function renderQuiz() {
  const container = document.getElementById('questions-container');
  const quizData = window.currentQuizData;
  container.innerHTML = '';

  const q = quizData[currentQuestionIndex];

  document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;

  // Progress Bar Update
  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  const qDiv = document.createElement('div');
  qDiv.className = 'question-card';

  let optionsHTML = '';
  q.options.forEach((opt, optIndex) => {
    const isSelected = userAnswers[currentQuestionIndex] === optIndex;
    optionsHTML += `
      <label style="display:block; margin:8px 0; padding:10px; border:1px solid #ccc; border-radius:6px; cursor:pointer; background:${isSelected ? '#dbeafe' : '#fff'};">
        <input type="radio" name="q_${currentQuestionIndex}" value="${optIndex}" ${isSelected ? 'checked' : ''} onchange="selectOption(${optIndex})">
        ${opt}
      </label>
    `;
  });

  qDiv.innerHTML = `
    <h3 style="margin-bottom:12px;">${q.question}</h3>
    ${optionsHTML}
    <div style="display:flex; justify-content:space-between; margin-top:20px;">
      ${currentQuestionIndex > 0 ? `<button onclick="prevQuestion()" style="background:#6c757d; width:auto; padding:8px 16px;">Previous</button>` : '<div></div>'}
      ${currentQuestionIndex < quizData.length - 1 
        ? `<button onclick="nextQuestion()" style="width:auto; padding:8px 16px;">Next</button>` 
        : `<button onclick="finishQuiz()" style="background:#16a34a; width:auto; padding:8px 16px;">Finish Quiz</button>`
      }
    </div>
  `;

  container.appendChild(qDiv);
}

function selectOption(optIndex) {
  userAnswers[currentQuestionIndex] = optIndex;
  renderQuiz();
}

function nextQuestion() {
  if (currentQuestionIndex < window.currentQuizData.length - 1) {
    currentQuestionIndex++;
    renderQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuiz();
  }
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  clearInterval(timerInterval);

  const resultData = {
    studentName: "Student",
    studentId: "MDCAT-2026",
    quizData: window.currentQuizData,
    userAnswers: userAnswers
  };

  localStorage.setItem('lastExamResult', JSON.stringify(resultData));
  window.location.href = 'results.html';
    }
    
