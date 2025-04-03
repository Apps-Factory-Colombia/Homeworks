import { useState } from "react";

const Counter = ({ defaultValue }) => {
  const [counter, setCounter] = useState(defaultValue);

  const handleSubstract = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(defaultValue);
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-64 mx-auto mt-10">
      <h1 className="text-2xl font-bold">Counter: {counter}</h1>
      <div className="mt-4 flex gap-2">
        <button onClick={handleSubstract} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Subtract
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Counter defaultValue={10} />
    </div>
  );
};

export default App;
