import TAB from "./TAB";
import TB from "./TB";
import TH from "./TH";
import TR from "./TR";
import TD from "./TD";
import MapRows, { MapHeaders } from "./MapData";
import CREATE_REACT_KEY from "../../../Helpers/Misc/createReactKey";

export const Table = (props) => {
  return <TAB className={props.className}>{props.children}</TAB>
};

export const T_BODY = (props) => {
  // console.log("T_BODY IS BEING RETURNED")
  return <TB className={props.className}>{props.children}</TB>
};

export const T_HEADER = (props) => {
  return <TH className={props.className}>{props.children}</TH>
};

export const T_ROW = (props) => {
  const onRowClick = () => {
    const index = props.index
    props.onClick(index)
  }
  return (
    <TR
      className={props.className}
      index={props.index}
      onClick={onRowClick}
      value={props.value}
    >
      {props.children}
    </TR>
  );
};

export const T_DATA = (props) => {
  return <TD className={props.className}>{props.data}</TD>
};


export const T_DATA_ROWS = (props) => {
  const data = props.data

  const isObject = data && typeof data[0] == "object" && !Array.isArray(data[0])
  const isArray = Array.isArray(data[0])
  const canRender = isObject || isArray
  const dataType = canRender ? isObject ? "object" : "array" : null
  
  console.log("T_DATA DATA: ", dataRows)

  return (
    <TR className={props.rowClass}>
      {canRender && dataRows.map((row, index) => {
        return dataRow.map((item, index) => {
          return <T_DATA key={`${item}|${index}`} data={item} />
        }) 

      })}
    </TR>
  )
}


const removeExcludedData = (thatBeingFiltered, thoseKeysBeingExcluded) => {
  const thatItemsKeysBeingFiltered = Object.keys(thatBeingFiltered)
  for (let key of thatItemsKeysBeingFiltered){
    if (thoseKeysBeingExcluded.includes(key)){
      delete thatBeingFiltered[key]
      thatBeingFiltered[key] = undefined
      
    }
  }
  return thatBeingFiltered
}

export const MAP_OBJECT_ARRAY = (props) => {
  const rows = props.rows
  const canRender = rows && Array.isArray(rows)
  const exclusions = props.exclusions && Array.isArray(props.exclusions) ? props.exclusions : []
  return (
      <>
      {canRender && 
        rows.map((dataRow, index) => {
          return (
          <T_ROW key={`T_ROW ${index}`} index={index} id={index} onClick={props.onRowClick}>
            {Object.keys(dataRow).map((key, index) => {
              return exclusions.includes(key) ? null : <T_DATA key={index} data={dataRow[key]}/>
            })}
          </T_ROW>)
        })
      }
      </>
  );
}


export const OBJECT_ARRAY_TABLE = (props) => {
  const rows = props.rows 
  // console.log("ROWS: ", rows)
  const isValidArray = rows && Array.isArray(rows) && rows.length > 0
  const isValidObject = typeof rows[0] == "object" && !Array.isArray(rows[0])
  const exclusions = props.exclusions
  const wantHeaders = props.wantHeaders

  const onColumnClick=props.onColumnClick ? props.onColumnClick :() => {}
  const onRowClick=props.onRowClick ? props.onRowClick :() => {}
  const onCellClick=props.onCellClick ? props.onCellClick :() => {}
  const onTableClick=props.onTableClick ? props.onTableClick :() => {}
  const headers = rows[0] ? Object.keys(rows[0]) : []
  const headers2 = rows[0] ? Object.values(rows[0]) : []
   
  return (  
    <>
    { isValidArray && isValidObject && rows && Array.isArray(rows) ? 
      <Table className={props.tableClass}>
        <T_BODY>
          <MapHeaders exclusions={exclusions} className={props.headersClass} wantHeaders={wantHeaders} row={Object.keys(rows[0])} />
          <MAP_OBJECT_ARRAY exclusions={exclusions} dataClass={props.dataClass} rowClass={props.rowClass} rows={rows} onRowClick={onRowClick}/>
        </T_BODY>
      </Table>
      : null 
    }
    </>
  )
}


const TABLE = (props) => {
  const wantHeaders = props.wantHeaders;
  return (
  <Table >
    <T_BODY >
  {
    props.data && Array.isArray(props.data) ? props.data.map((table, index) => {
      return (
        <>
        {table && Array.isArray(table) && 

          table.map((row, index) => { 
          return (
            <div key={CREATE_REACT_KEY(index)}>
              {wantHeaders && <MapHeaders className={props.headerClass} data={Object.keys(row)} />}
              <MapData data={Object.values(row)} />
            </div>
          )
        })

        }
        </>
      )
    }) : null
  }
    </T_BODY>
  </Table>
  )
};

export default TABLE;
