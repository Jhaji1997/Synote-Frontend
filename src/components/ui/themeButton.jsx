import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeButton() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-colors duration-300 hover:scale-110"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeButton;
