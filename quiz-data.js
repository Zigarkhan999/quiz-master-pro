// Permanent Default Questions Database
// Organized per-subject so quiz.html can load them directly via
// localStorage key: 'quiz_<subject>'
const defaultQuizBySubject = {
  chemistry: [
    {
      question: "What is the chemical formula for water?",
      options: ["CO2", "NaCl", "H2O", "O2"],
      answer: 2
    },
    {
      question: "What is the atomic number of Carbon?",
      options: ["4", "6", "8", "12"],
      answer: 1
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: 2
    }
  ],
  biology: [
    {
      question: "Which organelle is known as the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      answer: 1
    },
    {
      question: "What is the primary site of photosynthesis in green plants?",
      options: ["Mitochondria", "Chloroplast", "Golgi Apparatus", "Lysosome"],
      answer: 1
    },
    {
      question: "Which blood cells help fight infection?",
      options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      answer: 1
    }
  ],
  physics: [
    {
      question: "What is the SI unit of force?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2
    },
    {
      question: "What is the speed of light in a vacuum (approx)?",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^5 km/s", "3 x 10^4 m/s"],
      answer: 0
    },
    {
      question: "Which law states 'every action has an equal and opposite reaction'?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
      answer: 2
    }
  ]
};

// Seed localStorage with default questions for each subject,
// but never overwrite data the user has already uploaded/customized.
Object.keys(defaultQuizBySubject).forEach((subject) => {
  const key = 'quiz_' + subject;
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultQuizBySubject[subject]));
  }
});
