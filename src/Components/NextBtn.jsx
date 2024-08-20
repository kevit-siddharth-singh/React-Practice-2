// eslint-disable-next-line react/prop-types
const NextBtn = ({ next, questionCounter }) => {
  return (
    <>
      <button
        onClick={next}
        className="bg-green-500 px-6 py-2 rounded-md text-white font-semibold tracking-wider text-[1.3rem] cursor-pointer hover:bg-green-600"
      >
        {questionCounter === 4 ? "Submit" : "Next"}
      </button>
    </>
  );
};

export default NextBtn;
