// eslint-disable-next-line react/prop-types
const ClearSelectionBtn = ({ clearSelection }) => {
  return (
    <>
      <button
        onClick={clearSelection}
        className="bg-yellow-500 px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-yellow-600"
      >
        Clear Selection
      </button>
    </>
  );
};

export default ClearSelectionBtn;
