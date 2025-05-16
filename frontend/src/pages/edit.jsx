import { useState, useEffect } from "react";

function Edit() {
  // const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL

  // Array of questions for styling purposes (npm run dev)
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      answera: "Berlin",
      answerb: "Madrid",
      answerc: "Paris",
      correctanswer: "Paris",
    },
    {
      id: 2,
      question: "What is the capital of Germany?",
      answera: "Berlin",
      answerb: "Madrid",
      answerc: "Paris",
      correctanswer: "Berlin",
    },
    {
      id: 3,
      question: "What is the capital of Spain?",
      answera: "Berlin",
      answerb: "Madrid",
      answerc: "Paris",
      correctanswer: "Madrid",
    },
  ];

  // useEffect(() => {
  //   fetchQuestions();
  // }, []);

  // const fetchQuestions = async () => {
  //   setLoading(true); // Ladezustand aktivieren
  //   try {
  //     const response = await fetch(`/${API_URL}/questions`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setQuestions(data);
  //     } else {
  //       console.error("Failed to fetch questions");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false); // Ladezustand deaktivieren
  //   }
  // };

  const createNewQuiz = async () => {
    setLoading(true); // Ladezustand aktivieren
    try {
      const response = await fetch(`/${API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          answerA,
          answerB,
          answerC,
          correctAnswer,
        }),
      });

      if (response.ok) {
        setMessage("Quiz created successfully!");
      } else {
        setMessage("Failed to create quiz.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ladezustand deaktivieren
    }
  };

  const deleteQuiz = async () => {
    setLoading(true); // Ladezustand aktivieren
    try {
      const response = await fetch(`/${API_URL}/questions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setMessage("Quiz deleted successfully!");
      } else {
        setMessage("Failed to delete quiz.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ladezustand deaktivieren
    }
  };

  if (!message)
    return (
      <div className="bg-gray-900 text-amber-100 min-h-screen w-full flex justify-center items-center">
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-4">Edit Quiz</h1>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              className="flex w-200 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setQuestion(event.target.value)}
            />
            <input
              type="text"
              placeholder="Answer A"
              className="flex w-200 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setAnswerA(event.target.value)}
            />
            <input
              type="text"
              placeholder="Answer B"
              className="flex w-200 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setAnswerB(event.target.value)}
            />
            <input
              type="text"
              placeholder="Answer C"
              className="flex w-200 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setAnswerC(event.target.value)}
            />
            <input
              type="text"
              placeholder="Correct Answer"
              className="flex w-200 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setCorrectAnswer(event.target.value)}
            />
            <button
              className="flex-row w-64 mr-72 justify-center p-2 bg-emerald-600 hover:bg-emerald-400 ring-2 ring-emerald-900 shadow-md shadow-emerald-400/50 hover:shadow-emerald-400/50 transition-all rounded"
              onClick={(e) => {
                e.preventDefault();
                createNewQuiz();
              }}
              disabled={loading} // Button deaktivieren, wenn geladen wird
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <input
              type="text"
              placeholder="ID"
              className="w-10 mr-4 p-2 bg-gray-800 border border-gray-700 rounded"
              onChange={(event) => setId(event.target.value)}
            />
            <button
              className="flex-row w-50 bg-rose-500 hover:bg-rose-400 p-2 bg- rounded"
              onClick={(e) => {
                e.preventDefault();
                deleteQuiz();
              }}
            >
              Delete
            </button>
          </form>
          <ul className="max-h-50 overflow-y-auto">
            {questions.map((question) => (
              <li
                key={question.id}
                className="bg-gray-800 p-4 mb-2 rounded shadow-md"
              >
                <p>{question.question}</p>
                <p>{question.answera}</p>
                <p>{question.answerb}</p>
                <p>{question.answerc}</p>
                <p>{question.correctanswer}</p>
                <button
                  className="mt-2 p-2 bg-red-600 hover:bg-red-700 rounded"
                  onClick={() => setId(question.id)}
                >
                  Select for Deletion
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
      <div className="h-70">
        <h1 className="text-3xl font-bold mb-4">{message}</h1>
        <button
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
          onClick={() => setMessage("")}
        >
          Create another quiz
        </button>
      </div>
    </div>
  );
}

export default Edit;
