import React, { useState, useCallback } from "react";

const Son = ({ numero, increment }) => {
  console.log("Rendered:", numero);

  return (
    <button
      className="btn btn-primary mr-3"
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
};

const Father = () => {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  const increment = useCallback((num) => {
    setValor((prev) => prev + num);
  }, []);

  return (
    <div className="p-4 text-center">
      <h1>Father</h1>
      <p className="text-lg font-bold">Total: {valor}</p>
      <div className="flex justify-center space-x-2">
        {list.map((n, idx) => (
          <Son key={idx} numero={n} increment={increment} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Father />
    </div>
  );
};

export default App;
