import Answers from "../components/answers.jsx";
import Questions from "../components/questions.jsx";

function Quiz() {

  return (
    <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
      <div className="h-70">
        <Questions />
        <Answers />
      </div>
      <div className="absolute top-0 right-0 p-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.href = "/edit"}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Quiz;
