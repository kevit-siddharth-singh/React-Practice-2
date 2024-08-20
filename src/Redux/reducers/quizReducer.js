import {
  SET_ANSWER,
  NEXT_QUESTION,
  PREV_QUESTION,
  CLEAR_ANSWERS,
  CLEAR_SELECTED_ANSWERS,
} from "../Action_Types";

const initialState = {
  selectedAnswers: [],
  currentQuestionId: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER: {
      const { useranswer, questionId, buttonId } = action.payload;
      const existingAnswerIndex = state.selectedAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      const newSelectedAnswers = [...state.selectedAnswers];
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        newSelectedAnswers.splice(existingAnswerIndex, 1, { questionId, useranswer, buttonId });
      } else {
        // Add new answer
        newSelectedAnswers.push({ questionId, useranswer, buttonId });
      }

      return {
        ...state,
        selectedAnswers: newSelectedAnswers,
      };
    }

    case NEXT_QUESTION: {
      return {
        ...state,
        currentQuestionId: action.payload, // Assuming sequential IDs
      };
    }

    case PREV_QUESTION: {
      return {
        ...state,
        currentQuestionId: action.payload, // Assuming sequential IDs
      };
    }

    case CLEAR_ANSWERS: {
      const { questionId } = action.payload;
      console.log("CLEAR_ANSWERS reducer called with questionId:", questionId);

      return {
        ...state,
        selectedAnswers: state.selectedAnswers.filter(
          (answer) => answer.questionId !== questionId
        ), // Remove the answer for the specified questionId
      };
    }

    case CLEAR_SELECTED_ANSWERS:
      return {
        ...state,
        selectedAnswers: [],
      };

    default:
      return state;
  }
};

export default quizReducer;
