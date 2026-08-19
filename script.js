// LocalStorage se Quiz Data load karna (customQuizData ya purana quizFile)
let quizData = [];
try {
  quizData = JSON.parse(localStorage.getItem('customQuizData')) || JSON.parse(localStorage.getItem('quizFile')) || [];
} catch (e) {
  quizData = [];
}

let currentQuestionIndex = 0;
let userAnswers = {}; // Student ke saare selected answers store karne ke liye
let timeLeft = 60;
let timerInterval = null;

// Page Load hone par Quiz initialize karna
document.addEventListener('DOMContentLoaded', () => {
  if (!quizData || quizData.length === 0) {
    alert("No quiz data found! Please upload questions first.");
    window.location.href = 'upload.html';
    return;
  }

  renderCurrentQuestion();
});

// Timer Functionality
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;

  const timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.innerHTML = timeLeft;
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerElement) {
      timerElement.innerHTML = timeLeft;
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Time khatam hone par next question par jana ya submit karna
      if (currentQuestionIndex < quizData.length - 1) {
        nextQuestion();
      } else {
        submitExam();
      }
    }
  }, 1000);
}

// Render Current Question (Pagination / Unlimited MCQs support)
function renderCurrentQuestion() {
  startTimer();

  const container = document.getElementById('questions-container');
  const q = quizData[currentQuestionIndex];

  // 1. Progress Bar Update
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    let percent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = percent + "%";
  }

  // 2. Question Counter Update
  const qNumElem = document.getElementById("questionNumber");
  if (qNumElem) {
    qNumElem.innerHTML = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
  }

  // 3. Options HTML Generate karna
  let optionsHTML = '';
  q.options.forEach((opt, optIndex) => {
    const isChecked = userAnswers[currentQuestionIndex] === optIndex ? 'checked' : '';
    optionsHTML += `
      <label class="option-label" style="display:block; margin:10px 0; padding:12px; border:1px solid #ccc; border-radius:8px; cursor:pointer; background:#fff;">
        <input type="radio" name="currentQ" value="${optIndex}" ${isChecked} onchange="saveAnswer(${optIndex})">
        ${opt}
      </label>
    `;
  });

  // 4. Screen par Question Display karna
  if (container) {
    container.innerHTML = `
      <div class="question-card" style="padding:20px; border:1px solid #e2e8f0; border-radius:10px; background:#fff;">
        <p style="color:#64748b; font-weight:bold; margin-bottom: 5px;">Question ${currentQuestionIndex + 1} of ${quizData.length}</p>
        <h3 style="margin-top:0; margin-bottom:15px;">${q.question}</h3>
        <div>${optionsHTML}</div>
      </div>
      
      <div class="nav-buttons" style="margin-top:20px; display:flex; justify-content:space-between; gap:10px;">
        <button class="btn" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''} style="padding:10px 20px; cursor:pointer;">Previous</button>
        ${currentQuestionIndex === quizData.length - 1 
          ? '<button class="btn" onclick="submitExam()" style="padding:10px 20px; background:#16a34a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">Submit Test</button>' 
          : '<button class="btn" onclick="nextQuestion()" style="padding:10px 20px; cursor:pointer;">Next</button>'}
      </div>
    `;
  }
}

// Student ke option choice save karna
function saveAnswer(optIndex) {
  userAnswers[currentQuestionIndex] = optIndex;
}

// Agle sawaal par jana
function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderCurrentQuestion();
  }
}

// Pichhle sawaal par wapas aana
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderCurrentQuestion();
  }
}

// Test Submit karke Results Page par bhejna
function submitExam() {
  clearInterval(timerInterval);

  const studentName = document.getElementById('student-name')?.value.trim() || "Student";
  const studentId = document.getElementById('student-id')?.value.trim() || "N/A";

  const examResult = {
    studentName,
    studentId,
    quizData,
    userAnswers
  };

  localStorage.setItem('lastExamResult', JSON.stringify(examResult));
  window.location.href = 'results.html';
      }
    
