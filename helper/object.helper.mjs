class ObjectHelper {
  isEmptyObject = (item) => {
    for (let prop in item) {
      if (item.hasOwnProperty(prop)) return false;
    }

    return true;
  };

  isNullOrEmpty = (item) => {
    if (!item || item.length == 0) {
      return true;
    }
    return false;
  };
}

export default new ObjectHelper();
