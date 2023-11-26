import { useEffect, useState } from "react";
import {
  SAVE_TO_LOCAL_STORAGE,
  RETREIVE_FROM_LOCAL_STORAGE,
  REMOVE_FROM_LOCAL_STORAGE,
} from "../API_STORAGE/STORAGE/HANDLE_STORAGE";

let aTimer;

const timerFunction = (timeLeft, setTimeLeft) => {
  if (timeLeft !== 0) {
    aTimer = setTimeout(() => {
      setTimeLeft((prev) => {
        return prev - 1000;
      });
    }, 1000);
  } else {
    return 0;
  }
};

const callBack = async (callBackPointer) => {
  if (callBackPointer) {
    return await callBackPointer(aTimer);
  }
};

const useSetTimeOut = (timerObj, save = false) => {
  const {
    name,
    time = 60000,
    callBack = null,
    running = false,
    setRunning = () => {},
  } = timerObj;

  const resetTimer = () => {
    callBack && callBack(callBack);
    // Reset Timer
    setTimeLeft(startTimeMS);
    setRunning(false);
    setPreviousTime(false);
    save && REMOVE_FROM_LOCAL_STORAGE(timerName);
  };

  if (!timerName) {
    throw Error("You Must Identify This Timer To Use it.");
  }

  const [previousTime, setPreviousTime] = useState(null);

  const [timeLeft, setTimeLeft] = useState(startTimeMS);

  useEffect(() => {
    // Set & Reset Timer
    if (timeLeft <= 0) {
      // Execute Callback
      resetTimer();
    }

    if (save) {
      // Decide If To Use Remaining Time of if there is Remaining time
      if (previousTime !== false) {
        // Means getting the previous time hasn't been attempted yet
        // If it equals null then an attempt can still be made
        // No matter what, after an attempt it will be set to false ...
        // because at that point we have already decided what the starting time will be.
        const remainingTime = RETREIVE_FROM_LOCAL_STORAGE(timerName);
        if (remainingTime) {
          // USE REMAINING TIME
          setTimeLeft(remainingTime);
        } else {
          // USE STARTING TIME
          setTimeLeft(startTimeMS);
        }
        setPreviousTime(false);
      }
    }
  }, [previousTime, setTimeLeft, setRunning, setPreviousTime, save, timeLeft]);

  useEffect(() => {
    // UPDATE TIME
    if (running) {
      if (timeLeft <= 0) {
        resetTimer();
      } else {
        timerFunction(timeLeft, setTimeLeft);
        save && SAVE_TO_LOCAL_STORAGE(timeLeft, timerName);
      }
    }

    console.log("TIME REMAINING: ", timeLeft);
  }, [previousTime, running, timeLeft]);

  return timeLeft;
};

export default useSetTimeOut;
