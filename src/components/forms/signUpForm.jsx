import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Button from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const { loaading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 bg-light-background dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Enter your name"
            className={clsx(
              "w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2",
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className={clsx(
              "w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2",
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter your password"
            className={clsx(
              "w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2",
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <Button
            type="submit"
            disabled={loaading}
            isLoading={loaading}
            fullWidth
          >
            Sign Up
          </Button>
        </div>

        {/* Footer */}
        <div className="text-sm flex justify-center gap-1 dark:text-gray-300 text-gray-700 mt-2">
          <span>Already a user?</span>
          <Link to={"/login"}>
            <button
              type="button"
              className="cursor-pointer font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
