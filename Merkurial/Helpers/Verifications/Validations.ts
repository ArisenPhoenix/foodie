import { ReactPropTypes } from "react"

export const VALIDATE_PROP = (prop:ReactPropTypes): ReactPropTypes|null => {
    return prop ? prop : null
}


export const VALIDATE_ENTRY = (entry:string|number, obj:Object):boolean => {
    try {
        obj[entry]
        return true
    } catch {
        return false
    }
}


export const DEFAULT_PROP = (prop:ReactPropTypes, defaultValue: string|number) => {
    return prop ? prop : defaultValue

}


export const VALIDATE_EMAIL = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
    }
    return false

}


export const VALIDATE_PASSWORD = (password: string, min: number = 6, max: number=19) => {
    const specialChars = /[`!@#$%&()\[\]\\|.<>\/?~]/;
    const upperCase = /[A-Z]/
    const lowerCase = /[a-z]/
    const basic  = /^[a-zA-Z!@#$%0-9&()\[\]\\|.<>\/?~]]{min,max}$/;
    const numbers = /[0-9]/
    const punctuation = /[,;:'"{}]/

    switch (true) {
        case password.length < min:
            return {ok: false, message: `Password may not contain less than ${min} characters`};
        case password.length > max:
            return {ok: false, message: `Password may not contain more than ${max} characters`};
        case !upperCase.test(password):
            return {ok: false, message: `Password must contain at least one Capital letter`}
        case !lowerCase.test(password):
            return {ok: false, message: `Password must contain at least one lowercase letter`}
        case !numbers.test(password):
            return {ok: false, message: `Password must contain at least 1 number`}
        case !specialChars.test(password):
            return {ok: false, message: `Password must contain at least 1 special character`}
        case punctuation.test(password):
            return {ok: false, message: `Password may not contain: ,;:'"{}`}
        case basic.test(password):
            return {ok: false, message: `Password does not meet the basic requirements`};
        default:
            return {ok: true, message: null}
    }
}
