import { Link } from "react-router-dom";

function MainContent() {
  return (
    <main className="flex-1 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] overflow-y-auto bg-light-background dark:bg-gray-900 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Notes */}
      <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Link
          to="/notes"
          className="w-full h-full flex justify-center items-center"
        >
          <img
            src="/dashboard/notes.svg"
            alt="Notes"
            className="max-h-96 w-full object-contain"
          />
        </Link>
      </div>

      {/* Tasks */}
      <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Link
          to="/tasks"
          className="w-full h-full flex justify-center items-center"
        >
          <img
            src="/dashboard/tasks.svg"
            alt="Tasks"
            className="max-h-96 w-full object-contain"
          />
        </Link>
      </div>
    </main>
  );
}

export default MainContent;
