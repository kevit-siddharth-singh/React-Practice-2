import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedAnswers } from "../Redux/Actions";
import { CLEAR_SELECTED_ANSWERS } from "../Redux/Action_Types";

const ResultCard = () => {
  const { selectedLanguage, firstName, lastName, email } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();

  function handleRetakeQuiz() {
    dispatch(clearSelectedAnswers());
    navigate("/");
  }

  const navigate = useNavigate();

  const location = useLocation();
  const { score, totalQuestions, incorrectAnswers, isSubmitted } =
    location.state || {
      score: 0,
      totalQuestions: 0,
      incorrectAnswers: [],
      isSubmitted: false,
    };

  // console.log(location.state);
  useEffect(() => {
    if (!isSubmitted) {
      // Redirect to home if quiz is not submitted
      navigate("/", { replace: true });
    }
    if (
      selectedLanguage.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === ""
    ) {
      navigate("/", { replace: true });
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex flex-col items-center justify-center text-white p-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-10 w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Quiz Results
        </h1>
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold">
            <span className="text-yellow-400">
              {firstName} {lastName}
            </span>{" "}
            {document.title === "Failed" ? (
              <span className="text-red-400">Failed</span>
            ) : (
              <span className="text-green-400">Completed</span>
            )}{" "}
            the quiz
          </p>
          <p className="text-lg font-medium">
            Language:{" "}
            <span className="text-yellow-400">{selectedLanguage}</span>
          </p>
        </div>
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold">
            Your Score: <span className="text-yellow-400">{score}</span> /{" "}
            {totalQuestions}
          </p>
        </div>
        <div className="mb-6">
          {document.title === "Failed" ? (
            <p className="text-xl text-red-400 font-semibold text-center">
              You Failed !
            </p>
          ) : incorrectAnswers.length === 0 ? (
            <p className="text-xl text-green-400 font-semibold text-center">
              Perfect! All your answers are correct!
            </p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Incorrect Answers:
              </h2>
              {incorrectAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-red-500 rounded-lg bg-red-700 bg-opacity-30"
                >
                  <p className="text-lg font-medium">
                    <span className="font-bold">
                      Question {answer.questionId}:
                    </span>{" "}
                    {answer.question}
                  </p>
                  <p className="text-md mt-2">
                    <span className="font-bold">Your Answer:</span>{" "}
                    <span className="text-red-400">
                      {answer.userAnswer === undefined
                        ? "not answered"
                        : answer.userAnswer}
                    </span>
                  </p>
                  <p className="text-md">
                    <span className="font-bold">Correct Answer:</span>{" "}
                    <span className="text-green-400">
                      {answer.correctAnswer}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            onClick={handleRetakeQuiz}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold text-lg transition duration-300 ease-in-out"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
