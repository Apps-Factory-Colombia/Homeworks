import React, { useState } from 'react';
import { Stack } from './Stack';

const bookStack = new Stack();


bookStack.push({ name: '1984', isbn: '1234567890', author: 'George Orwell', editorial: 'Secker & Warburg' });
bookStack.push({ name: 'El Principito', isbn: '1122334455', author: 'Antoine de Saint-Exupéry', editorial: 'Reynal & Hitchcock' });
bookStack.push({ name: 'El Principito 2', isbn: '112233445125', author: 'Antoine de Saint-Exupéry', editorial: 'Reynal & Hitchcock' });

function App() {
  const [books, setBooks] = useState(bookStack.print());
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookStack.push(form);
    setBooks(bookStack.print());
    setForm({ name: '', isbn: '', author: '', editorial: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Book Stack</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Book Name" value={form.name} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="editorial" placeholder="Editorial" value={form.editorial} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>

      <h2>📚 Stack of Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.name}</strong> - ISBN: {book.isbn} | Author: {book.author} | Editorial: {book.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
