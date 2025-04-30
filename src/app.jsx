import "./app.css";
import Answers from "./components/answers.jsx";
import Question from "./components/question.jsx";

function App() {
  return (
    <div className="bg-gray-900 text-white h-screen flex justify-center items-center">
      <div className="h-70">
        <Question />
        <Answers />
      </div>
    </div>
  );
}

export default App;
