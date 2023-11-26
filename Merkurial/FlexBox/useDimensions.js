import { useEffect, useState, useContext } from "react";
import MerkurialContext from "./MerkurialFlexBoxContext";
import { ROW, COL } from "./DIVISORS";

const useDimensions = (children) => {
  const merkCtx = useContext(MerkurialContext);
  const { numCols, numRows } = merkCtx;
  const [columnsRendered, setColumnsRendered] = useState(0);
  const [rowsRendered, setRowsRendered] = useState(0);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (
      children &&
      children[columnsRendered] &&
      children[columnsRendered].props.dimensions
    ) {
      console.log("IN IF STATEMENT USE EFFECT");
      const loc = children[columnsRendered].props.dimensions;
      console.log(loc);
      const element = children[columnsRendered];
      const { xStart, xEnd, yStart, yEnd } = loc;
      const newWidth = xEnd - xStart;
      const newHeight = yEnd - yStart;

      setCols((prev) => {
        return [...prev, { col: element, width: newWidth, height: newHeight }];
      });

      setRows((prev) => {
        return [...prev, ROW];
      });
    } else if (columnsRendered !== numCols) {
      setCols((prev) => {
        return [...prev, COL];
      });
      setColumnsRendered((prev) => prev + 1);
    }
    if (rowsRendered !== numRows) {
      setRows((prev) => {
        return [...prev, ROW];
      });
      setRowsRendered((prev) => prev + 1);
    }
  }, [columnsRendered, rowsRendered, numRows, numCols]);

  return { cols: cols, rows: rows };
};

export default useDimensions;
