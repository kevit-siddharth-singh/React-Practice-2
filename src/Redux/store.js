import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./reducers/formReducer";
import LanguageReducer from "./reducers/languageReducer";

export const store = configureStore({
  reducer: { form: formReducer, language: LanguageReducer },
});
