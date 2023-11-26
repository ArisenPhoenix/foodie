import { copyArray } from "../Arrays/copy"

type mapCallback = (key: string, value: any, index: number, array: any[] | undefined) => {}
type reduceCallback = (newObj: {} | any[], key: string, value: any, index: number, array: any[]) => {}

/**
 * Takes An Object And Callback Which Iterates Over Keys And You Can Define Logic In Callback return new Object
 * @param {*} obj Javascript Object
 * @param {*} callback callback function used just like in an Array.map(callback)
 * @param callback Takes Four Arguments: newObj, key, value, index, array
 * @param final Type Of Object To Be Returned
 * @returns new Object if the object is not an array else undefined
 */

export const REDUCE_OBJECT = (obj: {}, callback: reduceCallback, final={}) => {
    if (typeof obj === "object" && !Array.isArray(obj)){
        const OBJ = copyArray(obj)

        return Object.keys(OBJ).reduce((newObj, key, index, array) => {
            const KEY = key
            const VALUE = OBJ[KEY]
            return callback(newObj, KEY, VALUE, index, array) 
        }, final)
    }
}


/**
 * Takes An Object And Callback Which Iterates Over Keys And You Can Define Logic In Callback return new Object
 * @param {*} obj Javascript Object
 * @param {*} callback callback function used just like in an Array.map(callback)
 * @param callback Takes Four Arguments: newObj, key, value, index, array
 * @param thisArg Type Of Object To Be Returned
 * @returns new Object if the object is not an array else undefined
 */
export const MAP_OBJECT = (obj: {}, callback: mapCallback, thisArg) => {
    if (typeof obj === "object" && !Array.isArray(obj)){
        const OBJ = copyArray(obj)
        return Object.keys(OBJ).map((key, index, array) => {
            const KEY = key
            const VALUE = OBJ[KEY]
            return callback(KEY, VALUE, index, array) 
        }, thisArg)
    }
}