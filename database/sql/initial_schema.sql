CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answerA TEXT NOT NULL,
    answerB TEXT NOT NULL,
    answerC TEXT NOT NULL,
    correctAnswer TEXT NOT NULL
);