
export const EQUAL = (object1: any[] | {} | any, object2: any[] | {} | any) => {
    return JSON.stringify(object1) === JSON.stringify(object2)
}