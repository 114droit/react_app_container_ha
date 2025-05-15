// DB-Modul mit Pool-Instanz importieren
import { query } from "../db.js";

// Alle Fragen abrufen
async function findAllQuestions() {
    const res = await query("SELECT * FROM questions");
    return res.rows; // Gibt Array von Questions-Objekten zurück
}

// Eine Frage nach ID abrufen
async function findQuestionById(id) {
    const res = await query("SELECT * FROM questions WHERE id = $1", [id]); // $1 Platzhalter für Parameter
    return res.rows[0]; // Gib das erste gefundene Ergebnis zurück oder undefined, wenn nichts gefunden wurde
}

// Neue Frage erstellen
async function createQuestion(question) {
    const res = await query ('INSERT INTO questions (question, answerA, answerB, answerC, correctAnswer) VALUES ($1, $2, $3, $4, $5) RETURNING id;',[question.question, question.answerA, question.answerB, question.answerC, question.correctAnswer]); // $1, $2, ... Platzhalter für Parameter
    return res.rows[0]; // Gibt das neu erstellte Question-Objekt zurück
}

// Frage löschen
async function deleteQuestion(id) {
    const res = await query("DELETE FROM questions WHERE id = $1", [id]); // $1 Platzhalter für Parameter
    return res.rows[0]; // Gibt das gelöschte Question-Objekt zurück oder undefined, wenn nichts gelöscht wurde
}

export { findAllQuestions, findQuestionById, createQuestion, deleteQuestion };
