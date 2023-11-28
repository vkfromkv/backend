import express from "express";
import authenticationController from "../controller/AuthenticationController.mjs";

const router = express.Router();

router.post("/Register", authenticationController.Register);

export default router;
