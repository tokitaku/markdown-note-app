import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

function App() {
  const dummyNotes = [
    {
      id: uuid(),
      title: "タイトル",
      content: "ノートの内容です",
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "タイトル2",
      content: "ノートの内容です2",
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "タイトル3",
      content: "ノートの内容です3",
      updatedAt: new Date().toISOString(),
    },
  ];

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || dummyNotes
  );
  const [currentNote, setCurrentNote] = useState(null);
  function handleNoteClick() {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容です",
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  }
  function handleDeleteNote(id) {
    const filterdNotes = notes.filter((note) => note.id !== id);
    setNotes(filterdNotes);
  }
  function getCurrentNote() {
    return notes.find((note) => note.id === currentNote);
  }
  function onUpdatedNotes(updatedNote) {
    // 修正された新しいノートの配列を返す処理
    const updatedNoteArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNoteArray);
  }

  useEffect(() => {
    // ノートが変更されたらローカルストレージに保存
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // 一番上のノートを選択する処理
    setCurrentNote(notes[0].id);
  }, []);

  return (
    <div className="App">
      <Sidebar
        handleNoteClick={handleNoteClick}
        notes={notes}
        handleDeleteNote={handleDeleteNote}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />
      <Main currentNote={getCurrentNote()} onUpdatedNotes={onUpdatedNotes} />
    </div>
  );
}

export default App;
