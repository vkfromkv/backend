import express from "express";
import authenticationController from "../controller/authentication.controller.mjs";

const router = express.Router();

router.get("/Logout", authenticationController.Logout);
router.get("/VerifyUser", authenticationController.VerifyUser);
router.post("/Login", authenticationController.Login);

export default router;
