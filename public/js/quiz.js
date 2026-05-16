// Quiz Navigation
let currentQuestion = 0;
const questions = document.querySelectorAll('.question-card');
const totalQuestions = questions.length;

function showQuestion(index) {
    // Hide all questions
    questions.forEach(q => q.classList.remove('active'));
    
    // Show current question
    if (questions[index]) {
        questions[index].classList.add('active');
        currentQuestion = index;
        updateProgress();
    }
}

function getCurrentQuestionAnswer() {
    const currentCard = questions[currentQuestion];
    if (!currentCard) {
        return null;
    }

    return currentCard.querySelector('input[type="radio"]:checked');
}

function updateProgress() {
    const progressBar = document.querySelector('#progress');
    if (progressBar) {
        progressBar.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    }
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
        prevBtn.style.opacity = currentQuestion === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentQuestion === 0 ? 'not-allowed' : 'pointer';
    }
    
    if (nextBtn) {
        if (currentQuestion === totalQuestions - 1) {
            nextBtn.textContent = '✓ Submit Quiz';
            nextBtn.classList.remove('btn-secondary');
            nextBtn.classList.add('btn-primary');
            nextBtn.onclick = function() {
                if (submitBtn) submitBtn.click();
            };
        } else {
            nextBtn.textContent = 'Next →';
            nextBtn.classList.remove('btn-primary');
            nextBtn.classList.add('btn-secondary');
            nextBtn.onclick = nextQuestion;
        }
    }
    
    if (submitBtn) {
        submitBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        if (!getCurrentQuestionAnswer()) {
            alert('Please select an answer before going to the next question.');
            return;
        }

        currentQuestion++;
        showQuestion(currentQuestion);
        window.scrollTo(0, 0);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        window.scrollTo(0, 0);
    }
}

// Initialize first question
document.addEventListener('DOMContentLoaded', function() {
    if (questions.length > 0) {
        showQuestion(0);
    }

    // Hide skeleton placeholder if present
    const pageSkeleton = document.getElementById('page-skeleton');
    if (pageSkeleton) pageSkeleton.style.display = 'none';

    // Add form submission validation
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            autoSaveAnswers();
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextQuestion();
        } else if (e.key === 'ArrowLeft') {
            previousQuestion();
        }
    });
});

// Add auto-save functionality
function autoSaveAnswers() {
    const answers = {};
    const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
    
    answerInputs.forEach(input => {
        const name = input.name;
        answers[name] = input.value;
    });
    
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
}

// Save answers on change
document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        autoSaveAnswers();
    }
});

// Restore answers if page is refreshed
window.addEventListener('load', function() {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
        const answers = JSON.parse(savedAnswers);
        Object.keys(answers).forEach(name => {
            const input = document.querySelector(`input[name="${name}"][value="${answers[name]}"]`);
            if (input) {
                input.checked = true;
            }
        });
    }
});

// Clear saved answers after quiz submission
const quizForm = document.getElementById('quizForm');
if (quizForm) {
    quizForm.addEventListener('submit', function() {
        localStorage.removeItem('quizAnswers');
    });
}
