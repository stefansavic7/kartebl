const TextField = ({ type="text", placeholder="", value="", onChange, className="", id="" }) => {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    );
  };
  
  export default TextField;
  