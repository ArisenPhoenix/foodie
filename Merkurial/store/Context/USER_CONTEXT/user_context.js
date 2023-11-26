import { createContext, useEffect, useState } from "react";
import { REMOVE_FROM_LOCAL_STORAGE, RETREIVE_FROM_LOCAL_STORAGE, SAVE_TO_LOCAL_STORAGE } 
from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE.js";
import { logoutUser } from "./helpers.js";
import useToggle from "../../../hooks/Toggle.js";
import { useRouter } from "next/router";
import SQL_ROW from "Merkurial/SQL/OBJECT_CLASS/SQL_ROW";
import { userSchema } from "merkurialSchemas.ts";

const default_user_data = {
    first_name: null,
    last_name: null,
    email: null,
    username: null,
    userid: null,
    currency: null,
    password: null,
    days_for_main_meals: 7,
    days_for_other_meals: 3,
    sex: "X",
}
 
export const USER_CONTEXT = createContext({
    currentUserPage: null, 
    isPrinting: false,

    toggleIsPrinting: () => {},
    logoutUser: () => {},
    login: async () => {},
    saveLastPageData: () => {},
    getLastPageData: () => {},
    userData: default_user_data,
    settingsFuncs: {
        updateUserSetting: (columnName, oldValue, newValue) => {ok: Boolean,  data=Array|Boolean},
        updateUserSettingsToDB: async (userid) => true | false
    }
}); 


  

export const USER_CONTEXT_PROVIDER = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(default_user_data); 
    const [loggingOut, toggleIsLoggingOut, setIsLoggingOut] = useToggle(false);

    const updateUserSetting = (columnName, oldValue, newValue, limit=false) => {
        if (typeof oldValue == typeof newValue && oldValue != newValue){
            const canUpdate = 
            limit && typeof limit == "number" && limit > 0 
            ?
                typeof newValue == "string" 
                ? newValue.length < limit 
                    ? true 
                    : false 
                : typeof newValue == "number" 
                    ? newValue <= limit 
                        ? true 
                        : false 
                    : true
            : true

            if (canUpdate){
                setUserData((prevUserData) => {
                    const updatedValue = columnName == "sex" ? newValue[0] : newValue
                    const newUserData = {...prevUserData, [columnName]: updatedValue}
                    return newUserData
                })
                return true
            }
            
        }
        return false
      }
    
    const updateUserSettingsToDB = async (userid) => {
        if (userData.userid === userid){
            const userRow = new SQL_ROW(userData, "users", userSchema, "/api/postgres", false, "userid")
            const updateRes = await userRow.update()
            if (updateRes.err == null){
                return {ok: true, message: null}
            } else {
                return {ok: false, message: "Update Failed."}
            }
            
          } else {
              
            return {ok: false, data: "You Don't Have The Authority To Update User Settings."}
          }
    }

    const login = (user_data) => {
        setUserData(user_data)
    }

    const logout = () => {
        logoutUser(toggleIsLoggingOut, setUserData)
        setIsLoggingOut(true)
    };

    const user_value = {
        userData: userData,
        logout: logout,
        login: login,
        
        setUserData: setUserData,
        settingsFuncs: {
            updateUserSettingsToDB: updateUserSettingsToDB,
            updateUserSetting: updateUserSetting
        }
    };

    useEffect(() => {
        if (loggingOut) {
            console.log("Logging Out")
            REMOVE_FROM_LOCAL_STORAGE(userData.username)
            REMOVE_FROM_LOCAL_STORAGE("last_user")
            setIsLoggingOut(false);
            router.push("/login");
        } 

    }, [user_value.isLoggedIn, loggingOut]);
    return (
        <USER_CONTEXT.Provider value={user_value}>
            {props.children}
        </USER_CONTEXT.Provider>
    );
};

export default USER_CONTEXT;
