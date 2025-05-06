import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let questions = [
    { 
        id: 1,
        question: 'What is your name?',
        answerA: 'None',
        answerB: 'None',
        answerC: 'None',
        correctAnswer: 'Marc Droit'
    }
];

function getQuestions() {
    try {
        const raw = fs.readFileSync('questions.json');
        const parsed = JSON.parse(raw);
        return parsed.questions || [];
    } catch (error) {
        console.error('Error reading questions file:', error);
        return [];
    }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

app.get('/questions', (req, res) => {
    const questions = getQuestions();
    if (questions.length > 0) {
        res.status(200).json(questions);
    }
    else {
        res.status(404).json({ message: 'No entries found' });
    }
});

app.get('/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = questions.find(question => question.id === id);

    if (question) {
        res.status(200).json(question);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

app.post('/questions', (req, res) => {
    const question = {
        id: questions.length + 1,
        question: req.body.question,
        answerA: req.body.answerA,
        answerB: req.body.answerB,
        answerC: req.body.answerC,
        correctAnswer: req.body.correctAnswer
    };
    if (req.body.question && req.body.answerA && req.body.answerB && req.body.answerC && req.body.correctAnswer) {
        questions.push(question);
        res.status(201).json({ message: 'Entry added successfully' });
    } else {
        res.status(400).json({ message: 'Questions and answers required' });
    }
});

app.delete('/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = questions.find(question => question.id === id);

    if (question) {
        questions = questions.filter(question => question.id !== id);
        res.status(200).json({ message: 'Entry deleted successfully' });
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});
