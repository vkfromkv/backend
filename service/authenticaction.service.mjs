import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepo from "../repository/user.repository.mjs";
import responseUtils from "../utils/response.utils.mjs";
import errorMessagesUtils from "../utils/errorMessages.utils.mjs";
import errorStatusCodesUtils from "../utils/errorStatusCodes.utils.mjs";
import successMessagesUtils from "../utils/successMessages.utils.mjs";
import successStatusCodesUtils from "../utils/successStatusCodes.utils.mjs";

const VerifyUser = async (req) => {
  const token = req.cookies.token;
  if (!token) {
    return {
      status: responseUtils.StructureMessage(
        errorMessagesUtils.authentication.UnAuthorised,
        errorStatusCodesUtils.TokenVerificationException
      ),
      isVerified: false,
    };
  } else {
    // TO DO : Store the secret key in .env and reuse it here.
    jwt.verify(token, "serverside-secret-key", (err, decoded) => {
      if (err) {
        return {
          status: responseUtils.StructureMessage(
            errorMessagesUtils.authentication.UnAuthorised,
            errorStatusCodesUtils.TokenVerificationException
          ),
          isVerified: false,
        };
      } else {
        req.username = decoded.username;
      }

      return {
        status: responseUtils.StructureMessage(
          errorMessagesUtils.authentication.UnAuthorised,
          errorStatusCodesUtils.TokenVerificationException
        ),
        isVerified: true,
      };
    });
  }
};

const Login = async (req) => {
  try {
    const { username, password } = req.body;

    const user = await userRepo.GetUserWithUserName(username);

    if (await userRepo.CheckIfUserExists(username, user)) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          return responseUtils.StructureMessage(
            errorMessagesUtils.userCreation.passwordMatchError,
            errorStatusCodesUtils.InvalidCredentialsException
          );
        }
        // TO DO : Move the Secret key to the .env File.
        console.log("I'm here");

        if (response) {
          const token = jwt.sign({ username }, "serverside-secret-key", {
            expiresIn: "1d", // TO DO : Move the Expires in to .env file.
          });

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
      });
    } else {
      return responseUtils.StructureMessage(
        errorMessagesUtils.userCreation.userDoesNotExist,
        errorStatusCodesUtils.InvalidCredentialsException
      );
    }
  } catch (e) {
    throw e.message;
  }
};

export default { VerifyUser, Login };
