import express from "express";
import controller from "../controller/lyrics.controller.mjs";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/Save", controller.Save);

router.post("/GetSong", controller.GetSong);

router.get(
  "/GetDropDownDataForPublication",
  controller.GetDropDownDataForPublication
);

router.post("/GetSongsList", controller.GetSongs);
router.get("/GetTopNSongs", controller.GetTopSongs);

export default router;
