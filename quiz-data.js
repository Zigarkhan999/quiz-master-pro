// Permanent Default Questions Database
const defaultQuizData = [
  {
    subject: "biology",
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    answer: 1
  },
  {
    subject: "biology",
    question: "What is the primary site of photosynthesis in green plants?",
    options: ["Mitochondria", "Chloroplast", "Golgi Apparatus", "Lysosome"],
    answer: 1
  },
  {
    subject: "chemistry",
    question: "What is the chemical formula for water?",
    options: ["CO2", "NaCl", "H2O", "O2"],
    answer: 2
  },
  {
    subject: "physics",
    question: "What is the SI unit of force?",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    answer: 2
  },
  {
    subject: "english",
    question: "Choose the correct synonym for 'Rapid':",
    options: ["Slow", "Fast", "Weak", "Calm"],
    answer: 1
  }
];

// LocalStorage check karke default save karna
if (!localStorage.getItem('customQuizData')) {
  localStorage.setItem('customQuizData', JSON.stringify(defaultQuizData));
              }
    
