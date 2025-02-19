import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

const QuestionCard = ({ questionData, onAnswerSelect, currentQuestion, totalQuestions, selectedAnswer, showFeedback }) => {
  const [integerAnswer, setIntegerAnswer] = useState("");

  const handleIntegerSubmit = () => {
    if (integerAnswer.trim() !== "") {
      onAnswerSelect(parseInt(integerAnswer, 10));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">
          Question {currentQuestion} / {totalQuestions}
        </p>
        <div className="flex items-center space-x-2">
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold mb-4">{questionData.question}</h2>

      {/* MCQ Type Question */}
      {questionData.type === "MCQ" ? (
        <div className="space-y-2">
          {questionData.options.map((option, index) => {
            const isCorrect = option.charAt(0) === questionData.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(option.charAt(0))}
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
                      selectedAnswer === option.charAt(0) && <XCircle className="w-5 h-5 text-red-600 ml-2" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        // Integer Type Question
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
          disabled={showFeedback}
          onClick={handleIntegerSubmit}
            className={`mt-2 py-3 px-4 rounded-lg w-full font-semibold transition-all ${
              showFeedback
                ? selectedAnswer === questionData.correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
           
            
          >
            {showFeedback ? (selectedAnswer === questionData.correctAnswer ? "✅ Correct" : "❌ Wrong") : "Submit Answer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
