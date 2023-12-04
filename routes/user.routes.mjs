import express from "express";
import userController from "../controller/user.controller.mjs";

const router = express.Router();

router.post("/Register", userController.Register);
router.post("/UpdateUserProfile", userController.UpdateUserProfile);
router.get("/GetUserProfile", userController.GetUserProfile);

export default router;
