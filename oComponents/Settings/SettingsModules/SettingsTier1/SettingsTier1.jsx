import Setting from "../Setting";
import { Fragment } from "react";

const SettingsTier1 = (props) => {
  const base = props.nextTier;
  const keys = Object.keys(base);
  const category = props.category;

  if (!keys) {
    return;
  }
  return (
    <>
      {keys.map((key, index) => {
        const nextTier = base[key];
        return (
          <Fragment key={`Fragment: ${key}: ${index} : ${Math.random()}`}>
            <h3 key={`${key}:${Math.random()}`}>{key}</h3>
            <Setting
              setting={nextTier}
              objKey={key}
              update={props.update}
              updateSetting={props.updateSetting}
              category={props.category}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default SettingsTier1;
