import Setting from "../Setting";
import { DE_KEBABIFY, SuperTitleFy } from "../../../../Merkurial/Helpers/Text/text";
import css from "../Setting.module.css"
import { Fragment } from "react";

const SettingsStart = (props) => {
  const base = props.nextTier;
  const key = props.valueKey

  if (!base) {
    return;
  }
  return (
    <Fragment key={`Setting | ${key}`}>
        <h4  className={css.settingCategory}>
            {SuperTitleFy(DE_KEBABIFY(key))}
        </h4> 
        <Setting
            setting={base}
            keyData={key}
            saveSettingLocally={props.saveSettingLocally}
            category={props.category}
        />
    </Fragment>
  );
};

export default SettingsStart;