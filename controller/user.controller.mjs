import authenticactionService from "../service/authenticaction.service.mjs";
import userService from "../service/user.service.mjs";
import SuccessMessages from "../utils/successMessages.utils.mjs";
import successStatusCodesUtils from "../utils/successStatusCodes.utils.mjs";
import errorStatusCodesUtils from "../utils/errorStatusCodes.utils.mjs";
import objectHelper from "../helper/object.helper.mjs";

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

const GetUserProfile = async (req, res) => {
  const verificationResponse = await authenticactionService.VerifyUser(req);
  if(verificationResponse.message === SuccessMessages.tokenVerified){
    const data = await userService.GetUserProfile(verificationResponse.data)
    if(objectHelper.isEmptyObject(data)){
      res.status(errorStatusCodesUtils.NotFoundException);
    }
    //handle data
    res.json({status: successStatusCodesUtils.OK, data: data[0]});
    return;
  }
  res.status(verificationResponse.code).send(verificationResponse.message);
};

export default { Register, UpdateUserProfile, GetUserProfile };
