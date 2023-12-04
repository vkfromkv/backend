import userService from "../service/user.service.mjs";

const Register = async (req, res) => {
  const response = await userService.register(req);
  console.log(response);
  res.status(response.code).send(response.message);
};

const UpdateUserProfile = async (req, res) => {
  const response = await userService.updateUserProfile(req);
  console.log(response);
  res.status(response.code).send(response.message);
};

export default { Register, UpdateUserProfile };
