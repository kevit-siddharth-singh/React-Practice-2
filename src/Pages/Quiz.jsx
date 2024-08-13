import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import QuizData from "../Data/QuizData.js";
import { useSelector } from "react-redux";

const Quiz = () => {
  const {
    selectedLanguage,
    firstName,
    lastName,
    email,
    isSubmitted,
    setIsSubmitted,
  } = useContext(appContext);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Track selected option index

  // Todo: -- [Currently Working].
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Sid: Function for handling Selected Answer
  // !Local Selected Option State
  const [localSelectedOption, setLocalSelectedOption] = useState(null);
  function selectAnswer(id, option, idx) {
    setLocalSelectedOption(option);
    setSelectedOptionIndex(idx); // Store the selected option index

    // Register the selected answer immediately
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.id === questionCounter + 1
      );

      if (existingAnswerIndex !== -1) {
        // If the answer already exists, update it
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex].answer = option;
        updatedAnswers[existingAnswerIndex].selectedIndex = idx;
        return updatedAnswers;
      } else {
        // If the answer does not exist, add a new entry
        return [
          ...prevAnswers,
          {
            id: questionCounter + 1,
            answer: option,
            selectedIndex: idx,
          },
        ];
      }
    });
  }

  // Extra code for registering answer
  function RegisterAnswer() {
    if (localSelectedOption !== null) {
      // Ensure an option is selected
      setSelectedAnswers((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer.id === questionCounter + 1
        );

        if (existingAnswerIndex !== -1) {
          // If the answer already exists, update it
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex].answer = localSelectedOption;
          return updatedAnswers;
        } else {
          // If the answer does not exist, add a new entry
          return [
            ...prevAnswers,
            {
              id: questionCounter + 1,
              answer: localSelectedOption,
            },
          ];
        }
      });
    }
  }

  // Extra code for registering answer

  function submit() {
    // Register the last selected answer before submitting
    RegisterAnswer();

    // Use a callback in `setSelectedAnswers` to ensure the state is fully updated before proceeding
    setSelectedAnswers((prevAnswers) => {
      // Fetch the correct answers based on the selected language
      const quizQuestions = QuizData[selectedLanguage];
      const correctAnswers = quizQuestions.map(
        (question) => question.correct_answer
      );

      // Map user answers with their corresponding questions
      const userAnswers = prevAnswers.map((answer) => answer.answer);

      // Initialize score and incorrectAnswers array
      let score = 0;
      const incorrectAnswers = [];

      // Compare user's answers with the correct ones
      for (let i = 0; i < quizQuestions.length; i++) {
        if (correctAnswers[i] === userAnswers[i]) {
          score++;
        } else {
          incorrectAnswers.push({
            questionId: quizQuestions[i].id,
            question: quizQuestions[i].question,
            correctAnswer: correctAnswers[i],
            userAnswer: userAnswers[i],
          });
        }
      }

      console.log(score);

      // Navigate to the result page with the score, total questions, and incorrect answers
      navigate("/result", {
        replace: true,
        state: {
          score,
          totalQuestions: quizQuestions.length,
          incorrectAnswers,
        },
      });

      return prevAnswers; // Return the unchanged `prevAnswers` since we are just accessing it
    });
  }

  // Accessing Store Data from Store
  const QuizData = useSelector((state) => state);

  // Accessing Store Data from Store

  //Sid Timer Function Starts Here
  const timerUI = useRef(null);

  function updateTimer() {
    if (Number(timerUI.current.dataset.seconds) >= 0) {
      timerUI.current.dataset.seconds =
        Number(timerUI.current.dataset.seconds) - 1;
      timerUI.current.innerText = `${Math.floor(
        Number(timerUI.current.dataset.seconds) / 60
      )}:${
        Math.floor(Number(timerUI.current.dataset.seconds) % 60) < 10 ? "0" : ""
      }${Math.floor(Number(timerUI.current.dataset.seconds) % 60)}`;
    }
  }

  //Sid Timer Function Ends Here

  // Note: Prev Btn Functionality

  function prev() {
    if (questionCounter > 0) {
      const current = questionCounter - 1;
      setQuestionCounter(current);
      setCurrentQuestion(QuizData[selectedLanguage][current]);

      // Restore the selected option index for the previous question
      const previousAnswer = selectedAnswers.find(
        (answer) => answer.id === current + 1
      );
      if (previousAnswer) {
        setLocalSelectedOption(previousAnswer.answer);
        setSelectedOptionIndex(previousAnswer.selectedIndex);
      } else {
        setLocalSelectedOption(null); // Clear the selection if no answer exists
        setSelectedOptionIndex(null);
      }

      console.log("prev");
    }
  }
  // Note: Prev Btn Functionality

  // Sid: Next Question Logic-Btn Starts Here
  function next() {
    if (questionCounter < 4) {
      RegisterAnswer(); // Register the current answer before moving to the next question
      const current = questionCounter + 1;
      setQuestionCounter(current);
      setCurrentQuestion(QuizData[selectedLanguage][current]);

      // Restore the selected option index for the next question
      const nextAnswer = selectedAnswers.find(
        (answer) => answer.id === current + 1
      );
      if (nextAnswer) {
        setLocalSelectedOption(nextAnswer.answer);
        setSelectedOptionIndex(nextAnswer.selectedIndex);
      } else {
        setLocalSelectedOption(null); // Clear the selection if no answer exists
        setSelectedOptionIndex(null);
      }

      console.log("next");
    } else if (questionCounter === 4) {
      RegisterAnswer(); // Register the answer for the 5th question
      submit(); // Automatically submit all answers when on the last question
    }
  }
  // Sid: Next Question Logic-Btn Ends Here

  // !: Clear Selected Button Functionality
  function clearSelection() {
    setLocalSelectedOption(null);
    setSelectedOptionIndex(null);

    // Also update the `selectedAnswers` state to remove the answer for the current question
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (answer) => answer.id !== questionCounter + 1
      );
      return updatedAnswers;
    });
  }

  // !: Clear Selected Button Functionality

  //   component mount phase to set the first question
  useEffect(() => {
    if (selectedLanguage) {
      setCurrentQuestion(QuizData[selectedLanguage][questionCounter]);
      //   console.log(QuizData[selectedLanguage][0]);
    }

    // Handling Timer Updates

    const timerId = setInterval(() => {
      updateTimer();
      if (Number(timerUI.current.dataset.seconds) == 0) {
        clearInterval(timerId);
        window.alert("Exams over");
        submit();
      }
    }, 1000);

    //! Cleanup Function for Timer!
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const navigate = useNavigate();
  function handleBlur() {
    if (!isExamEnded) {
      window.alert("You have switched tab not allowed!");
      document.title = "Failed";
      navigate("/result");
    }
  }
  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    if (
      selectedLanguage.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === ""
    ) {
      navigate("/");
    }
    return () => {
      // cleanups
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  return (
    <>
      <div className="quiz-wrapper bg-[#171B2C] w-full h-full flex justify-center items-center flex-col gap-16 select-none">
        <div className="question-content  w-[75%] h-[60%] bg-gray-900 text-white p-10 rounded-xl    ">
          <div className="question-number">
            <h1 className="text-[2rem] font-semibold">
              Question : {questionCounter + 1}
            </h1>
          </div>
          <hr />
          <div className="question">
            <p className="text-[2.5rem] ">{currentQuestion?.question}</p>
          </div>
          <div className="timer-wrapper flex justify-center items-center">
            <div className="mt-3 timer w-[4.5rem] h-[4.5rem]  border-[5px]  border-red-500 rounded-full flex justify-center items-center ">
              <p
                data-seconds="300"
                ref={timerUI}
                className="text-[1.2rem] font-semibold "
              >
                5
              </p>
            </div>
          </div>
          <div className="option-wrapper flex w-full  justify-between flex-wrap gap-3  mt-9">
            {currentQuestion?.options?.map((option, idx) => (
              <div
                onClick={() => {
                  selectAnswer(currentQuestion?.id, option, idx);
                }}
                key={idx}
                className={`option w-[48%] p-3 rounded-md cursor-pointer ease-in-out duration-200 ${
                  idx === selectedOptionIndex
                    ? "bg-green-500"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="button-wrapper w-[75%]  flex justify-between items-center ">
          <button
            onClick={prev}
            className="bg-red-500 px-6 py-2 rounded-md text-white font-semibold tracking-wider text-[1.3rem] cursor-pointer hover:bg-red-600"
          >
            Prev
          </button>

          <button
            onClick={clearSelection}
            className="bg-yellow-500 px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-yellow-600"
          >
            Clear Selection
          </button>

          <button
            onClick={questionCounter == 4 ? submit : next}
            className="bg-green-500 px-6 py-2 rounded-md text-white font-semibold tracking-wider text-[1.3rem] cursor-pointer hover:bg-green-600"
          >
            {questionCounter == 4 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
