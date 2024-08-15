import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./reducers/formReducer";
import LanguageReducer from "./reducers/languageReducer";
import quizReducer from "./reducers/quizReducer";

export const store = configureStore({
  reducer: { form: formReducer, language: LanguageReducer, quiz: quizReducer },
});
