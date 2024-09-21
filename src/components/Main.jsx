import React from "react";
import "./Main.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = ({ currentNote, onUpdatedNotes }) => {
  function handleEditeNote(key, value) {
    onUpdatedNotes({
      ...currentNote,
      [key]: value,
      updatedAt: new Date().toISOString(),
    });
  }

  if (!currentNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={currentNote.title}
          placeholder="タイトル"
          onChange={(e) => handleEditeNote("title", e.target.value)}
        />
        <textarea
          id="content"
          value={currentNote.content}
          placeholder="本文"
          onChange={(e) => handleEditeNote("content", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{currentNote.title}</h1>
        <ReactMarkdown className="markdown-preview" remarkPlugins={[remarkGfm]}>
          {currentNote.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
