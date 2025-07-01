import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import clsx from "clsx";
import Button from "../ui/button.jsx";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignUpForm() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const responseData = await registerUser(data);
      console.log("Signup Successful", responseData);
      setServerError("");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign Up
        </h2>

        {serverError && (
          <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
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
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
