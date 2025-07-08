import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNote, deleteNote } from "../../store/notesSlice.js";
import ReadOnlyEditor from "../richTextEditor/readOnlyEditor.jsx";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";

function FullNote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = useSelector((state) => state.notes.currentNote);

  useEffect(() => {
    dispatch(getNote(id));
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await dispatch(deleteNote(id)).unwrap();
      navigate("/notes");
    }
  };

  const handleEdit = () => {
    navigate(`/notes/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/notes");
  };

  if (!note) {
    return <p className="text-center mt-10 text-gray-500">Loading note...</p>;
  }

  return (
    <div className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 bg-light-background dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {note.title}
        </h1>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
          <ReadOnlyEditor content={note.content} />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <FiArrowLeft /> Back
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FiEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullNote;
