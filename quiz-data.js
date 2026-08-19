const defaultQuizData = [
  {
    "subject": "biology",
    "question": "Which organelle is known as the powerhouse of the cell?",
    "options": ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    "answer": 1
  },
  {
    "subject": "biology",
    "question": "What is the primary site of photosynthesis in green plants?",
    "options": ["Mitochondria", "Chloroplast", "Golgi Apparatus", "Lysosome"],
    "answer": 1
  }
];

// LocalStorage clear karke naya data set karna
localStorage.setItem('customQuizData', JSON.stringify(defaultQuizData));
