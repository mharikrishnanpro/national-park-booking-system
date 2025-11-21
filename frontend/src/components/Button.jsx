const Button = ({ children, bgColor="bg-blue-600 hover:bg-blue-700", ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded-lg ${bgColor} transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
