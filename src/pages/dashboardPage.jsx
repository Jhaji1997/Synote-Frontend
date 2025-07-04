import LeftNav from "../components/dashboard/leftNav";
import Nav from "../components/ui/Nav";
import MainContent from "../components/dashboard/mainContent";

function dashboardPage() {
  return (
    <>
      <Nav />
      <div className="pt-20 sm:pt-24 flex bg-light-background dark:bg-gray-900 min-h-screen">
        <LeftNav />
        <MainContent />
      </div>
    </>
  );
}

export default dashboardPage;
