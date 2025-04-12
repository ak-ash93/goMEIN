import express from "express";
import {
  login,
  logout,
  register,
  update,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.put("/update", update);
export default router;
