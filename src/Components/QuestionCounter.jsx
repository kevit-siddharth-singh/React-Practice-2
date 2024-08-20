// eslint-disable-next-line react/prop-types
const QuestionCounter = ({ questionCounter }) => {
  return (
    <>
      <div className="question-number">
        <h1 className="text-[2rem] font-semibold">
          Question : {questionCounter + 1}
        </h1>
      </div>
      <hr />
    </>
  );
};

export default QuestionCounter;
