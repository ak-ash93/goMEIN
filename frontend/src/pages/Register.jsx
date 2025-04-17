import { React, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    signUp(data);
    toast.success("Registered successfully");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left container */}
      <div className="flex flex-col justify-center items-center  p-6 sm:p-12">
        <div className="max-w-md w-full space-y-10 ">
          {/* Logo container */}

          <div className="text-center mb-10">
            <div className="flex flex-col items-center gap-2.5 group">
              <div className="size-12 rounded-xl bg-white flex items-center justify-center group-hover:bg-white/50 transition-colors">
                <MessageSquare className="size-8 text-gray-500 group-hover:text-gray-500/50 transition-colors" />
              </div>
              <h1 className="text-3xl font-extrabold mt-3">Create Account</h1>
              <p className="text-base-content/60">
                Step in and take control — access your account now.
              </p>
            </div>
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-4 text-base-content/40" />
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Full name"
                  {...register("fullname", {
                    required: "Full name is required",
                  })}
                />
              </div>
              {errors.fullname && (
                <p className="text-red-600 opacity-20 text-sm mt-1.5">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your email"
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
                <p className="text-red-600 opacity-20 text-sm mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-mediun">Password</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 text-blue-200 " />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-600 opacity-40 text-sm mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* confirm password */}

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-medium">
                  {" "}
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="Re-enter password"
                  {...register("confirmPassword", {
                    required: "Please confirm Password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-base-content/40 text-blue-200" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 " />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 opacity-40 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-10 w-full">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className=" size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* text-container */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{""}
              <Link to="/login" className="link link-primary ml-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
