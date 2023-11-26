import css from "./SettingsPage.module.css";
import { Fragment, useState, useContext } from "react";
import PostButton from "../UI/Button/PostButton/PostButton";
import SettingsStart from "./SettingsModules/SettingsStart/SettingsStart";
import USER_CONTEXT from "../../Merkurial/store/Context/USER_CONTEXT/user_context";
import { SingleButtonTextModal } from "../../Merkurial/Components/UI/BootStrap/Modal/TextModal"
import { useRouter } from "next/router";
import AUTH_CONTEXT from "../../Merkurial/store/Context/AUTH_CONTEXT/auth_context";
import { useToggleText } from "../../Merkurial/hooks/Toggle";
import { useMessage } from "../../Merkurial/hooks/useMessage";


const SettingsPage = (props) => {
  const router = useRouter()
  const userCtx = useContext(USER_CONTEXT)
  const authCtx = useContext(AUTH_CONTEXT)
  const userid = userCtx.userData.userid
  const [isUpdated, setIsUpdated] = useToggleText(null);
  const [message, setMessage] = useMessage(2000)
  const [saveText, toggleSaveText] = useToggleText("Saving", "Save Changes", false)

  const [password, setPassword] = useState(false)
  const [passwordIsVerified, setPasswordIsVerified] = useState(false)
  const base = props.base;
  const keys = Object.keys(base);


  const handleVerifyPassword = (e) => {
    e.preventDefault()
    if (password === authCtx.password){
      setPasswordIsVerified(true)
    } else {
      setMessage("Password Doesn't Match")
    }
  }


  const saveSettingsToDB = async (e) => {
    e.preventDefault();
    if (passwordIsVerified){
      toggleSaveText()
      const updateRes = await userCtx.settingsFuncs.updateUserSettingsToDB(userid)
      if (updateRes.ok){
        setIsUpdated("Settings Updated")
        authCtx.login(userCtx.userData, false)
      } 
      toggleSaveText()
      console.log("updateDBRes: ", updateRes)
    } else {
      handleVerifyPassword()
    }
  };



  const saveSettingLocally = (key, orSetting, newSetting) => {
    if (passwordIsVerified){
      return userCtx.settingsFuncs.updateUserSetting(key, orSetting, newSetting)
    } else {
      handleVerifyPassword()
    }
    
  };

  if (!keys) {
    return null;
  }


  const handleChange = (e) => {
    const {id, name, value} = e.target
    name === "password" && setPassword(value)
  }


    {return passwordIsVerified ?
      <>
      <span className={css.heading}>
        <h1 className={css.settingsText}>Settings</h1>
        <h6 className={css.updateText}>{isUpdated && isUpdated }</h6>
      </span>

      <div className={css.saveAllDiv}>
        {keys.length > 1 && (
          <PostButton
            onClick={saveSettingsToDB}
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
          key === "userid" ||
          key === "type" ||
          key === "localId"
        ) {
          return null;
        } 
        return (
          <Fragment key={`${key} | ${index}`}>
            <SettingsStart
              nextTier={nextTier}
              valueKey={key}
              saveSettingLocally={saveSettingLocally}
              
            />
          </Fragment> 
        );
      })}
      <div className={css.saveAllDiv}>
        {keys.length > 1 && (
          <PostButton
            onClick={saveSettingsToDB}
            text={saveText}
            className={css.saveAll}
          />
        )}
      </div>
      </>
    : <SingleButtonTextModal
          input={
            {
            value: password,
            onChange: handleChange,
            name: "password",
            id: "password",
            type: "password",
            autoComplete: "off",
            placeholder: "Password"
            }
          }
          show={true}
          title="Verify Password"
          close={() => {router.push("/")}}
          submit={handleVerifyPassword}
          text="Submit"
          errorMsg={message}
      />
    }

};


export default SettingsPage;
