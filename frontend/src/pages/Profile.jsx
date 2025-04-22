import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera, User, Mail } from "lucide-react";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const image = reader.result;
      setSelectedImage(image);
      await updateProfile({ profilePic: image });
    };
  };
  return (
    <div className="h-screen pt-20 backdrop-blur-2xl">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="rounded-2xl bg-base-200 p-6 space-y-8">
          {/* title section */}
          <div className="text-center px-3">
            <h1 className="text-2xl font-light tracking-wider">Profile</h1>
            <hr className="mt-2 text-gray-700 rounded-2xl " />
          </div>

          {/* profile pic section */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="profile "
                className="size-30 rounded-full object-cover border-2 text-center border-purple-200"
              />
              <label
                htmlFor="avatar-upload"
                className={` absolute bottom-0 right-0 cursor-pointer hover:scale-150 transition-all duration-300 ${
                  isUpdatingProfile ? "animate-ping pointer-events-none" : ""
                } `}
              >
                <Camera className="size-4.5 text-gray-400" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-md tracking-wider text-zinc-400">
              {isUpdatingProfile
                ? "Uploading Profile Pic..."
                : `${authUser.fullname}`}
            </p>
          </div>

          {/* bio section */}

          <div className="space-y-6 px-15 my-15 select-none">
            <div className="space-y-1.5">
              <div className="text-sm tracking-wider w-full text-zinc-400 grid grid-cols-[1fr_2.5fr]">
                <div className="flex items-center gap-2">
                  <User className="size-5" />
                  <span className="text-sm font-semibold tracking-widest">
                    Full Name
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-lg rounded-2xl p-2 border-[1px] border-zinc-600 ">
                    {authUser.fullname}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm tracking-wider w-full text-zinc-400 grid grid-cols-[1fr_2.5fr]">
                <div className="flex items-center gap-2">
                  <Mail className="size-5" />
                  <span className="text-sm font-semibold tracking-widest">
                    Email
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-lg rounded-2xl p-2 border-[1px] border-zinc-600">
                    {authUser.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="mt-10 bg-base-200 px-15 py-4 border-[1px] rounded-lg border-zinc-600">
              <h2 className="text-lg font-semibold mb-2 text-center">
                Account Info
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-3 border-b-[1px]  border-zinc-600">
                  <span className="text-sm font-medium mb-2">Member Since</span>
                  <span className="text-sm font-bold">
                    {new Date(authUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 ">
                  <span className="text-sm font-medium">Account Status</span>
                  <span className="text-sm font-bold">
                    {authUser ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
