import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import QuizData from "../Data/QuizData.js";
import { useSelector } from "react-redux";

const Quiz = () => {
  const { selectedLanguage, firstName, lastName, email } =
    useContext(appContext);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Todo: -- [Currently Working].
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // Sid: Function for handling Selected Answer
  // !Local Selected Option State
  const [localSelectedOption, setLocalSelectedOption] = useState("");
  function selectAnswer(id, option, idx) {
    setLocalSelectedOption(option);
  }

  // Registering Answer in the State
  function RegisterAnswer() {
    //  ! Currently Working here - I left here ....
    setSelectedAnswers([
      ...selectedAnswers,
      {
        id: questionCounter + 1,
        answer: localSelectedOption,
      },
    ]);
  }

  console.log(selectedAnswers);
  // Registering Answer in the State

  // Todo: -- [Currently Working].

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

  // Sid: Next Question Logic-Btn Starts Here
  function prev() {
    if (questionCounter > 0) {
      const current = questionCounter - 1;
      setQuestionCounter(current);
      setCurrentQuestion(QuizData[selectedLanguage][current]);
      console.log("prev");
    }
  }
  function next() {
    if (questionCounter < 4) {
      const current = questionCounter + 1;
      setQuestionCounter(current);
      setCurrentQuestion(QuizData[selectedLanguage][current]);
      // Registering Answer..card
      RegisterAnswer();
      console.log("next");
    }
  }

  // Sid: Next Question Logic-Btn Ends Here

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
      }
    }, 1000);

    //! Cleanup Function for Timer!
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const navigate = useNavigate();
  function handleBlur() {
    // window.alert("U have switched tab not allowed");
    // document.title = "Failed";
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
                data-seconds="30"
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
                className="option bg-gray-600 w-[48%] p-3 rounded-md hover:bg-gray-700 ease-in-out duration-200 cursor-pointer "
              >
                {option} {idx}
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
            onClick={next}
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
