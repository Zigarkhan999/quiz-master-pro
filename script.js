let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 1800;

document.addEventListener('DOMContentLoaded', () => {
  const selectedSubject = localStorage.getItem('selectedSubject') || 'biology';

  // 1. Specific subject ke uploaded MCQs load karna
  let quizData = [];
  const storedSubjectData = localStorage.getItem('quiz_' + selectedSubject);
  const generalStoredData = localStorage.getItem('customQuizData');

  if (storedSubjectData) {
    try {
      quizData = JSON.parse(storedSubjectData);
    } catch (e) {
      console.error("Subject data error:", e);
    }
  } else if (generalStoredData) {
    try {
      quizData = JSON.parse(generalStoredData);
    } catch (e) {
      console.error("General data error:", e);
    }
  }

  // Fallback to defaultQuizData if no uploads exist
  if ((!quizData || quizData.length === 0) && typeof defaultQuizData !== 'undefined') {
    quizData = defaultQuizData;
  }

  if (!quizData || quizData.length === 0) {
    document.getElementById('questions-container').innerHTML = 
      `<p style="color:red; font-weight:bold; text-align:center;">No MCQs found for ${selectedSubject.toUpperCase()}! Please upload MCQs first.</p>`;
    return;
  }

  window.currentQuizData = quizData;
  
  const titleElem = document.getElementById('subjectTitle');
  if (titleElem) {
    titleElem.textContent = selectedSubject.toUpperCase() + " Quiz";
  }

  renderQuiz();
  startTimer();
});

function renderQuiz() {
  const container = document.getElementById('questions-container');
  const quizData = window.currentQuizData;
  container.innerHTML = '';

  const q = quizData[currentQuestionIndex];

  document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;

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
      ${currentQuestionIndex > 0 ? `<button onclick="prevQuestion()" style="background:#6c757d; color:#fff; padding:8px 16px; border:none; border-radius:5px; cursor:pointer;">Previous</button>` : '<div></div>'}
      ${currentQuestionIndex < quizData.length - 1 
        ? `<button onclick="nextQuestion()" style="background:#2563eb; color:#fff; padding:8px 16px; border:none; border-radius:5px; cursor:pointer;">Next</button>` 
        : `<button onclick="finishQuiz()" style="background:#16a34a; color:#fff; padding:8px 16px; border:none; border-radius:5px; cursor:pointer;">Finish Quiz</button>`
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
