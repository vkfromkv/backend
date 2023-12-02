import express from "express";
import userController from "../controller/user.controller.mjs";

const router = express.Router();

router.post("/Register", userController.Register);

export default router;
