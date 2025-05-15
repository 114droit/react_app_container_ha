import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
// import health from './utils/health.js';
import {
    findAllQuestions,
    findQuestionById,
    createQuestion,
    deleteQuestion,
} from "./services/questionsServices.js";
// import { testDbConnection } from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:8080"], // Anfragen von localhost:5173 und localhost:3000 erlauben
    })
);

// Logger for logging DB connection details
logger.info("Starting backend Api...");
logger.info("Database Configuration (received via ENV):", {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: "******",
});
logger.info("----------------------------------------------------");


// This will start the server and listen on the specified port
const server = app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
    logger.info("Health check successful");
});

// API endpoints
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
    logger.info("API root endpoint accessed");
});

app.get("/questions", async (req, res) => {
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

app.get("/questions/:id", async (req, res) => {
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

app.post("/questions", async (req, res) => {
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

app.delete("/questions/:id", async (req, res) => {
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

// Gracefull shutdown
// This function will be called when the server is shutting down
function shutdown() {
    logger.info("Shutting down server...");
    server.close(() => {
        logger.info("Server shut down gracefully");
        process.exit(0);
    });
}

process.on("SIGINT", shutdown); // Handle Ctrl+C Signal Interrupt
process.on("SIGTERM", shutdown); // Handle termination signal from process manager (e.g., PM2, Docker)
