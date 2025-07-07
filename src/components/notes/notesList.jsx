import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes,deleteNote } from "../../store/notesSlice.js";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NotesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleCreateNote = () => {
    navigate("/notes/new");
  };

  const getContentPreview = (content) => {
    try {
      const firstTextNode = content?.root?.children?.[0]?.children?.[0];
      return firstTextNode?.text || "No preview available";
    } catch {
      return "Invalid content";
    }
  };

  if (loading) return <p className="text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="relative w-full p-4">
      {notes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-xl text-gray-500 mb-4">You don’t have any notes yet.</p>
          <button
            onClick={handleCreateNote}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            Create Your First Note
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="relative p-4 border border-gray-200 rounded bg-white shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Icons */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => navigate(`/notes/edit/${note._id}`)}
                  className="text-blue-500 hover:text-blue-700 text-3xl"
                  title="Edit"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => dispatch(deleteNote(note._id))}
                  className="text-red-500 hover:text-red-700 text-3xl"
                  title="Delete"
                >
                  <FiTrash />
                </button>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                {note.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm line-clamp-3">
                {getContentPreview(note.content)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Floating Create Note Button */}
      <button
        onClick={handleCreateNote}
        title="Create New Note"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
}

export default NotesList;
