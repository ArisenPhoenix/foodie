export const longDecimalFix = (dec, num) => {
  const numStr = String(dec);
  if (numStr.includes(".")) {
    const decLength = numStr.split(".")[1].length;
    if (decLength > 2) {
      return dec.toFixed(num);
    }
  }
  return dec;
};

export const isNaN = Number.isNaN;

export const check_num_value = (num) => {
  return isNaN(num) || typeof num === "undefined" || num === null
    ? true
    : false;
};

export const fix_num_value = (num) => {
  return isNaN(num) || typeof num === "undefined" || num === null ? 1 : num;
};

export const resolve_num = (num, check = false) => {
  //   console.log(num, check_num_value(num), fix_num_value(num));
  return !check
    ? isNaN(num) || typeof num === "undefined" || num === null || num === ""
      ? 1
      : num
    : isNaN(num) || typeof num === "undefined" || num === null || num === ""
    ? true
    : false;
};
