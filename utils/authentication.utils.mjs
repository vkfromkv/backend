import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import supabase from "../config/supabaseClient.mjs";
import helper from "../helper/object.helper.mjs";
import UserRepo from "../repository/user.repository.mjs";

const PasswordHash = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash("" + password, 10, (err, hash) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(hash);
      }
    });
  });
};

const JwtSign = (username) => {
  try {
    return jwt.sign({ username }, "serverside-secret-key", {
      expiresIn: "1d", // TO DO : Move the Expires in to .env file.
    });
  } catch (e) {
    throw e.message;
  }
};

export default { PasswordHash, JwtSign };
