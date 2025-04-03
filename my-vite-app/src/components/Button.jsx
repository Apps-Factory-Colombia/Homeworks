import React from "react";

function Button({ text, handleFunction }) {
  return (
    <div>
      <button
        onClick={() => handleFunction()}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 active:scale-95 cursor-pointer"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
