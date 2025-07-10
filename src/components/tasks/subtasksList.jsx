import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubtasks,
  createSubtask,
  updateSubtask,
} from "../../store/subtaskSlice";
import { FiEdit, FiTrash, FiPlus, FiCheck, FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";

function SubtaskList() {
  const { taskId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [subtask, setSubtask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editSubtaskId, setEditSubtaskId] = useState(null);

  const subtasks = useSelector((state) => state.subtasks.subtasks);
  const loading = useSelector((state) => state.subtasks.loading);
  const error = useSelector((state) => state.subtasks.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getSubtasks(taskId));
    }
  }, [dispatch, taskId]);

  const resetForm = () => {
    setSubtask("");
    setIsEditing(false);
    setEditSubtaskId(null);
    setShowForm(false);
  };

  const handleSaveSubtask = () => {
    if (!subtask.trim()) return;

    if (isEditing) {
      dispatch(
        updateSubtask({
          taskId,
          subtaskId: editSubtaskId,
          updatedContent: subtask,
        })
      );
    } else {
      dispatch(createSubtask({ taskId, content: subtask }));
    }

    resetForm();
  };

  const handleEdit = (subtask) => {
    setSubtask(subtask.content);
    setEditSubtaskId(subtask._id);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="relative w-full p-4">
      {/* Form for create/edit subtask */}
      {showForm && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-4 border border-green-300 bg-green-50 dark:bg-green-950 dark:border-green-600 rounded-md shadow">
          <input
            type="text"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
            placeholder="Enter subtask content"
            className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveSubtask}
              className="text-green-600 hover:text-green-800 text-xl"
              title={isEditing ? "Update Subtask" : "Save Subtask"}
            >
              <FiCheck />
            </button>
            <button
              onClick={resetForm}
              className="text-red-600 hover:text-red-800 text-xl"
              title="Cancel"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Subtasks List */}
      {loading && <p className="text-gray-500">Loading subtasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && subtasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-xl text-gray-500 mb-4">No subtasks yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            Create Subtask
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {subtasks
            .slice()
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((subtask, index) => (
              <div
                key={subtask._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded bg-white shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                  {index + 1}. {subtask.content}
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(subtask)}
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => console.log("Delete Subtask", subtask._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    title="Delete"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Floating Create Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          title="Create Subtask"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-2xl" />
        </button>
      )}
    </div>
  );
}

export default SubtaskList;
