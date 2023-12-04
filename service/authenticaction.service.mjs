import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepo from "../repository/user.repository.mjs";
import responseUtils from "../utils/response.utils.mjs";
import errorMessagesUtils from "../utils/errorMessages.utils.mjs";
import errorStatusCodesUtils from "../utils/errorStatusCodes.utils.mjs";
import successMessagesUtils from "../utils/successMessages.utils.mjs";
import successStatusCodesUtils from "../utils/successStatusCodes.utils.mjs";
import util from "util";

const bcryptCompare = util.promisify(bcrypt.compare);
const jwtVerify = util.promisify(jwt.verify);

const VerifyUser = async (req) => {
  const token = req.cookies.token;
  if (!token) {
    return responseUtils.StructureMessage(
      errorMessagesUtils.authentication.UnAuthorised,
      errorStatusCodesUtils.TokenVerificationException
    );
  } else {
    // TO DO : Store the secret key in .env and reuse it here.
    try {
      const decoded = await jwtVerify(token, "serverside-secret-key");
      return responseUtils.StructureMessage(
        successMessagesUtils.tokenVerified,
        successStatusCodesUtils.TokenVerified,
        decoded.username
      );
    } catch (err) {
      return responseUtils.StructureMessage(
        errorMessagesUtils.authentication.UnAuthorised,
        errorStatusCodesUtils.TokenVerificationException
      );
    }
  }
};

const Login = async (req) => {
  try {
    const { username, password } = req.body;
    const user = await userRepo.GetUserWithUserName(username);

    if (!(await userRepo.CheckIfUserExists(username, user))) {
      return responseUtils.StructureMessage(
        errorMessagesUtils.userCreation.userDoesNotExist,
        errorStatusCodesUtils.InvalidCredentialsException
      );
    }

    const isPasswordMatch = await bcryptCompare(password, user[0].password);
    if (isPasswordMatch) {
      const token = jwt.sign({ username }, "serverside-secret-key", { expiresIn: "1d" });
      return responseUtils.StructureMessage(
        successMessagesUtils.tokenGeneration,
        successStatusCodesUtils.Accepted,
        token
      );
    } else {
      return responseUtils.StructureMessage(
        errorMessagesUtils.userCreation.passwordMatchError,
        errorStatusCodesUtils.InvalidCredentialsException
      );
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export default { VerifyUser, Login };
