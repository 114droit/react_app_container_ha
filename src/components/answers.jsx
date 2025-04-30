import "../App.css";
import { useState } from "react";

function Answers() {
  const [result, setResult] = useState("");

  const answers = [
    { id: 1, text: "16", correct: true },
    { id: 2, text: "Gar keine", correct: false },
    { id: 3, text: "-5", correct: false },
    { id: 4, text: "Unendlich", correct: false },
  ];

  const checkAnswer = (answer) => {
    const selectedAnswer = answers.find((a) => a.text === answer);
    if (selectedAnswer) {
      setResult(selectedAnswer.correct ? "Richtig!" : "Falsch!");
    }
  };

  if (!result) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {answers.map((answer) => (
          <button
            key={answer.id}
            className="bg-gray-700 border rounded-sm h-10 hover:bg-gray-600 transition duration-300"
            onClick={() => checkAnswer(answer.text)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    );
  }

  if (result === "Richtig!") {
    return (
      <div className="flex justify-center items-center bg-green-500 border rounded-sm h-20 mt-4">
        {result}
      </div>
    );
  }

  else {
    return (
      <div className="flex justify-center items-center bg-red-500 border rounded-sm h-20 mt-4">
        {result}
      </div>
    );
  }
}

export default Answers;