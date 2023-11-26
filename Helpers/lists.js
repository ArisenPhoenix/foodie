import { SINGLE_SORT } from "../Merkurial/Helpers/Objects/sort";

export const DELETE_LIST_ITEM = (setState, id) => {
  setState((prev) => {
    prev.splice(id, 1);
    return [...prev];
  });
};

export const ADD_LIST_ITEM = (setState, new_item, sortby = "") => {
  console.log("ADDING NEW ITEM: ", new_item)
  setState((prev) => {
    console.log("PREV: ", prev)
    let newList = [...prev, new_item];
    console.log("NEW LIST BEFORE SORT: ", newList)
    newList = SINGLE_SORT(newList, sortby);
    console.log("NEW LIST AFTER SORT: ", newList)
    return newList;
  });
};

export const UPDATE_LIST_ITEM = (setState, new_item, id, sortby = "") => {
  setState((prev) => {
    let new_list = [...prev];
    new_list = SINGLE_SORT(new_list, sortby);
    return new_list;
  });
};