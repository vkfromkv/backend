import LyricsService from "../service/lyrics.service.mjs";
import AuthenticationService from "../service/authenticaction.service.mjs";

const Save = (req, res) => {
  console.log(req.body);
  //   res.send(req);
  const response = LyricsService.SaveSong(req);

  res.send("Ok");
};

const GetDropDownDataForPublication = (req, res) => {
  //   res.send(req);
  const response = LyricsService.GetDropDownDataForPublication(req);

  res.status(200).send(response);
};

export default {
  Save,
  GetDropDownDataForPublication,
};
