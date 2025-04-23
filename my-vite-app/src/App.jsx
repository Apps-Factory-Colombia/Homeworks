import React, { useState } from 'react';
import { Queue } from './Queue';

const peopleQueue = new Queue();

// Datos 
peopleQueue.enqueue({ name: 'Ana', amount: 50000 });
peopleQueue.enqueue({ name: 'Luis', amount: 20000 });
peopleQueue.enqueue({ name: 'Pepe', amount: 20000 });
function App() {
  const [queue, setQueue] = useState(peopleQueue.print());
  const [form, setForm] = useState({ name: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    peopleQueue.enqueue({ name: form.name, amount: parseInt(form.amount, 10) });
    setQueue(peopleQueue.print());
    setForm({ name: '', amount: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏧 ATM Queue</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Withdrawal Amount" value={form.amount} onChange={handleChange} required />
        <button type="submit">Add to Queue</button>
      </form>

      <h2>👥 People in Queue</h2>
      <ul>
        {queue.map((person, index) => (
          <li key={index}>
            <strong>{person.name}</strong> - Withdrawal: ${person.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
