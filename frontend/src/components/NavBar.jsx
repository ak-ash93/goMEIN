import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquareText, Settings, User } from "lucide-react";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="bg-base-200 border-b-2 border-base-300 fixed w-full top-0 z-50 backdrop-blur-2xl shadow-lg ">
      <div className="container mx-auto px-5 h-18">
        <div className="flex items-center justify-between h-full">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-25 transition-all animate-pulse hover:animate-none"
            >
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <MessageSquareText className=" text-primary" />
              </div>
              <h1 className="text-sm font-light tracking-wide ">GoMEIN</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="relative group btn btn-xs btn-ghost gap-2 tracking-wider hover:opacity-45"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline-block text-xs">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-xs btn-ghost gap-1.5 tracking-wider hover:opacity-45`}
                >
                  <div className="size-6 rounded-full border-2">
                    {authUser.profilePic}
                  </div>
                  <span className="hidden sm:inline-block text-xs">
                    {authUser.fullname}
                  </span>
                </Link>

                <button
                  className="flex gap-2 items-center btn btn-xs btn-ghost"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
