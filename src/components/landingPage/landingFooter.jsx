import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

function LandingFooter() {
  return (
    <footer className="w-full bg-light-background dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
        {/* Left: Creator Info */}
        <div className="text-center md:text-left">
          <p className="text-sm md:text-base">
            Created by{" "}
            <span className="font-semibold text-black dark:text-white">
              Aryan Singh Thakur
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            React · Tailwind CSS · Node.js · MongoDB
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://github.com/Aryan9inja"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} Synote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
