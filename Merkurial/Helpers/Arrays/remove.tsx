import { Setter } from "Merkurial/TypescriptTypes/BasicTypes"

// export const REMOVE_ITEM_FROM_ARRAY_BY_KEY = (array_of_items: any[], key: string, setter: Setter) => {
//     setter((prevs: any[]) => {
//         const slice = [...prevs]
//         slice.splice(0)
//         return [...slice]
//     })
// }


export const REMOVE_ITEM_FROM_ARRAY_BY_INDEX = (index: number, setArray: Setter) => {
    setArray((prevs: any[]) => {
        const slice = [...prevs]
        slice.splice(index, 1);
        return [...slice];
      });
}

