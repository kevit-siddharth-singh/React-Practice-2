/* eslint-disable react/prop-types */

const PrevBtn = ({prev}) => {
  return (
    <>
      <button
        onClick={prev}
        className="bg-red-500 px-6 py-2 rounded-md text-white font-semibold tracking-wider text-[1.3rem] cursor-pointer hover:bg-red-600"
      >
        Prev
      </button>
    </>
  );
};

export default PrevBtn;
