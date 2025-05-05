const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let questions = [
    { 
        id: 1,
        question: 'What is your name?'
    }
];

let answers = [
    { 
        id: 1,
        answerA: "My name is Marc Droit.",
        answerB: 'My name is Marc Droit.',
        answerC: 'My name is Marc Droit.',
        answerD: 'My name is Marc Droit.'
    }
];

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

app.get('/questions', (req, res) => {
    if (questions) {
        res.status(200).json(questions);
    }
    else {
        res.status(404).json({ message: 'No questions found' });
    }
});

app.get('/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = questions.find(question => question.id === id);

    if (question) {
        res.status(200).json(question);
    } else {
        res.status(404).json({ message: 'Question not found' });
    }
});

app.get('/answers', (req, res) => {
    if (answers) {
        res.status(200).json(answers);
    }
    else {
        res.status(404).json({ message: 'No answers found' });
    }
});

app.get('/answers/:id', (req, res) => {
    const id = Number(req.params.id);
    const answer = answers.find(answer => answer.id === id);

    if (answer) {
        res.status(200).json(answer);
    } else {
        res.status(404).json({ message: 'Answer not found' });
    }
});

app.post('/questions', (req, res) => {
    const question = {
        id: questions.length + 1,
        question: req.body.question,
    };
    if (req.body.question) {
        questions.push(question);
        res.status(201).json({ message: 'Question added successfully' });
    } else {
        res.status(400).json({ message: 'Question is required' });
    }
});

app.post('/answers', (req, res) => {
    const answer = {
        id: answers.length + 1,
        answerA: req.body.answerA,
        answerB: req.body.answerB,
        answerC: req.body.answerC,
        answerD: req.body.answerD
    };
    if (req.body.answerA && req.body.answerB && req.body.answerC && req.body.answerD) {
        answers.push(answer);
        res.status(201).json({ message: 'Answer added successfully' });
    } else {
        res.status(400).json({ message: 'Answer is required' });
    }
});

app.delete('/questions/:id', (req, res) => {
    const id = Number(req.params.id);
    const question = questions.find(question => question.id === id);

    if (question) {
        questions = questions.filter(question => question.id !== id);
        res.status(200).json({ message: 'Question deleted successfully' });
    } else {
        res.status(404).json({ message: 'Question not found' });
    }
});

app.delete('/answers/:id', (req, res) => {
    const id = Number(req.params.id);
    const answer = answers.find(answer => answer.id === id);

    if (answer) {
        answers = answers.filter(answer => answer.id !== id);
        res.status(200).json({ message: 'Answer deleted successfully' });
    } else {
        res.status(404).json({ message: 'Answer not found' });
    }
});

