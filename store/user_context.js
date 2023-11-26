import { createContext, useEffect, useState } from "react";
import { REMOVE_FROM_LOCAL_STORAGE, RETREIVE_FROM_LOCAL_STORAGE, SAVE_TO_LOCAL_STORAGE } 
from "../Merkurial/API_STORAGE/STORAGE/HANDLE_STORAGE.js";
import useToggle from "../Merkurial/hooks/Toggle.js";
import { useRouter } from "next/router";

const default_user_data = {
    first_name: null,
    last_name: null,
    userid: null,
    currency: null,
}
 
export const USER_CONTEXT = createContext({
    ...default_user_data,

    currentUserPage: null, 
    isPrinting: false,

    toggleIsPrinting: () => {},
    logoutUser: () => {},
    loginUser: async () => {},
    saveLastPageData: () => {},
    getLastPageData: () => {},
});

export const USER_CONTEXT_PROVIDER = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(default_user_data); 
    const [loggingOut, toggleIsLoggingOut] = useToggle(false);
    const saveData = {
        userData: userData,
        lastPageData: lastPageData,
    }
    const [lastPageData, setLastPageData] = useState({})

    

    const login = async(email, password) => {
        return await loginUser(email, password, setUserData)
    }

    const logout = () => {
        toggleIsLoggingOut()
        // logoutUser(toggleIsLoggingOut, setUserData);
    };

    const user_value = {
        ...userData,
        logout: logout,
        login: login,
        
        setUserData: setUserData,
    };

    useEffect(() => {
        if (loggingOut) {
            REMOVE_FROM_LOCAL_STORAGE(userData.username)
            REMOVE_FROM_LOCAL_STORAGE("last_user")
            toggleIsLoggingOut(false);
        } else if (userData.isLoggedIn) {
            SAVE_TO_LOCAL_STORAGE(saveData, userData.username);
            REMOVE_FROM_LOCAL_STORAGE("last_user")
        } else if (user_value.isLoggedIn && !loggingOut) {
            const retreivedUserData = RETREIVE_FROM_LOCAL_STORAGE("last_user");
            if (retreivedUserData) {
                setUserData(retreivedUserData);
            } else {
                router.push("/login");
            }
        }

    }, [user_value.isLoggedIn, loggingOut]);
    return (
        <USER_CONTEXT.Provider value={user_value}>
            {props.children}
        </USER_CONTEXT.Provider>
    );
};

export default USER_CONTEXT;
