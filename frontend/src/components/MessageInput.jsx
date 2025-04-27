import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    fileRef.current.value = "";
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      removeImage();
    } catch (error) {
      toast.error("Failed to send message");
      console.log(error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="size-20 object-cover rounded-xl "
          />
          <button
            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-200 flex items-center justify-center"
            type="button"
          >
            <X className="size-3" onClick={removeImage} />
          </button>
        </div>
      )}

      <form onSubmit={handleMessageSend} className=" flex items-center gap-2">
        <div className="flex-1 gap-2 flex items-center">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            onChange={handleImage}
            ref={fileRef}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            className={`hidden sm:flex btb btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileRef.current.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm btn-circle sm:btn-md"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
