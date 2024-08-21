import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAnswer } from "../Redux/Actions";
import {
  NEXT_QUESTION,
  PREV_QUESTION,
  CLEAR_ANSWERS,
} from "../Redux/Action_Types";
import PrevBtn from "../Components/PrevBtn";
import ClearSelectionBtn from "../Components/ClearSelectionBtn";
import NextBtn from "../Components/NextBtn";
import QuestionCounter from "../Components/QuestionCounter";

const Quiz = () => {
  // Accessing Store Form Data from Store
  const { selectedLanguage, firstName, lastName, email } = useSelector(
    (state) => state.form
  );

  // Accessing Store Language Data from Store
  const { questions } = useSelector((state) => state.language ?? []);

  // Accessing Select answer data from Redux Store
  const selectedAnswers = useSelector((state) => state.quiz.selectedAnswers);

  const currentQuestionId = useSelector(
    (state) => state.quiz.currentQuestionId
  );

  

  // Dispatcher
  const dispatch = useDispatch();

  // Local State
  const [questionCounter, setQuestionCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  
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

  



  // Note: Prev Btn Functionality
  function prev() {
    if (questionCounter > 0) {
      setQuestionCounter((prevCounter) => prevCounter - 1);
      dispatch({
        type: PREV_QUESTION,
        payload: questions[questionCounter - 1]?.id,
      });
    }
  }

  


  // Sid: Next Question Logic-Btn Starts Here
  function next() {
    if (questionCounter < questions.length - 1) {
      setQuestionCounter((prevCounter) => prevCounter + 1);
      dispatch({
        type: NEXT_QUESTION,
        payload: questions[questionCounter + 1]?.id,
      });
    } else {
      submit();
    }
  }

  // Select Answer function
  function selectAnswer(questionId, option, idx) {
    dispatch(
      setSelectedAnswer({
        useranswer: option,
        questionId,
        buttonId: idx,
      })
    );
  }

  // !: Clear Selected Button Functionality
  function clearSelection() {
    if (currentQuestionId !== null) {
      dispatch({
        type: CLEAR_ANSWERS,
        payload: { questionId: currentQuestionId },
      });
    }
  }

  // component mount phase to set the first question
  useEffect(() => {
    if (selectedLanguage && questions.length > 0) {
      setCurrentQuestion(questions[questionCounter]);
      dispatch({
        type: NEXT_QUESTION,
        payload: questions[questionCounter]?.id,
      });
    }

    // Handling Timer Updates
    const timerId = setInterval(() => {
      updateTimer();
      if (Number(timerUI.current.dataset.seconds) === 0) {
        clearInterval(timerId);
        window.alert("Exams over");
        submit();
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCounter, selectedLanguage, questions, dispatch]);

  const navigate = useNavigate();
  function handleBlur() {
    // if (!isExamEnded) {
    //   window.alert("You have switched tab not allowed!");
    //   document.title = "Failed";
    //   navigate("/result");
    //   setIsExamEnded(false);
    // }
  }

  // For Handling Cheating and Tab Change
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
      window.removeEventListener("blur", handleBlur);
    };
  }, [selectedLanguage, firstName, lastName, email, navigate]);

  // Submit function (assuming it exists)
  
  function submit() {
    // Calculate the score
    const correctAnswers = questions.reduce((acc, question) => {
      acc[question.id] = question.correct_answer;
      return acc;
    }, {});

    let score = 0;
    const incorrectAnswers = [];

    // Iterate through all questions to find unanswered ones
    questions.forEach((question) => {
      const userAnswer = selectedAnswers.find(
        (answer) => answer.questionId === question.id
      )?.useranswer;

      if (userAnswer === undefined) {
        // Add unanswered question to incorrectAnswers
        incorrectAnswers.push({
          questionId: question.id,
          question: question.question,
          userAnswer: "not answered",
          correctAnswer: correctAnswers[question.id],
        });
      } else if (userAnswer === correctAnswers[question.id]) {
        // Correct answer
        score++;
      } else {
        // Incorrect answer
        incorrectAnswers.push({
          questionId: question.id,
          question: question.question,
          userAnswer: userAnswer,
          correctAnswer: correctAnswers[question.id],
        });
      }
    });

    const totalQuestions = questions.length;

    // Navigate to result page
    navigate("/result", {
      state: {
        score,
        totalQuestions,
        incorrectAnswers,
        isSubmitted: true,
      },
    });
  }

  // JSX CODE FOR QUIZ APP
  return (
    <>
      <div className="quiz-wrapper bg-[#171B2C] w-full h-full flex justify-center items-center flex-col gap-16 select-none">
        <div className="question-content w-[75%] h-[60%] bg-gray-900 text-white p-10 rounded-xl">

          <QuestionCounter questionCounter={questionCounter} />
          
          <div className="question">
            <p className="text-[2.5rem] ">{currentQuestion?.question}</p>
          </div>
          <div className="timer-wrapper flex justify-center items-center">
            <div className="mt-3 timer w-[4.5rem] h-[4.5rem] border-[5px] border-red-500 rounded-full flex justify-center items-center ">
              <p
                data-seconds="300"
                ref={timerUI}
                className="text-[1.2rem] font-semibold "
              >
                5
              </p>
            </div>
          </div>
          <div className="option-wrapper flex w-full justify-between flex-wrap gap-3 mt-9">
            {currentQuestion?.options?.map((option, idx) => (
              <div
                onClick={() => selectAnswer(currentQuestion?.id, option, idx)}
                key={idx}
                className={`option w-[48%] p-3 rounded-md cursor-pointer ease-in-out duration-200 ${
                  idx ===
                  selectedAnswers.find(
                    (answer) => answer.questionId === currentQuestion?.id
                  )?.buttonId
                    ? "bg-green-500"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="button-wrapper w-[75%] flex justify-between items-center ">
          <PrevBtn prev={prev} />

          <ClearSelectionBtn clearSelection={clearSelection} />

          <NextBtn next={next} questionCounter={questionCounter} />
        </div>
      </div>
    </>
  );
};

export default Quiz;
