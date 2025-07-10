import SubtaskList from "../components/tasks/subtasksList.jsx";
import Nav from "../components/ui/Nav.jsx";

function AllSubtasksPage() {
  return (
    <>
      <Nav />
      <div className="pt-20 sm:pt-24 flex bg-light-background dark:bg-gray-900 min-h-screen">
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
          <SubtaskList />
        </div>
      </div>
    </>
  );
}

export default AllSubtasksPage;
