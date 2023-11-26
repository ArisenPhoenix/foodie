import React, { useRef, useEffect } from "react";
import css from "./useOutsideAlerter.module.css";
import { useClass } from "./usehooks";

let timer
//  Hook that alerts clicks outside of the passed ref
export const useOutsideAlerter = (ref, setToFalse) => {
  // console.log("CLICKED OUTSIDE OF DROP DOWN");
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        timer = setTimeout(() => {
          // Timeout needed in order to prevent the action before a previous action
          // In other words this is essentially a callback
          setToFalse(false);
        }, 150)
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer)
    };
  }, [ref]);
};

const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  const setToFalse = props.setToFalse;
  const classes = useClass([css.div, props.className])
  useOutsideAlerter(wrapperRef, setToFalse);
    return (
      <div ref={wrapperRef} className={classes}>
        {props.children}
      </div>
    );
};
export default OutsideAlerter;
