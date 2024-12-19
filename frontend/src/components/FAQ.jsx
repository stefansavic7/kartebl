import React, { useState } from "react";

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[63rem] ">
      <div className={`bg-[#282231] text-white border border-gray-300 transition-all duration-300  ${isOpen ? "rounded-t-xl" : "rounded-xl"}`}>
        <div onClick={toggleFAQ} className="flex justify-between items-center p-4 cursor-pointer">
          <p className="text-lg font-medium">{question}</p>
          <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <i class="fa-solid fa-chevron-up"></i>
          </span>
        </div>
      </div>
      {isOpen ? (
  <div className="bg-zinc-100 border border-t-0 border-gray-300 p-4 rounded-b-xl transition-all duration-300">
    <p>{answer}</p>
  </div>
) : (
  <div className=" transition-all duration-300 ">
  </div>
)}
    </div>
  );
};

export default FAQ;
