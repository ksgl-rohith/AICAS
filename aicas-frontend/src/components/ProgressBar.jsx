const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded h-3">
      <div
        className="bg-green-500 h-3 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;