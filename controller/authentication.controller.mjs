// import { register } from "../service/AuthenticationService/Authentication.js";

import AuthenticationService from "../service/authenticaction.service.mjs";
import objectHelper from "../helper/object.helper.mjs";

const Login = async (req, res) => {
  const response = await AuthenticationService.Login(req);

  console.log("in auth controller");
  console.log(response);
  if (!objectHelper.isNullOrEmpty(response.data)) {
    res.cookie("token", response.data[0]);
  }

  res.json({
    status: response.code,
    message: response.message,
    userId: response.data[1],
  });
};
const VerifyUser = async (req, res) => {
  const response = await AuthenticationService.VerifyUser(req);
  res.status(response.code).send(response.data);
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
