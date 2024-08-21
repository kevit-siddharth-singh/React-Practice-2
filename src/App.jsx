import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound.jsx";
import { Routes, Route } from "react-router-dom";
import Test from "./Pages/Test.jsx";
import Quiz from "./Pages/Quiz.jsx";
import ResultCard from "./Pages/ResultCard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/quiz"} element={<Quiz />} />
        <Route exact path={"/result"} element={<ResultCard />} />
        <Route exact path={"/test"} element={<Test />} />
        <Route exact path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
