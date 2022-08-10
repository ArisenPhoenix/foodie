export const log = (inputData, show) => {
  if (show) {
    return console.log(inputData);
  }
};
export const logger = (data, show) => {
  if (show) {
    console.log("This is the data you're not working with:");
    console.log(data);
  }
};
export const varTest = (listOfVars, string, numSpaces, show) => {
  if (show) {
    if (!numSpaces) {
      numSpaces === 0;
    }
    console.log(
      `||||||||||| < TESTING VAR >  ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||>.`
    );
    console.log(listOfVars);
    console.log(string);
    console.log(
      "||||||||||| < END TEST > ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||>."
    );

    for (let i = 0; i < numSpaces; i++) {
      console.log();
    }
  }
};
