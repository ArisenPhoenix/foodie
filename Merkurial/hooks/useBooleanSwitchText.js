import { useEffect, useState } from "react";
import useToggle from "./Toggle";

const useBooleanSwitchText = (
  defaultBoolean = false,
  isTrueText = "Done",
  isNotTrueText = "Edit"
) => {
  const [isTrue, toggleIsTrue] = useToggle(defaultBoolean);

  const [isTrueTextState, setIsTrueText] = useState(
    isTrue ? isTrueText : isNotTrueText
  );
  const [isNotTrueTextState, setIsNotTrueText] = useState(
    isTrue ? isNotTrueText : isTrueText
  );

  useEffect(() => {
    if (isTrue) {
      setIsTrueText(isTrueText);
      setIsNotTrueText(isNotTrueText);
    } else {
      setIsTrueText(isNotTrueText);
      setIsNotTrueText(isTrueText);
    }
  }, [isTrue]);

  return [isTrue, toggleIsTrue, isTrueTextState, isNotTrueTextState];
};

export default useBooleanSwitchText;
