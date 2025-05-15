import express from 'express';
import logger from '../utils/logger.js';
import {
    findAllQuestions,
    findQuestionById,
    createQuestion,
    deleteQuestion
} from '../services/questionsServices.js';

const router = express.Router();

// GET /questions - Fetch all questions
router.get("/", async (req, res) => {
    logger.info("Trying to fetch all questions");
    const questions = await findAllQuestions();
    if (questions.length > 0) {
        res.status(200).json(questions);
        logger.info("Questions fetched successfully");
    } else {
        res.status(404).json({ message: "No entries found" });
        logger.error("No entries found");
    }
});

// GET /questions/:id - Fetch a question by ID
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(400).json({ message: "ID is required" });
        logger.error("ID is required");
        return;
    }
    logger.info(`Trying to fetch question with ID: ${id}`);
    const question = await findQuestionById(id);
    if (question) {
        res.status(200).json(question);
        logger.info("Question fetched successfully");
    } else {
        res.status(404).json({ message: "Entry not found" });
        logger.error("Entry not found");
    }
});

// POST /questions - Create a new question
router.post("/", async (req, res) => {
    logger.info("Trying to add new question");
    if (
        req.body.question &&
        req.body.answerA &&
        req.body.answerB &&
        req.body.answerC &&
        req.body.correctAnswer
    ) {
        const question = await createQuestion(req.body);
        res.status(201).json(question);
        logger.info("Entry added successfully");
    } else {
        res.status(400).json({ message: "1 Question and 4 answers required" });
        logger.error("1 Question and 4 answers required");
    }
});

// DELETE /questions/:id - Delete a question by ID
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    logger.info("Trying to delete question with ID:" + id);
    if (!id) {
        res.status(400).json({ message: "ID is required" });
        logger.error("ID is required");
        return;
    }
    const question = await deleteQuestion(id);
    if (question) {
        res.status(200).json({
            message: `Entry with ID: ${id} deleted successfully`,
        });
        logger.info(`Entry with ID: ${id} deleted successfully`);
    } else {
        res.status(404).json({ message: "Entry not found" });
        logger.error("Entry not found");
    }
});

// Export the router
export default router;