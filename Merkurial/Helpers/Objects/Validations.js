






export const IS_OBJECT = (obj) => {
    return !Array.isArray(obj) && typeof obj == "object" ? true : false
}
 
export const IS_POPULATED_OBJECT = (obj) => {
    return IS_OBJECT(obj) && Object.keys(obj).length > 0 ? true : false
}

export const IS_POPULATED_OBJECT_ARRAY = (array, depth, gone=0) => {
    const newGone = gone + 1
    // if (newGone > 1){
    //     console.log("Calling IS_POPULATED_OBJECT_ARRAY RECURSIVELY")
    // } else {
    //     console.log("Calling IS_POPULATED_OBJECT_ARRAY FOR THE FIRST TIME")
    // }

    if (newGone !== depth){
        if (Array.isArray(array)){
            for (const apparentArray of array){
                return IS_POPULATED_OBJECT_ARRAY(apparentArray, depth, newGone)
            }
            
        } else {
            // console.log(`While Searching Data of Type: ${typeof array} was found`)
            return false
        }
    } else {
        if (Array.isArray(array)){
            for (const obj of array){
                if (!IS_POPULATED_OBJECT(obj)){
                    // console.log("An Empty Object Was Found RETURNING FALSE")
                    return false
                }
            }
            return true
        } else {
            // console.log(`No Array Found At Specified Depth Of ${depth}`)
            // console.log(array, " Was Found")
            return false
        }
    }
}


export const IS_OBJECT_ARRAY = (array) => {
    if (Array.isArray(array) && array.length > 0){
        for (const obj of array){
            if (!IS_OBJECT(obj)){
                return false
            }
        }
        return true
    }
    return false
}