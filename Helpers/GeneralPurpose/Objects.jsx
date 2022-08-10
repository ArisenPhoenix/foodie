import { ValidateType } from "../DataValidation/ValidateType";

export const ObjectKeyGenerator = (obj = {}, list_of_keys = []) => {
  // Pulls Data from a specific location
  const new_obj = {};
  for (let i = 0; i < list_of_keys.length; i++) {
    const key = list_of_keys[i];
    obj[key] = i;
  }
  // console.log(new_obj);
  return new_obj;
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

//----------------------------------------------- FULL SORT

export const FullSort = (list_data = [], path_keys = [], by = []) => {
  let sortList = list_data;
  let isArray = Array.isArray(sortList);
  let stuff;
  if (!isArray) {
    stuff = ParseObjKeysF(list_data, path_keys);
    sortList = stuff.data;
    isArray = Array.isArray(sortList);
  }

  if (typeof list_data !== "object" || !isArray) {
    // console.warn("The datatype entered is not an object");
    return [list_data];
  }

  if (sortList !== "undefined" && isArray) {
    const final = sortList.sort((a, b) => {
      const textA = ParseObjKeys(a, by);
      const textB = ParseObjKeys(b, by);
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return final;
  }
  return sortList;
};

//----------------------------------------------- SINGLE SORT

export const SINGLE_SORT = (list_data, by = "") => {
  // console.log("SINGLE SORT: ", list_data);
  try {
    list_data.sort((a, b) => {
      var textA = a[by];
      var textB = b[by];
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    // console.log("SINGLE SORT RETURNS: ", list_data);
    return list_data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
