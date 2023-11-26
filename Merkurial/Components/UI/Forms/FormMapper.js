import css from "./FormMapper.module.css";
import { Fragment } from "react";
import FormLabelGroup from "./FormLabelGroup/FormLabelGroup";
import { useClass } from "../../../hooks/usehooks";
import { cleanTextForForm } from "../../../Helpers/Text/text";
import React from "react";

const FormMapper = (props) => {
  const keys = Object.keys(props?.data ? props.data : []);
  const mainClass = useClass([props.className]);

  return (
    <div className={mainClass}>
      {keys.map((key, index) => {
        const inputArgs = props.data[key];
        const labelText = cleanTextForForm(key, "_", " ", true);
        return (
          <Fragment key={`${key} | ${index}`}>
            <FormLabelGroup
              text={labelText}
              value={inputArgs.value}
              unCleanedText={key}
              inputArgs={inputArgs}
              updateFormData={props.updateFormData}
              pullUpStates={props.pullUpStates}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default FormMapper;
