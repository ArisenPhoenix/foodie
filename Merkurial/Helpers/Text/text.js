export const cleanTextForForm = (
  text_to_clean,
  char_to_remove,
  replacement,
  makeTitle = false
) => {
  const numChars = [...text_to_clean].filter(
    (c) => c === char_to_remove
  ).length;
  for (let i = 0; i < numChars; i++) {
    text_to_clean = text_to_clean.replace(
      char_to_remove,
      replacement ? replacement : " "
    );
  }
  if (makeTitle) {
    text_to_clean = SuperTitleFy(text_to_clean);
  }
  return text_to_clean;
};

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
  if (!text) {
    console.log("That is not text");
    return text;
  }
  const stripped = text.trim();
  let newText = "";
  let previousChar;

  for (let i = 0; i < stripped.length; i++) {
    let char = stripped[i];
    if (i === 0) {
      newText += char.toUpperCase();
      previousChar = false;
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

const ROUTIFY = (text, remove, replace) => {
  const newText = text.replace(remove, replace);
  return newText;
};

export default ROUTIFY;

export const DE_TITLEFY = (text, space = true) => {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    const currentChar = text[i];
    if (currentChar === currentChar.toUpperCase()) {
      newText += space ? " " : "";
      newText += currentChar.toLowerCase();
    } else {
      newText += currentChar;
    }
  }
  return newText;
};

export const DE_KEBABIFY = (text, replacementChar = "_") => {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== replacementChar) {
      newText += char;
    } else {
      newText += " ";
    }
  }
  return newText;
};
