import TR from "./TR";
import TD from "./TD";
import TH from "./TH";
import CREATE_REACT_KEY from "../../../Helpers/Misc/createReactKey";
import React from "react";

export const MapRows = (props) => {
  const rows = props.rows
  console.log("MAPPING ROWS...: ", rows)
  return (
    <TR className={props.className}>
      {rows.map((row, index) => {
        return (
          
            <TD className={props.dataClass} key={CREATE_REACT_KEY(index)} row={row} />
          
        )
      })}
    </TR>
  );
};

export default MapRows;


export const MapObjectArray = (props) => { 
  const rows = props.rows
  console.log("Mapping MapObjectArray")
  return (
    <>
      {
        rows.map((row, index) => {
          return (
            <TR className={props.className} key={CREATE_REACT_KEY(index)}>
              <TD className={props.className} row={row} />
            </TR>
          )
        })
      }
    </>
  )
}


export const MapHeaders = (props) => {
  const row = props.row
  const isArray = row && Array.isArray(row)
  const canRender = isArray && props.wantHeaders ? true : false
  const exclusions = props.exclusions && Array.isArray(props.exclusions) ? props.exclusions : []
  const dataRow = row.filter((filtered, index, row) => {
    return !exclusions.includes(filtered)
  })

  return (
    <TR lassName={props.rowClass}>
      {canRender && 
        dataRow.map((data, index) => {
        return <TH key={CREATE_REACT_KEY(index)} className={props.headersClass} data={data} />
      }
      )}
    </TR>
    
  );
  
};
