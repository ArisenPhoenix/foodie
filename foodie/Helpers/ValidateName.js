import HasSpecialCharacters from "./HasSpecialCharacter";
const ValidateName = (name) => {
  let error;
  //   console.log(
  //     `name: ${name}---------------------------------------------------------`
  //   );

  if (name.length < 4 || name === "" || name === " ") {
    error = "Name Must Be At Least 4 Characters Long";
    return [false, error];
  } else {
    const [hasSC, error] = HasSpecialCharacters(name, "name");
    return [!hasSC, error];
  }
};

export default ValidateName;
