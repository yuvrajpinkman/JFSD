import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');

  const fetchEntries = async () => {
    const res = await axios.get('http://localhost:5000/entries');
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async () => {
    if (!title || !content) return;
    await axios.post('http://localhost:5000/entries', { title, content });
    setTitle('');
    setContent('');
    fetchEntries();
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://localhost:5000/entries/${id}`);
    fetchEntries();
  };

  const filteredEntries = entries.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="heading">📓 Daily Journal</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search..."
        className="input"
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="input"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        className="textarea"
      />

      <button onClick={addEntry} className="button add-button">
        ➕ Add Entry
      </button>

      <div className="entries">
        {filteredEntries.map((entry) => (
          <div key={entry._id} className="entry">
            <h2 className="entry-title">{entry.title}</h2>
            <p className="entry-content">{entry.content}</p>
            <button
              onClick={() => deleteEntry(entry._id)}
              className="button delete-button"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
