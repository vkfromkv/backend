import express from "express";
import controller from "../controller/lyrics.controller.mjs";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/Save", upload.none(), controller.Save);

router.get(
  "/GetDropDownDataForPublication",
  controller.GetDropDownDataForPublication
);

export default router;
