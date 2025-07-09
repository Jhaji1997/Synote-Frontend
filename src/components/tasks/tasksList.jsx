import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getTasks } from "../../store/tasksSlice.js";
import { FiEdit, FiTrash, FiPlus, FiCheck, FiX } from "react-icons/fi";

function TaskList() {
  const [showCreate, setShowCreate] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;

    dispatch(
      createTask({
        title: newTaskTitle,
        dueDate: newDueDate ? new Date(newDueDate).toISOString() : null,
      })
    );

    setNewTaskTitle("");
    setNewDueDate("");
    setShowCreate(false);
  };

  const handleCancel = () => {
    setNewTaskTitle("");
    setNewDueDate("");
    setShowCreate(false);
  };

  return (
    <div className="relative w-full p-4">
      {/* Optional Create Task Input */}
      {showCreate && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-4 border border-blue-300 bg-blue-50 dark:bg-blue-950 dark:border-blue-600 rounded-md shadow">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title"
            className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Due Date (Optional):
            </label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              placeholder="Set due date (optional)"
              className="px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveTask}
              className="text-green-600 hover:text-green-800 text-xl"
              title="Save"
            >
              <FiCheck />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-600 hover:text-red-800 text-xl"
              title="Cancel"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <p className="text-xl text-gray-500 mb-4">No tasks yet</p>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            Create Your First Task
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded bg-white shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                {task.dueDate && (
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <button className="text-blue-500 hover:text-blue-700 text-xl">
                  <FiEdit />
                </button>
                <button className="text-red-500 hover:text-red-700 text-xl">
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Create Button */}
      {!showCreate && (
        <button
          onClick={() => setShowCreate(true)}
          title="Create Task"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-2xl" />
        </button>
      )}
    </div>
  );
}

export default TaskList;
