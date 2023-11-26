import Setting from "../Setting";
import { Fragment } from "react";
import { DE_KEBABIFY, SuperTitleFy } from "../../../../Merkurial/Helpers/Text/text";
import css from "../Setting.module.css"

const SettingsTier1 = (props) => {
  const base = props.nextTier;
  const key = props.valueKey
  // console.log("SettingsTier1 props: ", props)

  if (!base) {
    return;
  }
  return (
    <>
      {/* {keys.map((key, index) => {
        // const nextTier = base[key]; */}
        {/* return ( */}
          <Fragment key={`Fragment: ${base}: ${0} : ${Math.random()}`}>
          <h4 key={`${key}:${Math.random()}`} className={css.settingCategory}>
              {SuperTitleFy(DE_KEBABIFY(key))}
            </h4>
            <Setting
              setting={base}
              // objKey={key} 
              update={props.update}
              updateSetting={props.updateSetting}
              category={props.category}
            />
          </Fragment>
        {/* ); */}
      {/* })} */}
    </>
  );
};

export default SettingsTier1;
