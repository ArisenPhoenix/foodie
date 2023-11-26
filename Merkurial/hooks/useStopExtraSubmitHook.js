import { useEffect, useState } from "react";
import useToggle from "./Toggle";
const useStopExtraClickHook = (isSubmittingState, hasAlreadyClickedMessage) => {
  const [message, setMessage] = useState(null);
  const warning = hasAlreadyClickedMessage
    ? hasAlreadyClickedMessage
    : "You Must First Wait To Click This Button Again.";

  useEffect(() => {
    if (isSubmittingState && message) {
      setMessage(warning);
    }
  }, [message]);

  const [hasClicked, toggleHasClicked, setHasClicked] = useToggle(
    isSubmittingState ? isSubmittingState : false
  );

  const handleInitialClick = (e) => {
    e && e.preventDefault();
    setHasClicked(true);
  };

  return [
    hasClicked,
    toggleHasClicked,
    message,
    handleInitialClick,
    setHasClicked,
  ];
};

export default useStopExtraClickHook;
