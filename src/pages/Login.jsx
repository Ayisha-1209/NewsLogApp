import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button } from "../components/Button";
import Input from '../components/Input';
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { loggingin, setLoggingin } = useOutletContext();

  const login = async (data) => {
    setLoggingin(true);
    setError("");
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoggingin(false);
    }
  };

  return (
    <div className='flex items-center justify-center w-full py-20'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
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
        {loggingin && <p className="text-blue-600 mt-8 text-center">Logging in...</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
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
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

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

            <Button
              type="submit"
              className="w-full rounded-full text-white-A700 font-bold text-lg"
              color="red_50"
              shape="round"
              size="lg"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
