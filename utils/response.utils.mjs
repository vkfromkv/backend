class ResponseMessages {
  StructureMessage = (message, code, data = null) => {
    return {
      message: message,
      code: code,
      data: data,
    };
  };
}

export default new ResponseMessages();
