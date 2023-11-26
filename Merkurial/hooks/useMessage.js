import { useState } from "react";

export const useMessage = (amountOfTime = 3000, startingState = null) => {
  const [message, setMessage] = useState(startingState);

  const setMessageState = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(startingState);
    }, amountOfTime);
  };

  return [message, setMessageState];
};
