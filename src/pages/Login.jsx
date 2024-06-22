import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { loggingin, setLoggingin } = useOutletContext(); // Accessing login state from context

  // Function to handle login submission
  const login = async (data) => {
    setLoggingin(true); // Start login process
    setError(""); // Clear any previous errors
    try {
      const session = await authService.login(data); // Attempt login with provided credentials
      console.log(session); // Log session details
      if (session) {
        const userData = await authService.getCurrentUser(); // Retrieve current user data
        console.log(userData); // Log user data
        if (userData) dispatch(authLogin(userData)); // Dispatch login action with user data
        navigate("/"); // Redirect to home page upon successful login
      }
    } catch (error) {
      setError(error.message); // Set error message if login fails
    } finally {
      setLoggingin(false); // Finish login process
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-20">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="text-red-50 font-bold transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {loggingin && (
          <p className="text-blue-600 mt-8 text-center">Logging in...</p>
        )}

        {/* Form for user login */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* Email input field */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              size="xs"
              name="email"
              variant="fill"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            {/* Password input field */}
            <Input
              label="Password: "
              type="password"
              size="sm"
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {/* Submit button for login */}
            <Button
              type="submit"
              className="w-full rounded-full text-white-A700 font-bold text-lg"
              color="red_50"
              shape="round"
              size="lg"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
