import SettingsTier1 from "./SettingsModules/SettingsTier1/SettingsTier1";
import css from "./SettingsPage.module.css";
import { Fragment, useState } from "react";
import PostButton from "../UI/Button/PostButton/PostButton";

const SettingsPage = (props) => {
  const [isUpdated, setIsUpdated] = useState(null);
  const [saveText, setSaveText] = useState("Save Changes");
  const base = props.base;
  const keys = Object.keys(base);

  const updateProfile = async (e) => {
    e.preventDefault();
    setSaveText("Saving...");
    await props.update();
    setTimeout(() => {
      setIsUpdated(null);
      setSaveText("Save Changes");
    }, 3000);
    setSaveText("Saving...");
    setIsUpdated("Updating Profile...");
  };

  if (!keys) {
    return;
  }

  return (
    <>
      <span className={css.heading}>
        <h1 className={css.settingsText}>Settings</h1>
        <h6 className={css.updateText}>{isUpdated}</h6>
      </span>

      <div className={css.saveAllDiv}>
        {keys.length > 1 && (
          <PostButton
            onClick={updateProfile}
            text={saveText}
            className={css.saveAll}
          />
        )}
      </div>
      {keys.map((key, index) => {
        const nextTier = base[key];
        if (
          key === "others" ||
          key === "_id" ||
          key === "userId" ||
          key === "type" ||
          key === "localId"
        ) {
          return null;
        }
        return (
          <Fragment key={`Fragment: ${key}: ${index} : ${Math.random()}`}>
            <h4 key={`${key}:${Math.random()}`} className={css.settingCategory}>
              {key}
            </h4>

            <SettingsTier1
              nextTier={nextTier}
              category={key}
              update={props.update}
              updateSetting={props.updateSetting}
              key={`${key}: ${index} : ${Math.random()}`}
            />
          </Fragment>
        );
      })}
      <div className={css.saveAllDiv}>
        {keys.length > 1 && (
          <PostButton
            onClick={updateProfile}
            text={saveText}
            className={css.saveAll}
          />
        )}
      </div>
    </>
  );
};

export default SettingsPage;
