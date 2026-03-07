const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 p-3 rounded">
      {message}
    </div>
  );
};

export default ErrorMessage;