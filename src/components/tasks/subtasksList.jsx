import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubtasks } from "../../store/subtaskSlice";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";

function SubtaskList() {
  const { taskId } = useParams();
  const subtasks = useSelector((state) => state.subtasks.subtasks);
  const loading = useSelector((state) => state.subtasks.loading);
  const error = useSelector((state) => state.subtasks.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getSubtasks(taskId));
    }
  }, [dispatch, taskId]);

  return (
    <div className="relative w-full p-4">
      {/* Subtasks List */}
      {loading && <p className="text-gray-500">Loading subtasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && subtasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-xl text-gray-500 mb-4">No subtasks yet</p>
          <button
            onClick={() => console.log("Create Subtask")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            Create Subtask
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {subtasks.map((subtask) => (
            <div
              key={subtask._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded bg-white shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                {subtask.content}
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => console.log("Edit Subtask", subtask._id)}
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
      <button
        onClick={() => console.log("Create Subtask")}
        title="Create Subtask"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
}

export default SubtaskList;
