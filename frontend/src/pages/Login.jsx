import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  MailIcon,
  MessageSquare,
} from "lucide-react";
import ImagePattern from "../components/ImagePattern";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      {/* right container */}
      <ImagePattern
        title={"Welcome back, we're glad to have you!"}
        subtitle={
          "Jump right in — your friends, fun, and conversations are waiting for you!"
        }
      />

      {/* Left container */}

      <div className="flex flex-col justify-center items-center  p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10 "></div>

        {/* logo container */}

        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-2.5 group">
            <div className="w-15 h-15 rounded-2xl bg-white group-hover:bg-primary/10 transition-colors">
              <MessageSquare className="size-5 text-violet-600" />
            </div>
            <h1 className="text-2xl font-light mt-2">
              GoMein-The future of communication{" "}
            </h1>
            <p className="text-base-content/60 mt-1">
              {" "}
              Sign in to your account
            </p>
          </div>
        </div>

        {/* form container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="size-4 text-gray-500" />
              </div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 opacity-50 text-sm mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="form-control">
            <div className="label">
              <label className="label">
                <span className="label-text font-medium">Password"</span>
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-4 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-4 text-blue-200" />
                ) : (
                  <Eye className="size-4 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 opacity-50 text-sm mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2 "
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Text container */}
        <div className="text-center mt-3">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
