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