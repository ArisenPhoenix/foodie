import { useState, useCallback, useEffect } from "react";

const pushRef = (setAllRefs, ref) => {
  setAllRefs((prev) => {
    console.log("PASSING A REF");
    return [...prev, ref];
  });
};

const useAllStates = (initialStates, reset_value) => {
  const states = initialStates ? initialStates : [];
  const [allRefs, setAllRefs] = useState(states);
  const [callback, setCallback] = useState(null);

  const passRef = useCallback((ref) => {
    setCallback(() => pushRef(setAllRefs, ref));
  });

  useEffect(() => {
    console.log("CALLBACK IS: ", callback);
    if (callback !== null && typeof callback !== "undefined") {
      callback();
      setCallback(null);
    }
  }, [callback]);

  const resetAllRefs = () => {
    console.log("ALL REFS: ", allRefs);
    console.log("TRYING TO RESET REFS");
    allRefs.forEach((ref) => {
      console.log("RESETTING A REF");
      if (ref) {
        ref.current = reset_value;
      }
    });
  };

  return [passRef, resetAllRefs, allRefs];
};

export default useAllStates;
