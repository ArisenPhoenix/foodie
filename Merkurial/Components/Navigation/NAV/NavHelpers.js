import otherCss from "./NonSpecified.module.css"

/**
 * Simple function with switch statement which returns a css module depending on size provided
 * 
 * size is determined by the value which follows the bootstrap sizing methodology
 * @type string
 * @param {string "xl", "lg", "md", "sm", "xs", "xxs"} radius
 * 
 * @returns {string}
 */
export const getRadius = (radius) => {
    if (typeof radius === "string"){
        switch (radius.toLowerCase()) {
            case "xl":
                return [otherCss.radiusXl, otherCss.radiusXlI];
    
            case "lg":
                return [otherCss.radiusL, otherCss.radiusLI]
            
            case "md":
                return [otherCss.radiusM, otherCss.radiusMI]
            
            case "sm":
                return [otherCss.radiusS, otherCss.radiusSI]
            
            case "xs":
                return [otherCss.radiusXs, otherCss.radiusXsI]
        
            default:
                return ["", ""]
        }
    } else {
        return ["", ""]
    }
}

export const getTransition = (transitionType) => {
    if (typeof transitionType == "string"){
        switch (transitionType) {
            case "pop":
                return otherCss.pop
                    
            default:
                return ""
        }
    } else {
        return ""
    }
}


export const verifyWidthHeightForCss = (stringWidth, stringHeight, units="rem") => {
    let width; let height;
    if (typeof stringWidth == "number"){
        width = String(stringWidth) + units
    } else {
        try {
            if (Number(stringWidth[0])){
                width = stringWidth
            } 
        } catch {
            width = null;
        }
    }

    if (typeof stringHeight == "number"){
        height = String(stringHeight) + units
    } else {
        try {
            if (Number(stringHeight[0])){
                height = stringHeight
            }
        } catch {
            height = null;
        }
    }
    
    return [width, height]

}

export const determineAcess = (isUser, isAdmin, requiresUser, requiresAdmin, requiresLogin, isPublic ) => {
    const isLoggedIn = isUser || isAdmin
    // const accessObj = {
    //     isUser: isUser,
    //     isAdmin: isAdmin,
    //     isLoggedIn: isLoggedIn,
    //     requiresUser: requiresUser,
    //     requiresAdmin: requiresAdmin,
    //     isPublic: isPublic,
    //     requiresLogin: requiresLogin

    // }
    
    switch (true) {
        case isPublic:
            // console.log("IsPublic")
            return true

        case !requiresLogin && !isLoggedIn:
            // console.log("Doesn't Require Login")
            return true

        case requiresLogin && isLoggedIn:
            // console.log("Requires Login")
            return true
            
        case requiresAdmin && isAdmin:
            // console.log("Requires Admin")
            return true

        case requiresUser && isUser:
            // console.log("Requires User")
            return true

        default:
            return false;
    }
}