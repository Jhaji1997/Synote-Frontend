import { useState } from "react";
import RichTextEditor from "../richTextEditor/richTextEditor.jsx";
import { useDispatch } from "react-redux";
import { createNote } from "../../store/notesSlice.js";
import { useNavigate } from "react-router-dom";

function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content) return;
    const note = {
      title,
      content,
    };

    try {
      await dispatch(createNote(note)).unwrap();
      navigate("/notes");
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  return (
    <div className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 bg-light-background dark:bg-gray-900 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex flex-col gap-6"
      >
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full p-3 text-lg rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Rich Text Editor */}
        <RichTextEditor
          initialContent={null}
          onChange={(editorState) => setContent(editorState)}
          placeholder="Write note content"
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNotePage;
