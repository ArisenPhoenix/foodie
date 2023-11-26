import { Fragment } from "react";
import Setting from "../Setting";
const SettingsTier2 = (props) => {
  const base = props.nextTier;
  const keys = Object.keys(base);

  if (!keys) {
    return;
  }
  return (
    <Fragment>
      {keys.map((key, index) => {
        return (
          <Fragment key={`Fragment: ${key}: ${index} : ${Math.random()}`}>
            <Setting setting={base} />
          </Fragment>
        );
      })}
    </Fragment> 
  );
};

export default SettingsTier2;
