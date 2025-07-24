import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ name: '', age: '' });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const data = await response.json();
        setSubmitted(data);
      } else {
        alert('Failed to submit');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', minWidth: 320 }}>
        <h2 style={{ marginBottom: 24 }}>Simple Form</h2>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 8 }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="age" style={{ display: 'block', marginBottom: 8 }}>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
            min="0"
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold' }}>Submit</button>
        {submitted && (
          <div style={{ marginTop: 24, background: '#e9f7ef', padding: 16, borderRadius: 4 }}>
            <strong>Submitted Data:</strong>
            <div>Name: {submitted.name}</div>
            <div>Age: {submitted.age}</div>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;