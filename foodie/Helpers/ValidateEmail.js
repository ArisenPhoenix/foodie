import HasSpecialCharacters from "./HasSpecialCharacter";
const EmailValidation = (enteredEmail) => {
  let error;
  enteredEmail = enteredEmail.trim();
  if (enteredEmail === "") {
    error = "Email Must Be Written";
    return [false, error];
  } else if (enteredEmail.includes("@") === false) {
    error = "Emails Must Have an '@' Symbol";
    return [false, error];
  }

  if (enteredEmail[enteredEmail.length - 1] === ".") {
    error = "The Last Character Cannot Be A Dot";
    return [false, error];
  }

  const domain = [];
  for (let i = enteredEmail.length - 1; i > enteredEmail.length - 6; i--) {
    const aChar = enteredEmail[i];
    if (aChar === "") {
      return false;
    } else if (aChar === ".") {
      domain.unshift(aChar);
      break;
    } else {
      domain.unshift(aChar);
    }
  }

  let hasDot = false;
  for (let i = 0; i < enteredEmail.length; i++) {
    let char = enteredEmail[i];
    const [hasSC, error] = HasSpecialCharacters(char, "email");
    if (hasSC) {
      return [false, error];
    }
    if (char === ".") {
      hasDot = true;
    }
  }
  if (!hasDot) {
    error = "You need a '.'";
    return [false, error];
  }

  return [true, null];
};

export default EmailValidation;
