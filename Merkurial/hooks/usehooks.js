import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DETERMINE_ACTION from "./HookHelpers";

export const useClass = (listOfObjectClasses) => {
  const arr = listOfObjectClasses;
  let initial = " ";
  const newClass = arr.reduce((classes, currentClass) => {
    return (classes += currentClass ? " " + currentClass : "");
  }, initial);
  return newClass;
};

const SELECT = (selector) => {
  return useSelector((state) => (selector ? state[selector] : state));
};

export const useSelect = (sliceInfo, base = true) => {
  let currentSelector = sliceInfo ? SELECT(sliceInfo) : SELECT();
  if (
    sliceInfo === null ||
    sliceInfo === undefined ||
    typeof sliceInfo === "undefined"
  ) {
    return currentSelector;
  }

  if (sliceInfo.constructor() === Array) {
    currentSelector = DETERMINE_ACTION(currentSelector, sliceInfo, base);
    console.log("DETERMINE_ACTION DATA: ", data);
    return data;
  }
  return currentSelector;
};

export const useWindow = () => {
  const [wind, setWind] = useState({ width: 0, height: 0 });
  const [available, setAvailable] = useState(false);
  const [flag, setFlag] = useState(false);

  const getWindowAvailable = () => {
    typeof window !== "undefined" && setAvailable(true);
  };

  !available && getWindowAvailable();
  const getDimensions = () => {
    window && setWind({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    if (available && !flag) {
      setFlag(true);
      window.addEventListener("resize", getDimensions);
    }
  }, [available]);

  useEffect(() => {
    if (available && flag) {
      setWind({ width: window.innerWidth, height: window.innerHeight });
      setFlag(false);
    }
  }, [available, flag]);

  return wind;
};
