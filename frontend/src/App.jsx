import { useEffect, useState } from 'react'

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [newTitle, setNewTitle] = useState("");

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

  const addNote = async() => {
    const noteData = {
      title,
      text
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      setNotes((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async(pk, text) => {
    const noteData = {
      title: newTitle,
      text
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notes/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      const data = await response.json();
      setNotes((prev) => prev.map((note) => {
        if (note.id === pk) {
          return data;
        } else {
          return note;
        }
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async(pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/notes/${pk}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((note) => note.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Hello world</h1>
      <div>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Text" onChange={(e) => setText(e.target.value)}/>
        <button onClick={addNote}>Submit</button>
      </div>
      {notes.map((note) => (
        <div>
          <p>Title: {note.title}</p>
          <p>Text: {note.text}</p>
          <input type="text" placeholder="New Title" onChange={(e) => setNewTitle(e.target.value)}/>
          <button onClick={() => updateTitle(note.id, note.text)}>Change Title</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default App
