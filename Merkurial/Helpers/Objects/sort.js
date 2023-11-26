import { ParseObjKeysF } from "./parse";





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