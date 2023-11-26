import css from "./Setting.module.css";
import SettingActions from "./SettingActions/SettingActions";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import BasicFormHandler from "../../../Merkurial/Helpers/ChangeHandlers/Forms";
import Modal from "../../UI/Modal/Modal0";
import SELECTION from "../../../Merkurial/Components/UI/Basics/SELECTION/SELECTION"
import EditableInput from "../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Inputs/EditableInput";
import { useToggleText, useToggleTextTimeout } from "../../../Merkurial/hooks/Toggle";
import Label from "../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Labels/Label";

const sexOptions = ["Male", "Female", "X"]

const Setting = (props) => {
  const key = props.keyData
  const key2 = key.toLowerCase().trim()
  const type = key2 == "password" ? "password" : typeof orSetting == "number" ? "number" : "text"
  const defaultValue = key2 == "sex" ? sexOptions.find((value) => value[0].toLowerCase() == String(props.setting).toLowerCase()) : props.setting
  const [edit, toggleEdit, setEdit, isEditing] = useToggleText("edit", "cancel", false)
  const [orSetting, setOrSetting] = useState(defaultValue);
  const [newSetting, setNewSetting] = useState(defaultValue);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [error, setError] = useToggleTextTimeout("Update Failed", false , false, 2000)

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };


  const handleChange = (e) => {
    e.preventDefault();
    const setObject = key2 == "sex" || key2 == "currency" ? {
      [key2]: {setState: setNewSetting}
    } : {
      [key2]: {setState: setNewSetting}
    }
    BasicFormHandler(e, setObject)
  };

  const verifyUpdate = () => {
    setShowUpdateModal(true);
  };

  const saveSettingLocally = props.saveSettingLocally

  const UpdateHandler = async (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    toggleEdit()
    const defaultType = typeof defaultValue
    const castSetting = defaultType === "number" ? Number(newSetting) : defaultType === "boolean" ? Boolean(newSetting) : newSetting
    console.log("CAST SETTING: ", castSetting)
    const isGood = saveSettingLocally(key, defaultValue, castSetting)
    console.log("IS GOOD: ", isGood)
    !isGood && setNewSetting(orSetting)
    !isGood && setError()
  };


  const SEX = edit !== "edit" ? <Label text={newSetting} name={key2} className={css.sexLabel}/> : <SELECTION 
  value={newSetting} 
  name={key2} 
  autoComplete={key2}
  onChange={handleChange} 
  default="Select One" 
  options={sexOptions}
/>


  const InputType = key2 == "sex" 
  ? SEX

  : <EditableInput
      value={newSetting}
      type={type}
      onChange={handleChange}
      id={key2}
      name={key2}
      className={css.input}
      autoComplete={key2}
      contenteditable={edit === "edit" ? true : false}
      onDoubleClick={() => {toggleEdit(true)}}
    />

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
        message={`Are You Sure You Want To Update From ${orSetting} To ${newSetting}?`}
        okayButton="Update"
        closeButton="Cancel"
        handleNo={closeUpdateModal}
        handleYes={UpdateHandler}
      />
      <Row>
        <Col xs="7" md="7">
          {InputType} {error && error}
        </Col>
        <Col xs="5" md="5">
          <SettingActions
            data={props}
            leftText={edit === "edit" ? "Cancel" : "Edit"}
            rightText="Update"
            onLeft={toggleEdit}
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
