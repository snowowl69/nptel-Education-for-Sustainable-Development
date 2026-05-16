const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load questions data
const oldQuestionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'questions.json'), 'utf-8'));
let newQuestionsData = { quizzes: [] };
try {
    newQuestionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_questions.json'), 'utf-8'));
} catch (err) {
    console.error("Could not load new_questions.json", err);
}

// Map data
const oldQuestionsMap = {};
oldQuestionsData.quizzes.forEach(quiz => {
    oldQuestionsMap[quiz.week] = quiz.questions;
});

const newQuestionsMap = {};
newQuestionsData.quizzes.forEach(quiz => {
    newQuestionsMap[quiz.week] = quiz.questions;
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  const oldWeeks = oldQuestionsData.quizzes.map(quiz => ({
    week: quiz.week,
    title: quiz.title,
    questionCount: quiz.questions.length
  }));
  const newWeeks = newQuestionsData.quizzes.map(quiz => ({
    week: quiz.week,
    title: quiz.title,
    questionCount: quiz.questions.length
  }));
  res.render('index', { oldWeeks, newWeeks });
});

app.get('/quiz', (req, res) => {
  const { weeks, shuffle } = req.query;
  let selectedWeeks = []; // This will contain strings like 'old_1', 'new_2'
  
  if (weeks) {
    if (Array.isArray(weeks)) {
      selectedWeeks = weeks;
    } else if (typeof weeks === 'string') {
      selectedWeeks = weeks.split(',');
    }
  }
  
  if (selectedWeeks.length === 0) {
    return res.redirect('/');
  }

  let questions = [];
  let displayWeeks = new Set();
  let setsUsed = new Set();

  selectedWeeks.forEach(weekStr => {
    const parts = weekStr.split('_');
    if (parts.length === 2) {
      const qSet = parts[0];
      const week = parseInt(parts[1]);
      displayWeeks.add(week);
      setsUsed.add(qSet);
      
      if (qSet === 'old' && oldQuestionsMap[week]) {
        questions = questions.concat(oldQuestionsMap[week].map(q => ({...q, sourceSet: 'old'})));
      } else if (qSet === 'new' && newQuestionsMap[week]) {
        questions = questions.concat(newQuestionsMap[week].map(q => ({...q, sourceSet: 'new'})));
      }
    }
  });

  // Shuffle if requested
  if (shuffle === 'true') {
    questions = questions.sort(() => Math.random() - 0.5);
  }
  
  let questionSetDisplay = 'Mixed Sets';
  if (setsUsed.size === 1) {
    questionSetDisplay = setsUsed.has('new') ? 'New (2025)' : 'Old (Last Year)';
  }

  res.render('quiz', { 
    questions,
    weeks: Array.from(displayWeeks),
    shuffle: shuffle === 'true',
    questionSetDisplay
  });
});

app.post('/submit', (req, res) => {
  const userAnswers = req.body;
  let score = 0;
  const results = [];
  
  // Create a flat list of all questions to easily find them by ID and sourceSet
  const allQuestions = [];
  Object.values(oldQuestionsMap).forEach(qList => qList.forEach(q => allQuestions.push({...q, sourceSet: 'old'})));
  Object.values(newQuestionsMap).forEach(qList => qList.forEach(q => allQuestions.push({...q, sourceSet: 'new'})));

  // Iterate over all submitted fields
  for (const [key, answer] of Object.entries(userAnswers)) {
      if (key.startsWith('answer_')) {
          // Extract the question ID and sourceSet
          const parts = key.split('_');
          if (parts.length >= 3) {
              const questionId = parseInt(parts[1]);
              const sourceSet = parts[2];
              
              const question = allQuestions.find(q => q.id === questionId && q.sourceSet === sourceSet);
              
              if (question) {
                  const isCorrect = question.correct === answer;
                  if (isCorrect) score++;

                  results.push({
                      question: question.question,
                      options: question.options,
                      userAnswer: answer,
                      correct: question.correct,
                      correctAnswer: question.correct,
                      isCorrect: isCorrect,
                      explanation: question.explanation
                  });
              }
          }
      }
  }

  const totalQuestions = results.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  res.render('results', {
    correct: score,
    totalQuestions,
    percentage,
    results
  });
});

app.get('/results', (req, res) => {
  res.render('results', { correct: 0, totalQuestions: 0, percentage: 0, results: [] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
