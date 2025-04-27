import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected .jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-300">
      <div className="flex items-center justify-center pt-20 px-5">
        <div className="bg-base-200  rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-7rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
