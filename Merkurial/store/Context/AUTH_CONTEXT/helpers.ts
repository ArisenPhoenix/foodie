import { Sex } from "../../../SQL/OBJECT_CLASS/SQL_TYPES"
import { SAVE_TO_LOCAL_STORAGE } from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE"

interface SetIsLoggingOut {
    (object: boolean): void
}


interface AuthData {
    isAdmin: Boolean,
    isUser: Boolean,
    userid: number | null,
}


interface UserData {
    userid: number | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    username: string | null,
    password: string | null,
    currency: string | null,
    sex: Sex,
    days_for_main_meals: number,
    days_for_other_meals: number,
}


export interface UserObject {
    userid: number | null,
    username: string | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null
    password: string | null,
    isUser: boolean,
    isAdmin: boolean,
    currency: string,
    sex: Sex | null,
    days_for_main_meals: number,
    days_for_other_meals: number
}


export const defaultUserData: UserData = {
    userid: null,
    first_name: null,
    last_name: null,
    email: null,
    username: null,
    currency: null,
    sex: "X",
    password: null,
    days_for_main_meals: 7,
    days_for_other_meals: 3,
}


export const defaultAuthData: AuthData = {
    isAdmin: false,
    isUser: false,
    userid: null,
}

export const defaultUserObject: UserObject = {
    userid: 0,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    username: null,
    isAdmin: false,
    isUser: false,
    currency: "$",
    sex: "X",
    days_for_main_meals: 7,
    days_for_other_meals: 3
}

interface SetUserData {
    (userData: UserData): void
}

interface SetAuthData {
    (authData: AuthData): void
}

export const removeAuthorization = (setLoggingOut: SetIsLoggingOut, setAuthData: SetAuthData) => {
    setLoggingOut(true);
    setAuthData(defaultAuthData);
}; 

export const addAuthorization = (authData: AuthData, setAuthData: SetAuthData) => {
    setAuthData(authData)
}


export const loginUser = (creds: UserObject, setAuthData: SetAuthData, setUserData: SetUserData) => {
    const {first_name, last_name, email, username, userid, password, currency, sex} = creds
    if (first_name && last_name && email && username && userid && password && currency && sex){
        const authData: AuthData = {
            isAdmin: password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
            isUser: true,
            userid: userid
        }

        const userData: UserData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            userid: userid,
            username: username,
            currency: currency,
            password: password,
            sex: sex,
            days_for_main_meals: creds.days_for_main_meals,
            days_for_other_meals: creds.days_for_other_meals
        }

        const saveObj = {auth_data: {...authData, password: password}, user_data: userData}
        SAVE_TO_LOCAL_STORAGE(saveObj, `foodie_last_user`)
        
        setAuthData(authData)
        setUserData(userData)

        return {isAdmin: authData.isAdmin, isUser: authData.isUser}
    } else {
        return defaultAuthData
    }
}  
