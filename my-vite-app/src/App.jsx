import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from './redux/counterSlice';
import { push, pop } from './redux/stackSlice';

function App() {
  const counter = useSelector((state) => state.counter.value);
  const stack = useSelector((state) => state.stack);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [stackInput, setStackInput] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔢 Counter</h1>
      <p>Value: {counter}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Increment by..."
      />
      <button onClick={() => dispatch(incrementBy(amount))}>Increment by</button>

      <hr />

      <h1>📚 Stack</h1>
      <input
        value={stackInput}
        onChange={(e) => setStackInput(e.target.value)}
        placeholder="Push to stack"
      />
      <button onClick={() => {
        dispatch(push(stackInput));
        setStackInput('');
      }}>
        Push
      </button>
      <button onClick={() => dispatch(pop())}>Pop</button>

      <ul>
        {[...stack].reverse().map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
