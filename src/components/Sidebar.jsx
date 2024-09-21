import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  handleNoteClick,
  notes,
  handleDeleteNote,
  currentNote,
  setCurrentNote,
}) => {
  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt); // 日付を比較するためにDateオブジェクトに変換
  });

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={handleNoteClick}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            className={`app-sidebar-note ${
              note.id === currentNote && "active"
            }`}
            key={note.id}
            onClick={() => setCurrentNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => handleDeleteNote(note.id)}>削除</button>
            </div>
            <div className="sidebar-note-body">
              <p>{note.content}</p>
              <small>
                更新日:{" "}
                {new Date(note.updatedAt).toLocaleDateString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
