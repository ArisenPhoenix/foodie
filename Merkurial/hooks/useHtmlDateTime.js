import { GET_HTML_TIME, GET_HTML_DATE } from "../Helpers/Time/HTML";
import { useState, useEffect } from "react";

let thisDate = "";
export const useHtmlDate = () => {
  const [date, setDate] = useState("");
  const newDate = GET_HTML_DATE();
  thisDate = newDate;

  useEffect(() => {
    thisDate = newDate;
    setDate(newDate);
  }, []);

  if (date !== "") {
    return date;
  } else {
    return thisDate;
  }
};

let thisTime = "";
export const useHtmlTime = (needSeconds = false) => {
  const [time, setTime] = useState("");
  const newTime = GET_HTML_TIME(needSeconds);
  thisTime = newTime;
  useEffect(() => {
    thisTime = newTime;
    setTime(newTime);
  }, []);

  if (time !== "") {
    return time;
  } else {
    return thisTime;
  }
};
