import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound.jsx";
import { Routes, Route } from "react-router-dom";
import Test from "./Pages/Test.jsx";
import { createContext, useEffect, useState } from "react";
import Quiz from "./Pages/Quiz.jsx";

  
export const appContext = createContext();

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   console.log(
  //     selectedLanguage,
  //     firstName,
  //     lastName,
  //     email
  //   );
  // }, [selectedLanguage, firstName, lastName, email]);

  return (
    <>
      <appContext.Provider
        value={{
          selectedLanguage,
          setSelectedLanguage,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          email,
          setEmail,
        }}
      >
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/quiz"} element={<Quiz />} />
          <Route exact path={"/test"} element={<Test />} />
          <Route exact path={"*"} element={<PageNotFound />} />
        </Routes>
      </appContext.Provider>
    </>
  );
}

export default App;
