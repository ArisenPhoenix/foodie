import React from "react";

const TB = (props) => {
  // console.log("TB IS BEING RENDERED")
  return <tbody className={props.className}>{props.children}</tbody>
};
export default TB;
