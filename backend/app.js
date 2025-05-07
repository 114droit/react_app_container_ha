import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080'] // Anfragen von localhost:5173 und localhost:3000 erlauben
}));

// Middleware to load questions from JSON file
function getQuestions() {
    try {
        const raw = fs.readFileSync('data/questions.json');
        const parsed = JSON.parse(raw);
        return parsed.questions || [];
    } catch (error) {
        console.error('Error reading questions file:', error);
        return [];
    }
}

// Middleware to save questions to JSON file
function saveQuestions(questions) {
    try {
        const data = JSON.stringify({ questions }, null, 2);
        fs.writeFileSync('data/questions.json', data);
    } catch (error) {
        console.error('Error saving questions file:', error);
    }
}

const server = app.listen(port, () => {
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
    const question = getQuestions().find(question => question.id === id);

    if (question) {
        res.status(200).json(question);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

app.post('/questions', (req, res) => {
    const question = {
        id: getQuestions().length + 1,
        question: req.body.question,
        answerA: req.body.answerA,
        answerB: req.body.answerB,
        answerC: req.body.answerC,
        correctAnswer: req.body.correctAnswer
    };
    if (req.body.question && req.body.answerA && req.body.answerB && req.body.answerC && req.body.correctAnswer) {
        saveQuestions([...getQuestions(), question]);
        res.status(201).json({ message: 'Entry added successfully' });
    } else {
        res.status(400).json({ message: 'Questions and answers required' });
    }
});

app.delete('/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = getQuestions().find(question => question.id === id);

    if (question) {
        const questions = getQuestions().filter(question => question.id !== id);
        saveQuestions(questions);
        res.status(200).json({ message: 'Entry deleted successfully' });
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

// Gracefull shutdown
// This function will be called when the server is shutting down
function shutdown() {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server shut down gracefully');
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);  // Handle Ctrl+C Signal Interrupt
process.on('SIGTERM', shutdown); // Handle termination signal from process manager (e.g., PM2, Docker)