import { Setter, AnyArray } from "Merkurial/TypescriptTypes/BasicTypes"

export const APPEND_ITEM_TO_ARRAY = (newItem: any, setArray: Setter) => {
    setArray((prevs: AnyArray) => {
        return [...prevs, newItem]
    })
}