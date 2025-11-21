const Input = ({ label, error, ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
