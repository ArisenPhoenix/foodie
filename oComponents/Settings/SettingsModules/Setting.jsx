import css from "./Setting.module.css";
import SettingActions from "./SettingActions/SettingActions";
import { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../oComponents/UI/Input/Input";
import UserContext from "../../../store/user-context";
import Modal from "../../UI/Modal/Modal0";

const Setting = (props) => {
  const userCtx = useContext(UserContext);
  const [edit, setEdit] = useState("cancel");
  const [orSetting, setOrSetting] = useState(props.setting);
  const [newSetting, setNewSetting] = useState(props.setting);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const editHandler = () => {
    if (edit === "edit") {
      setEdit("cancel");
    } else {
      setEdit("edit");
    }
  };

  const handleChange = (e) => {
    console.log("handling change");
    e.preventDefault();
    const name = e.target.id;
    const value = e.target.value;
    name === "newSetting" && setNewSetting(value);
  };

  const verifyUpdate = () => {
    setShowUpdateModal(true);
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    setEdit("cancel");
    setOrSetting(newSetting);
    const update = {
      ...userCtx,
      [props.category]: {
        ...userCtx[props.category],
        [props.objKey]: newSetting,
      },
    };
    await props.updateSetting(update);
  };

  return (
    <div
      className={
        props.index === 0 || props.index === 1
          ? props.index % 2 === 0
            ? `${css.fullDiv} ${css.separate1}`
            : `${css.fullDiv} ${css.separate1} ${css.partition}`
          : props.index % 2 === 0
          ? `${css.fullDiv} ${css.separate2}  ${css.partition}`
          : `${css.fullDiv} ${css.separate1} ${css.partition}`
      }
    >
      <Modal
        show={showUpdateModal}
        title="Warning!"
        message={`Are You Sure You Want To Update${newSetting} for ${userCtx.cur}${orSetting}?`}
        okayButton="Update"
        closeButton="Cancel"
        handleNo={closeUpdateModal}
        handleYes={UpdateHandler}
      />
      <Row>
        <Col xs="7" md="6">
          {edit === "edit" ? (
            <Input
              input={{
                value: newSetting,
                separate: "false",
                onChange: handleChange,
                id: "newSetting",
                className: css.input,
              }}
            />
          ) : (
            <h3 id="orSetting" className={css.input}>
              {orSetting}
            </h3>
          )}
        </Col>
        <Col xs="5" md="6">
          <SettingActions
            data={props}
            leftText={edit === "edit" ? "Cancel" : "Edit"}
            rightText="Update"
            onLeft={editHandler}
            onRight={verifyUpdate}
            className={css.actionButtons}
          />
        </Col>
        <hr className={css.hr}></hr>
      </Row>
    </div>
  );
};

export default Setting;
