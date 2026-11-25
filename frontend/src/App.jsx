import { useEffect, useState } from 'react'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async() => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/");
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1>Hello world</h1>
      <div>
        <input type="text" placeholder="Name"/>
        <button>Submit</button>
      </div>
      {notes.map((note) => (
        <div>
          <p>Title: {note.title}</p>
          <p>Text: {note.text}</p>
        </div>
      ))}
    </>
  )
}

export default App
