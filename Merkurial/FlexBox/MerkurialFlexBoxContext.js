import { useWindow } from "../hooks/usehooks";
import { createContext } from "react";
import FlexBox from "./FlexBox";

const MerkurialContext = createContext({
  numCols: Number,
  numRows: Number,
  colWidth: Number,
  rowWidth: Number,
  height: Number,
});

const FlexBoxConstructor = (numCols, numRows) => {
  // padding in %
  const { width: fullWidth, height: fullHeight } = useWindow();
  const width = fullWidth;
  const colWidth = fullWidth / numCols;
  const height = fullHeight / numRows;

  return {
    fullHeight: fullHeight,
    height: height,
    colWidth: colWidth,
    numCols: numCols,
    rowWidth: width,
    numRows: numRows,
  };
};

export const MerkurialContextProvider = (props) => {
  const cols = props.cols;
  const rows = props.rows;
  const { height, colWidth, numCols, rowWidth, numRows } = FlexBoxConstructor(
    cols,
    rows
  );

  const contextValue = {
    height: height,
    colWidth: colWidth,
    numCols: numCols,
    rowWidth: rowWidth,
    numRows: numRows,
  };
  const isUpdated = contextValue.rowWidth > 0;

  return (
    <MerkurialContext.Provider value={contextValue}>
      {isUpdated ? props.children : <h1>Loading</h1>}
    </MerkurialContext.Provider>
  );
};

export default MerkurialContext;
