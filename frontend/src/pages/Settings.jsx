import React from "react";
import { useThemeStore } from "../store/useThemeStore.js";
import { Themes, previewMessages } from "../constants/index.js";
import { Send } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="h-screen container sm:pl-10  pt-24 px-10 ">
      <div className="lg:grid lg:grid-cols-[800px_2fr] gap-5 ">
        {/* left container */}
        <div className="space-y-8 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-base-content/80 text-center">
              {" "}
              Theme
            </h2>
            <p className="text-lg text-base-content/70 text-center mt-1">
              Select a theme for your interface
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 pl-20 sm:grid-cols-4  sm:p-1 sm:gap-10  md:grid-cols-5 md:p-1   ">
            {Themes.map((item) => (
              <button
                key={item}
                onClick={() => setTheme(item)}
                className={`group flex flex-col items-center gap-2 p-1.5 w-[100px] rounded-lg transition-colors ${
                  theme === item ? "bg-base-300" : "bg-base-200"
                } hover:outline-1 hover:outline-blue-400 hover:scale-95 hover-cursor- cursor-pointer`}
              >
                <div
                  className="relative w-full h-full rounded-lg overflow-hidden"
                  data-theme={item}
                >
                  <div className=" grid grid-cols-4 gap-1 p-1 ">
                    <div className="size-4  bg-primary"></div>
                    <div className="size-4  bg-secondary"></div>
                    <div className="size-4  bg-accent"></div>
                    <div className="size-4  bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] p-2 font-medium truncate w-full text-center">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Preview container */}
        <div className="space-y-8 lg:border-l-3  border-base-300 px-6 hidden lg:block">
          <div className=" mt-5">
            <h3 className="text-2xl text-center font-semibold text-base-content/80 ">
              See Your Preview
            </h3>
          </div>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      A
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Asher Kane</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-5 space-y-4 min-h-[250px] overflow-y-auto bg-base-100">
            {previewMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex  ${
                  msg.isSent ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            msg.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                >
                  {" "}
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`
                            text-[10px] mt-1.5
                            ${
                              msg.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                  >
                    12:00 PM
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-base-300 bg-base-100">
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered flex-1 text-sm h-10"
                placeholder="Type a message..."
                value="This is a preview"
                readOnly
              />
              <button className="btn btn-primary h-10 min-h-0">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
