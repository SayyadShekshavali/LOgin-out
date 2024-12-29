const express = require("express");
const { register, login, logout } = require("../Controller/authctrl");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/register", logout);

export default authRouter;
