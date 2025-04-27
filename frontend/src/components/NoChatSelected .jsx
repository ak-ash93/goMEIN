import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-15 bg-base-200/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-5 mb-6">
          <div className="relative">
            <div
              className="size-20 rounded-full bg-primary/20 flex items-center
             justify-center p-2.5 animate-bounce hover:animate-none"
            >
              <MessageSquare className="size-15 text-primary/90" />
            </div>
            <div className="border-t-2 border-primary/20"></div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light tracking-widest mb-10">
        Get Chatting...
      </h2>
      <div className="   p-5">
        <p className="text-xl text-base-content/50 tracking-wider">
          A new World of Messaging is waiting for you
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
