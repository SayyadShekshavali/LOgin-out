import express from "express";
import { register, login, logout } from "../Controller/authctrl.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/register", logout);

export default authRouter;
