import TD from "./TD";
import React from "react";

const TR = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick && props.onClick({ ...props.value, index: props.index });
  };

  return (
    <tr
      className={props.className}
      onClick={handleClick}
      value={props.value}
      index={props.index}
    >
      {props.children}
    </tr>
  );
};

export default TR;

export const MapRows = (props) => {
  return (
    <>
      {row.map((data, index) => {
        return (
          <TR key={`Ingredient Row ${index}`} value={props.value ? props.value : null} onClick={props.onClick}>
            <TD data={data} />
          </TR>
        )
      })}
    </>
  );
};
