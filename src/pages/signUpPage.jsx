import SignUpPageImage from "../assets/SignUpPageImage.svg";
import SignUpForm from "../components/forms/signUpForm";

function SignUpPage() {
  return (
    <div className="h-screen overflow-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-light-background dark:bg-gray-900">
      {/* Left side image */}
      <div className="hidden md:flex items-center justify-center bg-light-background dark:bg-gray-800 p-4">
        <img
          src={SignUpPageImage}
          alt="Join Us"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8 md:py-0 h-full">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
