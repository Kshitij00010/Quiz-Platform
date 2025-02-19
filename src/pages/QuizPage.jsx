import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, XCircle, History } from "lucide-react";
import { openDB } from "idb";

const quizData = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["A. Venus", "B. Mercury", "C. Earth", "D. Mars"],
    correctAnswer: "B",
    type: "MCQ",
  },
  {
    question: "Which data structure follows FIFO?",
    options: ["A. Stack", "B. Queue", "C. Tree", "D. Graph"],
    correctAnswer: "B",
    type: "MCQ",
  },
  {
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["A. Python", "B. Java", "C. HTML", "D. C++"],
    correctAnswer: "C",
    type: "MCQ",
  },
  {
    question: " Which of these processes is not typically involved in refining petroleum?",
    options: ["A.  Fractional distillation", "B. Cracking", "C. Polymerization", "D. Filtration"],
    correctAnswer: "C",
    type: "MCQ",
  },
  {
    question: "Which chemical symbol stands for Gold?",
    options: ["A. Au", "B. Gd", "C. Ag", "D. Pt"],
    correctAnswer: "C",
    type: "MCQ",
  },
  {
    question: "What is the value of 12 + 28?",
    correctAnswer: 40,
    type: "Integer",
  },
  {
    question: "How many states are there in the United States?",
    correctAnswer:  50,
    type: "Integer",
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    correctAnswer: 1776,
    type: "Integer",
  },
  {
    question: "What is the value of pi rounded to the nearest integer?",
    correctAnswer: 3,
    type: "Integer",
  },
  {
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    correctAnswer: 120,
    type: "Integer",
  },
];
const initializeDB = async () => {
  return openDB("QuizHistoryDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("quizHistory")) {
        db.createObjectStore("quizHistory", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [integerAnswer, setIntegerAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [history, setHistory] = useState([]);

  const currentQuestion = useMemo(() => quizData[currentQuestionIndex], [currentQuestionIndex]);

  useEffect(() => {
    const fetchHistory = async () => {
      const db = await initializeDB();
      const tx = db.transaction("quizHistory", "readonly");
      const store = tx.objectStore("quizHistory");
      const history = await store.getAll();
      setHistory(history.reverse());
    };
    fetchHistory();
  }, [quizCompleted]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerSelection = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => handleNextQuestion(), 1500);
  };

  const handleIntegerSubmit = () => {
    if (integerAnswer.trim() === "") return;
    handleAnswerSelection(parseInt(integerAnswer, 10));
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIntegerAnswer("");
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
      const db = await initializeDB();
      const tx = db.transaction("quizHistory", "readwrite");
      const store = tx.objectStore("quizHistory");

      const allHistory = await store.getAll();
      const lastEntry = allHistory.length > 0 ? allHistory[allHistory.length - 1] : null;

      if (!lastEntry || lastEntry.score !== score) {
        await store.add({ score, date: new Date().toLocaleString() });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setIntegerAnswer("");
    setShowFeedback(false);
    setTimeLeft(10);
  };

  return (
    <div className="min-h-screen w-full mx-auto bg-white shadow-lg rounded-lg p-6">
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.question}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-red-500 font-bold">{timeLeft}s</span>
            </div>
          </div>

          {currentQuestion.type === "MCQ" ? (
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option.charAt(0) === currentQuestion.correctAnswer;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelection(option.charAt(0))}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-lg flex justify-between items-center border-2 transition-all duration-300 ${
                      showFeedback
                        ? selectedAnswer === option.charAt(0)
                          ? isCorrect
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "bg-red-100 border-red-500 text-red-700"
                          : isCorrect
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "bg-white border-gray-200"
                        : "bg-white hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span>{option}</span>
                    {showFeedback && (selectedAnswer === option.charAt(0) || isCorrect) && (
                      <span className="flex items-center">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
                        ) : (
                          selectedAnswer === option.charAt(0) && (
                            <XCircle className="w-5 h-5 text-red-600 ml-2" />
                          )
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4">
              <input
                type="number"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                placeholder="Enter your answer"
                value={integerAnswer}
                onChange={(e) => setIntegerAnswer(e.target.value)}
                disabled={showFeedback}
              />
              <button
                className={`mt-2 py-3 px-4 rounded-lg w-full font-semibold transition-all ${
                  showFeedback
                    ? selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={handleIntegerSubmit}
                disabled={showFeedback}
              >
                {showFeedback
                  ? selectedAnswer === currentQuestion.correctAnswer
                    ? "✅ Correct"
                    : "❌ Wrong"
                  : "Submit Answer"}
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Score: {score} / {quizData.length}</p>
          </div>
        </>
      ) :  (
        <div className="text-center p-6 bg-gray-100 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
          <p className="text-gray-700 mt-2 text-lg">
            🎉 Your final score is <span className="text-blue-600 font-bold text-2xl">{score}</span> 
            out of {quizData.length}.
          </p>
          <button
            onClick={restartQuiz}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            🔄 Restart Quiz
          </button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <History /> Previous Attempts
            </h3>
            {history.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {history.slice(0, 5).map((attempt, index) => (
                  <li key={index} className="p-3 bg-white shadow-sm rounded-md flex justify-between text-gray-700">
                    <span>{attempt.date}</span>
                    <span className="font-bold">Score: {attempt.score}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No previous attempts recorded.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}