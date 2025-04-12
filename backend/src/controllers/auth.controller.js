import generateToken from "../lib/generateToken.js";
import { hashPassword } from "../lib/hashpassword.js"; // For password hashing
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Handle user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    const requiredFields = {
      email: "Email",
      password: "Password",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !req.body[key])
      .map(([, value]) => value);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `${missingFields.join(",")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Generate token and send response
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle user registration
export const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const requiredFields = {
      fullname: "Full Name",
      email: "Email",
      password: "Password",
    };

    // Check if any required field is missing
    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !req.body[key])
      .map(([, value]) => value);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
      });
    }

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate token after user is saved
    generateToken(newUser._id, res);

    // Send success response
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    // Handle unexpected server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Handle user logout
export const logout = async (req, res) => {
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
  } catch (error) {}
};

// Export all controllers as a single object
export default { login, register, logout, update };
