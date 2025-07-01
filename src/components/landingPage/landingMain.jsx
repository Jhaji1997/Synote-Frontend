import NoteImage from "../../assets/NoteImage.svg";
import TaskImage from "../../assets/TaskImage.svg";

function LandingMain() {
  return (
    <main className="w-full pt-28 px-6 py-16 md:px-12 lg:px-24 bg-light-background dark:bg-gray-900 transition-colors duration-300">
      {/* Notes Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <img
          src={NoteImage}
          alt="Note taking"
          className="w-full md:w-1/2 max-w-md"
        />
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Capture Ideas Effortlessly
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create, organize, and summarize notes instantly with the power of AI. Whether it's a journal entry, meeting summary, or spontaneous idea — we've got you covered.
          </p>
        </div>
      </section>

      {/* Tasks Section */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10">
        <img
          src={TaskImage}
          alt="Task management"
          className="w-full md:w-1/2 max-w-md"
        />
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Stay on Top of Your Tasks
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Break big goals into smaller subtasks, track your progress, and let AI summarize your progress. Smart productivity starts here.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LandingMain;
