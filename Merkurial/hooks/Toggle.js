import { useEffect, useState } from "react";


/** 
 * HOC That Returns [State, toggleStateFunc, setStateFunc] | desired return values should be accessed using destructuring
 * 
 * Example1: const [state, toggleStateFunc, setStateFunc] = useToggle(false);
 * 
 * Example2: const [state, toggleStateFunc] = useToggle(false);
 * 
 * @param initialState - the initialState desired
*/
const useToggle = (initialState) => {
  const [currentState, setState] = useState(initialState);
  const toggleState = () => {
    setState((prev) => !prev);
  };

  return [currentState, toggleState, setState];
};




let useToggleTimeoutTimer;
export const useToggleTimeout = (initialState, timeOut) => {
  const [currentState, setState] = useState(initialState);
  const toggleState = () => {
    setState((prev) => !prev);
  };

  useEffect(() => {
    if (state !== initialState && typeof timeOut === "number"){
      useToggleTimeoutTimer = timeOut && setTimeout(() => {
          toggleState()
        }, typeof timeOut == "number"  ? timeOut : null)
    }
    
  }, [state])

  return [currentState, toggleState, setState];
};

export default useToggle;




export const useToggleText = (trueValue, falseValue, initialState=false) => {
  const [state, toggleState, setState] = useToggle(initialState)
  return [state ? trueValue : falseValue, toggleState, setState]
}





let useToggleTextTimeoutTimer;
export const useToggleTextTimeout = (trueValue, falseValue, initialState=false, timeOut=1000) => {
  const [state, toggleState, setState] = useToggle(initialState)
  
  useEffect(() => {
    if (state !== initialState && typeof timeOut === "number"){
      useToggleTextTimeoutTimer = timeOut && setTimeout(() => {
          toggleState()
        }, typeof timeOut == "number"  ? timeOut : null)
    }
    
    
  }, [toggleState, state])

  return [state ? trueValue : falseValue, toggleState, setState, state]

}
