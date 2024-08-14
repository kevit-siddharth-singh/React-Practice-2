import {
  SET_SELECTED_LANGUAGE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_IS_SUBMITTED,
  SET_QUESTIONS,
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
