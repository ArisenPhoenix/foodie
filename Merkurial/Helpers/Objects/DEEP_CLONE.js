const DEEP_CLONE = (object) => {
    if (!object || object == null){
        return object
    }
    else if (typeof object === "string" || typeof object === "number"){
        const newObject = object
        return newObject
    } else {
        if (Array.isArray(object)){
            const clone = object.map(item => Array.isArray(item) ? clone(item) : item);
        } else if (typeof object === "object"){
            const clone = Object.keys.map(key => !Array.isArray(object[key] && typeof object[key] === "object" ? clone(object[key]) : object[key]))
        }
    }
}


const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
