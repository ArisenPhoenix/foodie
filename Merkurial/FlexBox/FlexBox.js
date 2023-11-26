import { Fragment, useContext } from "react";
import MerkurialContext from "./MerkurialFlexBoxContext";
import useDimensions from "./useDimensions";

const FlexBox = (props) => {
  const merkCtx = useContext(MerkurialContext);
  const { height, colWidth, rowWidth } = merkCtx;
  const { rows, cols } = useDimensions(props.children);

  return (
    <>
      {rows.map((Row, rowIndex) => {
        return (
          <Fragment key={rowIndex}>
            <Row
              key={`ROW ${rowIndex}`}
              id={`ROW ${rowIndex}`}
              height={height}
              width={rowWidth}
            >
              {cols.map((Col, colIndex) => {
                const width = Col.width ? Col.width : colWidth;
                const colHeight = Col.height ? Col.height : height;
                return (
                  <Fragment key={`Fragment X ${colIndex} | Y ${rowIndex}`}>
                    {Col.col ? (
                      <span
                        style={{
                          width: colWidth * width,
                          height: height * colHeight,
                          margin: 0,
                          padding: 0,
                          backgroundColor: "",
                        }}
                      >
                        {Col.col}
                      </span>
                    ) : (
                      <Col />
                    )}
                  </Fragment>
                );
              })}
            </Row>
          </Fragment>
        );
      })}
    </>
  );
};

export default FlexBox;
