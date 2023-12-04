import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import supabase from "../config/supabaseClient.mjs";
import helper from "../helper/object.helper.mjs";
import UserRepo from "../repository/user.repository.mjs";
import AuthenticationRepo from "../utils/authentication.utils.mjs";

const register = async (req, res) => {
  // TO DO :
  // Other Properties must be updated.
  const password = await AuthenticationRepo.PasswordHash(req.body.password);

  console.log("Password Type : " + typeof password);

  return await UserRepo.CreateUser({
    username: req.body.username,
    password: password,
    name: req.body.name,
    preferred_instrument: "",
    city: "",
    country: "",
    is_artist: false,
    created_on: new Date(),
    created_by: 1,
  });
};


const updateUserProfile = async (req, res) => {
  console.log(req.body);
  return await UserRepo.UpdateUserProfile(req.body);
};

//TO DO:
/*
    1. User Update
    2. User Delete
*/

export default { register, updateUserProfile };
