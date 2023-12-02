import supabase from "../config/supabaseClient.mjs";
import ObjectHelper from "../helper/object.helper.mjs";
import responseUtils from "../utils/response.utils.mjs";
import errorMessagesUtils from "../utils/errorMessages.utils.mjs";
import errorStatusCodesUtils from "../utils/errorStatusCodes.utils.mjs";
import tableNames from "../utils/database/database.utils.mjs";
import objectHelper from "../helper/object.helper.mjs";
import SuccessMessages from "../utils/successMessages.utils.mjs";
import SuccessStatusCodes from "../utils/successStatusCodes.utils.mjs";

class UserRepo {
  CheckIfUserExists = async (username, userData = null) => {
    try {
      if (objectHelper.isEmptyObject(userData)) {
        const data = await this.GetUserWithUserName(username);
        userData = data;
      }
      console.log(userData);
      console.log(ObjectHelper.isEmptyObject(userData));
      return !ObjectHelper.isEmptyObject(userData);
    } catch (e) {
      throw e;
    }
  };

  GetUserWithUserName = async (username) => {
    try {
      const { data, Error } = await supabase
        .from(tableNames.user_profile)
        .select("username")
        .eq("username", username);

      if (!objectHelper.isEmptyObject(Error)) {
        console.log(Error.message);
      }

      return data;
    } catch (e) {
      throw e;
    }
  };

  CreateUser = async (user) => {
    try {
      if (!ObjectHelper.isEmptyObject(user.username)) {
        if (await this.CheckIfUserExists(user.username)) {
          return responseUtils.StructureMessage(
            errorMessagesUtils.userCreation.userExists,
            errorStatusCodesUtils.CreateFailedException
          );
        }

        if (ObjectHelper.isNullOrEmpty(user.name)) {
          return responseUtils.StructureMessage(
            errorMessagesUtils.userCreation.nameRequired,
            errorStatusCodesUtils.CreateFailedException
          );
        }
        if (ObjectHelper.isNullOrEmpty(user.username)) {
          return responseUtils.StructureMessage(
            errorMessagesUtils.userCreation.userNameRequired,
            errorStatusCodesUtils.CreateFailedException
          );
        }

        if (ObjectHelper.isNullOrEmpty(user.password)) {
          return responseUtils.StructureMessage(
            errorMessagesUtils.userCreation.passwordRequired,
            errorStatusCodesUtils.CreateFailedException
          );
        }

        const newUser = {
          name: user.name,
          preferred_instrument: user.preferred_instrument,
          username: user.username,
          password: user.password,
          city: user.city,
          country: user.country,
          is_artist: user.is_artist,
          created_on: new Date(), // You can set a default value or leave it as is
          created_by: 2, // You can set a default value or leave it as is
          modified_by: 2,
          modified_on: new Date(),
        };

        const { data, error } = await supabase
          .from(tableNames.user_profile)
          .insert(newUser)
          .select();

        if (!ObjectHelper.isEmptyObject(error)) {
          console.log(data + "    " + error.message);
        }
        console.log("Operation Complete");

        return responseUtils.StructureMessage(
          SuccessMessages.created,
          SuccessStatusCodes.Created
        );
      } else {
        return responseUtils.StructureMessage(
          errorMessagesUtils.userCreation.objectNull,
          errorStatusCodesUtils.CreateFailedException
        );
      }
    } catch (e) {
      console.log("inside catch");
      return responseUtils.StructureMessage(
        e.message,
        errorStatusCodesUtils.CreateFailedException
      );
    }
  };
}

export default new UserRepo();
