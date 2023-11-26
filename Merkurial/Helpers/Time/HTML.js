export const GET_HTML_TIME = (needSeconds = false) => {
  // new Intl.DateTimeFormat("en-US").format(currentTime)
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

  let hour = new Date().getHours();
  if (hour === 0) {
    if (userLocale === "en-US") {
      hour = "12";
    } else {
      hour = "00";
    }
  }
  if (hour.toString().length === 1) {
    if (userLocale === "en-US") {
      hour = `0${hour}`;
    } else {
      hour = `0${hour}`;
    }
  }

  let minutes = `${new Date().getMinutes()}`;
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  let currentTime = `${hour}:${minutes}`;

  if (needSeconds) {
    let seconds = `${new Date().getSeconds()}`;
    seconds = seconds.length === 1 ? `0${seconds}` : seconds;
    currentTime += `:${seconds}`;
  }

  return currentTime;
};

const fixSingleLength = (numberOrString) => {
  if (numberOrString.toString().length === 1) {
    return `0${numberOrString}`;
  }
  return numberOrString;
};

export const GET_HTML_DATE = () => {
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate().toLocaleString();
  const fullYear = new Date().getFullYear();
  month = fixSingleLength(month);
  day = fixSingleLength(day);

  const currentDate = `${fullYear}-${month}-${day}`;

  return currentDate;
};
