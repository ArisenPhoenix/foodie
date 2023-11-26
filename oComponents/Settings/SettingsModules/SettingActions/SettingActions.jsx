import css from "./SettingActions.module.css";
import PostButton from "../../../UI/Button/PostButton/PostButton";
import { Col, Row } from "react-bootstrap";

const SettingActions = (props) => {
  const classes = `${props.className} ${css.mainDiv}`;
  const editClass = props.leftText === "Edit" ? css.top : css.top2;
  return (
    <Col className={classes}>
      <Row>
        <PostButton
          text={props.leftText}
          onClick={props.onLeft}
          className={editClass}
          divclass={css.topDiv}
        />
      </Row>
      <Row>
        {props.leftText === "Cancel" && (
          <PostButton
            text={props.rightText}
            onClick={props.onRight}
            className={css.bottom}
            divclass={css.bottomDiv}
          />
        )}
      </Row>
    </Col>
  );
};

export default SettingActions;
