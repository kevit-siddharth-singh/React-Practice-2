import {
  SET_SELECTED_LANGUAGE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_IS_SUBMITTED,
  SET_QUESTIONS,
  SET_ANSWER,
  CLEAR_SELECTED_ANSWERS
} from "./Action_Types";

export const setSelectedLanguage = (language) => ({
  type: SET_SELECTED_LANGUAGE,
  payload: language,
});

export const setFirstName = (firstName) => ({
  type: SET_FIRST_NAME,
  payload: firstName,
});

export const setLastName = (lastName) => ({
  type: SET_LAST_NAME,
  payload: lastName,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setIsSubmitted = (isSubmitted) => ({
  type: SET_IS_SUBMITTED,
  payload: isSubmitted,
});

export const setQuestions = (language) => ({
  type: SET_QUESTIONS,
  payload: language,
});

// Quiz
export const setSelectedAnswer = (data) => ({
  type: SET_ANSWER,
  payload: data,
});

export const clearSelectedAnswers = () => ({
  type: CLEAR_SELECTED_ANSWERS,
});