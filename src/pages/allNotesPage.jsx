import NotesList from "../components/notes/notesList.jsx";
import Nav from "../components/ui/Nav.jsx";
import LeftNav from "../components/dashboard/leftNav.jsx";

function AllNotesPage() {
  return (
    <>
      <Nav />
      <div className="pt-20 sm:pt-24 flex bg-light-background dark:bg-gray-900 min-h-screen">
        <LeftNav />
        <div className="flex-1 overflow-y-auto h-[calc(100vh-6rem)] px-4 pb-6">
          <NotesList />
        </div>
      </div>
    </>
  );
}

export default AllNotesPage;
