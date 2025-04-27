// Importing required models and libraries
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

// Controller to get all users except the currently logged-in user
export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch all users excluding the current user
    const users = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getUsers controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all messages between the logged-in user and a specific user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // ID of the user to chat with
    const myId = req.user._id; // Logged-in user's ID

    // Fetch messages where the logged-in user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { sender_Id: myId, reciever_Id: userToChatId },
        { sender_Id: userToChatId, reciever_Id: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to send a message with optional image
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let image_url;

    // Ensure that either text or image is provided
    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Message must contain text or image" });
    }

    // If image is provided, upload it to Cloudinary
    if (image) {
      const uploadPic = await cloudinary.uploader.upload(image);
      image_url = uploadPic.secure_url;
    }

    // Create and save the message
    const message = new Message({
      senderId,
      recieverId,
      text,
      image: image_url,
    });

    await message.save();

    const recieverSocketId = getReceiverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", message);
    }

    // return the message
    res.status(201).json(message);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
