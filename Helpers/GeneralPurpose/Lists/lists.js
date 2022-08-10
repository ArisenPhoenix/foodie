import { SINGLE_SORT } from "../Objects";

export const DELETE_LIST_ITEM = (setState, id) => {
  setState((prev) => {
    prev.splice(id, 1);
    return [...prev];
  });
};

export const ADD_LIST_ITEM = async (setState, new_item, sortby = "") => {
  setState((prev) => {
    let newList = [...prev, new_item];
    newList = SINGLE_SORT(newList, sortby);
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
