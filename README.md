# **Education for Sustainable Development** Quiz Application

A comprehensive web-based quiz application for "Education for Sustainable Development" course covering all 12 weeks.

## Features

✨ **Multiple Features:**
- 📚 Select one or multiple weeks for quiz
- 🔀 Shuffle questions option
- ✅ Real-time quiz submission
- 📊 Detailed results with score breakdown
- ❌ Review wrong answers with explanations
- ✔️ Preview correct answers
- 💾 Auto-save answers during quiz
- 📱 Fully responsive design
- 🎨 Beautiful UI with gradient themes

## Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory:**
```bash
cd nptel-Education-for-Sustainable-Development
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## How to Use

### Taking a Quiz
1. Select one or more weeks you want to quiz on
2. Optionally check "Shuffle Questions" to randomize question order
3. Click "Start Quiz"
4. Answer all questions (required)
5. Use arrow keys (← →) or scroll to navigate between questions
6. Click "Submit Quiz" when done

### Reviewing Results
- Your score percentage is displayed prominently
- **Red Section**: Shows all wrong answers with:
  - Your answer
  - Correct answer
  - (Explanations not included in this build)
- **Green Section**: Shows all correct answers for review
- Print or save results using the Print button

## Course Content

The quiz covers **120 questions** across **12 weeks**:

- **Week 1**: Introduction to ESD (10 questions)
- **Week 2**: ESD Framework & Education Concepts (10 questions)
- **Week 3**: Global Citizenship & SDG 4.7 (10 questions)
- **Week 4**: Green TVET & Entrepreneurship (10 questions)
- **Week 5**: Health Systems & Nutrition (10 questions)
- **Week 6**: Hunger & Resource Management (10 questions)
- **Week 7**: Energy & Climate Change (10 questions)
- **Week 8**: ESD & Sustainability Framework (10 questions)
- **Week 9**: Transformative Learning & Competencies (10 questions)
- **Week 10**: Sustainable Leadership (10 questions)
- **Week 11**: Leadership Styles & Global Leaders (10 questions)
- **Week 12**: Natural Resources & Sustainable Consumption (10 questions)

## Project Structure

```
esd-quiz-app/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   └── js/
│       └── quiz.js            # Quiz interactivity
├── views/
│   ├── index.ejs              # Home page
│   ├── quiz.ejs               # Quiz interface
│   └── results.ejs            # Results page
├── data/
│   └── questions.json         # All quiz questions
├── server.js                  # Express server
├── package.json               # Dependencies
└── README.md                  # This file
```

## API Endpoints

- **GET** `/` - Home page (week selection)
- **GET** `/quiz?weeks=1,2&shuffle=true` - Quiz interface
- **POST** `/submit` - Submit quiz answers
- **GET** `/results` - Results page

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, EJS templating
- **Data**: JSON (questions database)
- **Styling**: CSS Grid, Flexbox, CSS Animations

## Features in Detail

### 1. Week Selection
- Select multiple weeks for comprehensive testing
- Display question count for each week
- Checkbox interface with visual feedback

### 2. Shuffle Option
- Randomize question order
- Useful for memorization testing
- Toggle-able before starting quiz

### 3. Quiz Interface
- One question per view
- Clear multiple-choice options (A, B, C, D)
- Auto-save functionality (LocalStorage)
- Progress indicator
- Keyboard navigation (Arrow keys)

### 4. Results Dashboard
- Large percentage score display
- Performance message based on score
- Detailed review of wrong answers
- Explanations are not included
- List of correct answers

### 5. Keyboard Shortcuts
- **Left Arrow (←)**: Previous question
- **Right Arrow (→)**: Next question

## Customization

### Adding New Questions
Edit `data/questions.json` to add or modify questions. Format:
```json
{
  "id": 121,
  "week": 1,
  "question": "Question text here?",
  "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
  "correct": "A",
  
}
```

### Styling
Edit `public/css/style.css` to customize colors, fonts, and layout.

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (responsive design)

## Tips for Better Learning

1. **Take it multiple times**: Shuffle questions and retake to solidify knowledge
2. **Review your answers**: Revisit questions you missed to improve understanding
3. **Focus on weak areas**: Select specific weeks where you scored lower
4. **Print results**: Save results for offline review

## Troubleshooting

### Port already in use
If port 3000 is already in use, modify `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change 3000 to another port
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Server not starting
- Ensure Node.js is properly installed
- Check that no firewall is blocking port 3000
- Look for error messages in the terminal

## Development

For development with auto-reload:
```bash
npm install -D nodemon
npm run dev
```

## License

This project is free to use for educational purposes.

## Support

For issues or improvements, please create an issue or contact the developer.

---

**Happy Learning! 📚**
