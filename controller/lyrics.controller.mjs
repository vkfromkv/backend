import LyricsService from "../service/lyrics.service.mjs";
import AuthenticationService from "../service/authenticaction.service.mjs";
import lyricsService from "../service/lyrics.service.mjs";

const Save = async (req, res) => {
  //   res.send(req);
  const response = await LyricsService.SaveSong(req.body);

  res.send(response);
};

const GetDropDownDataForPublication = (req, res) => {
  //   res.send(req);
  const response = LyricsService.GetDropDownDataForPublication(req);

  res.status(200).send(response);
};

const GetSong = async (req, res) => {
  const response = await lyricsService.GetSong(req);
  res.status(200).send(response);
};

const GetSongs = async (req, res) => {
  console.log(req);
  const response = await lyricsService.GetSongs(req.body);
  res.status(200).send(response);
};

const GetTopSongs = async (req, res) => {
  const response = await lyricsService.GetTopNSongs(req);
  res.status(200).send(response);
};

export default {
  Save,
  GetDropDownDataForPublication,
  GetSong,
  GetSongs,
  GetTopSongs,
};
