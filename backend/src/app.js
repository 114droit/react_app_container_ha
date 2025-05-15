import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import questionsRoutes from "./routes/questions.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:8080"], // Anfragen von localhost:5173 und localhost:3000 erlauben
    })
);

//Routes for API Endpoints
app.use("/questions", questionsRoutes);

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

// API root endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
    logger.info("API root endpoint accessed");
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
    logger.info("Health check successful");
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
