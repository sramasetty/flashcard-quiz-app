import { useState } from "react";
import { quizData } from "./quizData";
import AnswerOption from "./components/AnswerOption";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex === quizData.length - 1) {
      setIsQuizOver(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizOver(false);
  };

  // --- 1. THE GAME OVER SCREEN ---
  // If the quiz is over, we return this UI and nothing else.
  if (isQuizOver) {
    return (
      <div className="min-h-screen bg-[#3253b0] grid place-content-center p-4">
        <div className="bg-[#f2f1ff] p-10 rounded-[1.25rem] w-full max-w-md text-center">
          <h1 className="text-[#3253b0] text-4xl font-bold mb-4">
            Quiz Complete!
          </h1>
          <p className="text-[#20202a] text-xl mb-8">
            Your final score is:{" "}
            <strong className="text-[#3253b0]">
              {score} / {quizData.length}
            </strong>
          </p>
          <button
            onClick={handleRestart}
            className="w-full bg-[#3253b0] text-white font-bold p-4 rounded-xl cursor-pointer hover:bg-[#28428c] transition duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // --- 2. THE REGULAR QUIZ SCREEN ---
  // If the quiz is NOT over, we skip the block above and return this UI.
  return (
    <div className="min-h-screen bg-[#3253b0] grid place-content-center p-4">
      <div className="bg-[#f2f1ff] p-10 rounded-[1.25rem] w-full max-w-md">
        <header className="flex justify-between items-center gap-8 mb-8">
          <h1 className="text-[#3253b0] text-[2.5rem] font-bold tracking-tight">
            Quiz
          </h1>
          <strong className="text-[#3253b0] text-sm font-bold">
            Score {score}
          </strong>
        </header>

        <div className="bg-[#3253b0] min-h-55 grid place-content-center p-8 text-center rounded-2xl mb-8">
          <h2 className="text-[#f2f1ff] text-[clamp(2rem,8vw,3.5rem)] font-bold">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {currentQuestion.options.map((optionText) => (
            <AnswerOption
              key={optionText}
              text={optionText}
              onSelect={handleAnswerClick}
              isCorrect={optionText === currentQuestion.correctAnswer}
              isSelected={selectedAnswer === optionText}
              isAnswered={isAnswered}
            />
          ))}
        </div>

        <p className="mt-10 text-[#84809b] text-[0.85rem] text-center">
          Every correct answer increases your score. One mistake resets it.
        </p>
      </div>

      {/* Next Question / See Results Button */}
      <button
        onClick={handleNextQuestion}
        disabled={!isAnswered}
        className={`w-full mt-6 bg-[#3253b0] text-white font-bold p-4 rounded-xl cursor-pointer hover:bg-[#28428c] transition-all duration-300
          ${isAnswered && !isQuizOver ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {currentIndex === quizData.length - 1 ? "See Results" : "Next Question"}
      </button>
    </div>
  );
}

export default App;
