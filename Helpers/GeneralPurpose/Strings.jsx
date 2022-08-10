export const TitleFy = (text) => {
  if (text && text[0] === text[0].toUpperCase()) {
    return text;
  }
  const f = text && text[0].toUpperCase();
  const o = text && text.slice(1);
  const final = f + o;
  return final;
};

export const Camelfy = (text, divider) => {
  let newText = "";
  let number = 0;
  text.forEach((char) => {
    if (char === divider) {
      number = 1;
    } else {
      if (number === 1) {
        newText += char.toUpperCase();
        number = 0;
      } else {
        newText += char;
      }
    }
  });
  return newText;
};

export const SuperTitleFy = (text) => {
  const stripped = text.trim();
  let newText = "";
  let previousChar;
  if (!text) {
    return console.log("That is not text");
  } else {
  }

  for (let i = 0; i < stripped.length; i++) {
    const char = stripped[i];
    if (i === 0) {
      newText += char.toUpperCase();
      previousChar = false;
      // console.log(newText);
    } else if (char === " ") {
      newText += char;
      previousChar = true;
    } else if (previousChar === true && char !== " ") {
      newText += char.toUpperCase();
      char = char.toUpperCase();
      previousChar = false;
    } else if (previousChar === true && char === " ") {
      newText += "";
    } else {
      newText += char;
      previousChar = false;
    }
  }
  return newText;
};

export const linkify = (text, directory) => {
  if (!directory) {
    directory = "";
  }
  let final = "";
  for (let i = 0; i < text.length; i++) {
    if (i === 0) {
      final += text[i].toLowerCase();
    } else {
      if (text[i] === text[i].toUpperCase()) {
        if (text[i] === " ") {
          break;
        } else {
          const newChar = text[i].toLowerCase();
          final += `-${newChar}`;
        }
      } else {
        if (text[i] === " ") {
          break;
        } else {
          final += text[i];
        }
      }
    }
  }
  return `/${directory}${final}`;
};

export const kebabify = (text, lower = true) => {
  let formattedText = text.trim();
  if (lower === true) {
    formattedText.toLowerCase();
  }
  let finalText = "";
  for (let i = 0; i < formattedText.length; i++) {
    const c = formattedText[i];
    if (c === " ") {
      finalText += "-";
    } else {
      finalText += c;
    }
  }
  return finalText;
};
