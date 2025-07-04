import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-gray-900 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Oops! Page not found.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
