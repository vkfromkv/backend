import express from "express";
import userController from "../controller/user.controller.mjs";

const router = express.Router();

router.post("/Register", userController.Register);
router.post("/UpdateUserProfile", userController.UpdateUserProfile);

export default router;
