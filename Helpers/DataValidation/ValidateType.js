export const ValidateType = (data, extra, type = "") => {
  if (
    data === "undefined" ||
    typeof data === "undefined" ||
    data[extra[0]] === "undefined" ||
    typeof data[extra[0]] === "undefined" ||
    data[extra[0]][extra[1]] === "undefined" ||
    typeof data[extra[0]][extra[1]] === "undefined"
  ) {
    return {
      err: `That is not a valid type: ${typeof data}`,
      type: typeof data,
    };
  }
  if (type !== "") {
    if (typeof data !== type) {
      throw TypeError("You need to use an object as a parameter");
    }
  }

  return true;
};
