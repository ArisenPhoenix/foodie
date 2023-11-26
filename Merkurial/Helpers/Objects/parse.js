// import { ValidateType } from "../DataValidation/ValidateType";

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
  

export const ParseObjKeys = (obj = {}, list_of_keys = []) => {
    // Should find a value based on the obj[list_of_keys] so going through nested values
    if (typeof obj === "undefined") {
      return [];
    }
  
    let final_data = obj;
  
    for (let i = 0; i < list_of_keys.length; i++) {
      const key = list_of_keys[i];
      try {
        final_data = final_data[key];
        // console.log(final_data);
      } catch (err) {
        // console.log(err);
      }
    }
    // console.log(final_data);
    return final_data;
  };
  
  //----------------------------------------------- PARSE OBJECT KEYS F
  
  export const ParseObjKeysF = (obj = {}, list_of_keys = []) => {
    const valid = ValidateType(obj, list_of_keys);
    if (valid !== true) {
      // console.log("OBJECT NOT VALID: ", typeof obj);
      return valid;
    }
  
    const send_out = list_of_keys.reduce((final_data, key, index, keys) => {
      const next_level = final_data[key];
      return next_level;
    }, obj);
  
    // console.log("PARSE_OBJ_KEYS_F RETURN: ", send_out);
  
    if (send_out === "undefined" || typeof send_out === "undefined") {
      return { data: send_out, type: typeof send_out, bool: false };
    } else {
      return { data: send_out, type: typeof send_out, bool: true };
    }
  };