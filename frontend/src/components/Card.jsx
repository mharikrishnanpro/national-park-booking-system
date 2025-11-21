const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-blue-50 shadow rounded-lg transition-all p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
