import SettingsPage from "../../oComponents/Settings/SettingsPage";
import { useContext } from "react";
import USER_CONTEXT from "../../Merkurial/store/Context/USER_CONTEXT/user_context";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";

const Settings = () => {
  const userCtx = useContext(USER_CONTEXT)

  return (
    <AUTH_GUARD needsAdmin={false} needsLoggedIn={true} needsUser={true}>
      <SettingsPage
        base={userCtx.userData}
        updateSetting={userCtx.settingsFuncs.updateUserSetting}
      />
    </AUTH_GUARD>
  );
};

export default Settings;
