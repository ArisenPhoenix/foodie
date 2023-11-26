import React from "react";

const TD = (props) => {
  return <td className={props.className}>{props.children}</td>;
};

export default TD;
