class ErrorMessages {
  userCreation = {
    userExists: "User Already Exists",
    userNameTaken: "User name already taken",
    userNameRequired: "User name is required",
    passwordRequired: "Password is required",
    nameRequired: "Name is required",
    objectNull: "User Object has no data",
    userDoesNotExist: "User does not exist",
    passwordMatchError: "Invalid Password",
  };

  authentication = {
    Authorised: "User Authorised",
    UnAuthorised: "You are not Authorised. Please re-login",
    FailedTokenVerification: "Token Verification Failed",
  };
}

export default new ErrorMessages();
