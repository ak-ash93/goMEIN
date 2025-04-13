import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent empty messages from being saved
messageSchema.pre("save", function (next) {
  if (!this.text && !this.image) {
    return next(new Error("Message must contain either text or image."));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
