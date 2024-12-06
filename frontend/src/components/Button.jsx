const Button = ({ type, children, className, onClick }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`py-2 px-4 font-semibold rounded-lg shadow-md ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  