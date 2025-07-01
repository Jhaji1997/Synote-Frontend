import Logo from "../ui/logo.jsx";
import Button from "../ui/button.jsx";
import ThemeButton from "../ui/themeButton.jsx";

function LandingNav() {
  // < className="pt-28"> for components under nav

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-28 bg-light-background dark:bg-gray-900 flex justify-between items-center px-8 transition-colors duration-300">
      <div className="flex items-center text-3xl font-Exo-2 font-medium italic text-blue-400">
        Synote
        <Logo width="25" className="ml-2 mt-1" />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeButton></ThemeButton>
        <Button
          bgColor="bg-transparent hover:text-gray-500"
          textColor="text-black dark:text-white"
          className="font-semibold"
        >
          Get Started
        </Button>
        <Button
          bgColor="bg-blue-400 hover:bg-blue-500"
          className="font-semibold text-white"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default LandingNav;
