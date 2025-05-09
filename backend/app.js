import express from 'express';
import cors from 'cors';
import fs from 'fs';
import logger from 'utils/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Logger for logging DB connection details
logger.info('Starting backend Api...');
logger.info('Database Configuration (received via ENV):',{
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: '******'
});
logger.info('----------------------------------------------------');

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
        logger.error('Error reading questions file:');
        return [];
    }
}

// Middleware to save questions to JSON file
function saveQuestions(questions) {
    try {
        const data = JSON.stringify({ questions }, null, 2);
        fs.writeFileSync('data/questions.json', data);
    } catch (error) {
        logger.error('Error saving questions file:');
    }
}


// This will start the server and listen on the specified port
const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

// API endpoints
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
    logger.info('API root endpoint accessed');
});


app.get('/questions', (req, res) => {
    logger.info('Trying to fetch all questions');
    const questions = getQuestions();
    if (questions.length > 0) {
        res.status(200).json(questions);
        logger.info('Questions fetched successfully');
    }
    else {
        res.status(404).json({ message: 'No entries found' });
        logger.error('No entries found');
    }
});

app.get('/questions/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: 'ID is required' });
        logger.error('ID is required');
        return;
    }
    logger.info('Trying to fetch question with ID:', req.params.id);
    const id = Number(req.params.id);
    const question = getQuestions().find(question => question.id === id);

    if (question) {
        res.status(200).json(question);
        logger.info('Question fetched successfully');
    } else {
        res.status(404).json({ message: 'Entry not found' });
        logger.error('Entry not found');
    }
});

app.post('/questions', (req, res) => {
    logger.info('Trying to add new question');
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
        logger.info('Entry added successfully');
    } else {
        res.status(400).json({ message: '1 Question and 4 answers required' });
        logger.error('1 Question and 4 answers required');
    }
});

app.delete('/questions/:id', (req, res) => {
    logger.info('Trying to delete question with ID:', req.params.id);
    if (!req.params.id) {
        res.status(400).json({ message: 'ID is required' });
        logger.error('ID is required');
        return;
    }
    const id = Number(req.params.id);
    const question = getQuestions().find(question => question.id === id);

    if (question) {
        const questions = getQuestions().filter(question => question.id !== id);
        saveQuestions(questions);
        res.status(200).json({ message: 'Entry deleted successfully' });
        logger.info('Entry deleted successfully');
    } else {
        res.status(404).json({ message: 'Entry not found' });
        logger.error('Entry not found');
    }
});

// Gracefull shutdown
// This function will be called when the server is shutting down
function shutdown() {
    logger.info('Shutting down server...');
    server.close(() => {
        logger.info('Server shut down gracefully');
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);  // Handle Ctrl+C Signal Interrupt
process.on('SIGTERM', shutdown); // Handle termination signal from process manager (e.g., PM2, Docker)