// import { register } from "../service/AuthenticationService/Authentication.js";

import AuthenticationService from "../service/AuthenticationService/Authentication.mjs";

const Register = async (req, res) => {
  // console.log(req);

  let response = await AuthenticationService.register(req);

  res.send("Ok");
};

export default {
  Register,
};
