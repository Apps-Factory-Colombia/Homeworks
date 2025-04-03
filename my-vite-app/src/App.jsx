import { useState } from "react";
import "./App.css";
import FirstApp from "./components/FirstApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FirstApp />
    </>
  );
}

export default App;
