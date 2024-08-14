import {
  SET_SELECTED_LANGUAGE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_IS_SUBMITTED,
} from "../Action_Types";

const initialState = {
  selectedLanguage: "",
  firstName: "",
  lastName: "",
  email: "",
  isSubmitted: false,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: action.payload };
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_IS_SUBMITTED:
      return { ...state, isSubmitted: action.payload };
    default:
      return state;
  }
};

export default formReducer;
