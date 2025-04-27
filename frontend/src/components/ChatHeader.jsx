import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* profilepic */}
          <div className="avatar">
            <div className="size-12 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt="" />
            </div>
          </div>

          {/* iformation */}
          <div>
            <div className="flex flex-col items-center justify-center gap-.5">
              <h3 className="font-medium">{selectedUser.fullname}</h3>
              <div>
                <p className="text-sm text-primary/60 font-light">
                  {onlineUsers.includes(selectedUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full bg-neutral-200 cursor-pointer hover:bg-neutral-500  hover:scale-95 "
        >
          <X className="size-5   text-primary " />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
