const DETERMINE_SQL_ARGS = (values, key) => {
  const inputArgs = {};
  for (let i = 0; i < values.length; i++) {
    let val = values[i];
    if (val) {
      val = val.toLowerCase();
      if (key.includes("email")) {
        inputArgs.type = "email";
        inputArgs.autocomplete = "on";
        inputArgs.name = "email";
      } else if (key.includes("password")) {
        inputArgs.type = "password";
        inputArgs.autocomplete = "on";
        inputArgs.name = "password";
      } else if (val.includes("INT")) {
        inputArgs.type = "number";
        inputArgs.autocomplete = "on";
      } else if (val.includes("CHAR")) {
        inputArgs.type = "text";
        inputArgs.autocomplete = "on";
      }
      if (val.includes("NOT NULL")) {
        inputArgs.required = true;
      }
    }
  }
  return inputArgs;
};

const DETERMINE_KEY_INFO = (values, key) => {
  const TEMP = values[key] ? values[key] : (values[key] = {});

  if (key.includes("email")) {
    TEMP.type = "email";
    TEMP.name = "email";
    // TEMP.value = "";
  } else if (key.includes("password")) {
    TEMP.type = "password";
    TEMP.name = "password";
    // TEMP.value = "";
  } else if (key.includes("sex")) {
    TEMP.limit = 1;
    TEMP.name = "sex";
  } else if (key.includes("date")) {
    TEMP.type = "date";
    TEMP.name = "date";
  } else {
    TEMP.name = key;
  }
  return values;
};

const DETERMINE_PARAMETER_INFO = (values, key, parameter) => {
  const TEMP = values[key] ? values[key] : (values[key] = {});
  if (parameter.includes("INT")) {
    TEMP.type = "number";
    TEMP.value = 0;
  } else if (parameter.includes("VARCHAR")) {
    TEMP.type = TEMP.type ? TEMP.type : "text";
    TEMP.value = "";
  } else if (parameter.includes("UNIQUE")) {
    TEMP.unique = true;
  } else if (parameter === "NOT NULL") {
    TEMP.required = true;
  } else if (parameter.includes("KEY")) {
    TEMP.key = parameter;
    TEMP.required = true;
  } else {
    console.log("SOMETHING IS MISSING IN: ", parameter);
  }
  TEMP.autocomplete = "on";
  return values;
};

export default DETERMINE_SQL_ARGS;

export const CREATE_STARTING_VALUES = (object) => {
  let startingValues = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    startingValues = DETERMINE_KEY_INFO(startingValues, key);
    let values = object[key];
    values.forEach((parameter, index) => {
      if (parameter) {
        startingValues = DETERMINE_PARAMETER_INFO(
          startingValues,
          key,
          parameter
        );
      }
    });
  }
  return startingValues;
};
