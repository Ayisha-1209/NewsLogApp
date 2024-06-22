import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for handling errors during signup
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); // React Hook Form methods for form handling

  // Function to create a new user account
  const create = async (data) => {
    setError(""); // Clear previous errors
    try {
      // Attempt to create an account with provided data
      const userData = await authService.createAccount(data);
      if (userData) {
        // If account creation is successful, log in the user and navigate to home
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message); // Set error message if account creation fails
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60 pb-5">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-red-50 font-bold transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* Signup form */}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            {/* Input fields for full name, email, and password */}
            <Input
              label=""
              name="full name"
              size="sm"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label=""
              size="sm"
              name="email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label=""
              size="sm"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {/* Button to submit the signup form */}
            <Button
              type="submit"
              className="w-full rounded-xl text-white-A700 font-bold text-lg"
              color="red_50"
              shape="round"
              size="lg"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
