let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval;
let timeLeft = 1800;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cloudId = urlParams.get('id');
  let selectedSubject = localStorage.getItem('selectedSubject') || 'chemistry';
  let quizData = [];

  // Fetch data instantly from dpaste
  if (cloudId) {
    try {
      const res = await fetch(`https://dpaste.org/${cloudId}/raw`);
      const data = await res.json();
      if (data && data.questions) {
        quizData = data.questions;
        selectedSubject = data.subject || selectedSubject;
      }
    } catch (e) {
      console.error("Cloud fetch error", e);
    }
  }

  // Fallback to local storage if no cloud ID
  if (!quizData || quizData.length === 0) {
    const storedSubjectData = localStorage.getItem('quiz_' + selectedSubject);
    if (storedSubjectData) {
      try { quizData = JSON.parse(storedSubjectData); } catch (e) {}
    }
  }

  if (!quizData || quizData.length === 0) {
    document.getElementById('questions-container').innerHTML = 
      `<p style="color:red; font-weight:bold; text-align:center; padding:20px;">
        Invalid Link or MCQs not found!
       </p>`;
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
    quizData: window.currentQuizData,
    userAnswers: userAnswers
  };

  localStorage.setItem('lastExamResult', JSON.stringify(resultData));
  window.location.href = 'results.html';
          }
    
