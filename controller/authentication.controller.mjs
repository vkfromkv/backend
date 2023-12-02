// import { register } from "../service/AuthenticationService/Authentication.js";

import AuthenticationService from "../service/authenticaction.service.mjs";

const Login = async (req, res) => {
  const response = await AuthenticationService.Login(req);

  console.log(response);

  res.cookie("token", response.data);
  res.status(response.code).send(response.message);
};
const VerifyUser = async (req, res) => {
  const response = await AuthenticationService.VerifyUser(req);
  res.status(response.code).send(response.message);
};

const Logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
};

export default {
  Login,
  VerifyUser,
  Logout,
};
