import css from "./FlexBox.module.css";

export const COL = (props) => {
  const num = props.num ? props.num : 1;
  const width = props.width * num;
  const child = { element: props.element, data: props.data };
  const styles = {
    width: width,
    height: "inherit",
  };

  const defaultOnClick = () => console.log("Location: ", props.id);
  return (
    <div
      className={css.col}
      style={styles}
      onClick={props.onClick ? props.onClick : defaultOnClick}
    >
      {child.element ? <child.element data={child.data} /> : "box"}
    </div>
  );
};

export const ROW = (props) => {
  const height = props.height;
  const width = props.width;
  const styles = {
    width: width,
    height: height,
  };

  return (
    <div className={css.row} style={styles} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
