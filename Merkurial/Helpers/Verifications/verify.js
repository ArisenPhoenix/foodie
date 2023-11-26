export const VERIFY_VALUE = (value, returnIfNotValue = null) => {
  return value ? value : returnIfNotValue;
};

export const matchObjectSequence = (object, objectToMatchAgainst) => {
  const keys = Object.keys(objectToMatchAgainst);
  const fittedObject = {};

  keys.forEach((key, index) => {
    const VALUE = object[key];
    fittedObject[key] = VALUE;
  });
  return fittedObject;
};

// export const matchArraySequence = (array, arrayToMatchAgainst) => {
//   console.log("ARRAY: ", array, "ARRAY TO MATCH: ", arrayToMatchAgainst);
// };

export const matchObjectSequenceAgainstArray = (object, array) => {
  const matchedObject = {};

  array.forEach((item) => {
    if (object[item]) {
      matchedObject[item] = object[item];
    } else {
      return false;
    }
  });
  return matchedObject;
};
