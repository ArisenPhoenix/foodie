// import { useState } from "react";
import TR from "./TR";
import React from "react";

const TH = (props) => {
  return <th className={props.className}>{props.data}</th>;
};

export default TH; 

export const MapHeaders = (props) => {
  return (
    <>
      {row.map((data, index) => {
        return (
          <TR>
            <TH data={data} />
          </TR>
        );
      })}
    </>
  );
};
