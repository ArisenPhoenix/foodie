const COMBINE_ELEMENTS = (base, arr) => {
  const newElement = arr.reduce((prevBase, el, index) => {
    return (prevBase = prevBase[el]);
  }, base);
  return newElement;
};

export const MOVE_THROUGH_STATE_OBJECT_TREE = (
  currentSelector,
  list_of_slices
) => {
  // currentState is the base state
  const info = COMBINE_ELEMENTS(currentSelector, list_of_slices);
  console.log("COMBINE ELEMENTS IN MOVE info: ", info);
  return info;
};

export const DIG_ATTRIBUTES_OUT = (currentState, list_of_selections) => {
  // currentState is the Starting POINT
  const info = list_of_selections.reduce((prev, currentAttr, index) => {
    prev = prev[currentAttr];
    return prev;
  }, currentState);
  return info;
};

const DETERMINE_ACTION = (currentSelector, sliceInfo, base) => {
  const state = base ? currentSelector : sliceInfo;

  if (sliceInfo.constructor() === Array && base) {
    return MOVE_THROUGH_STATE_OBJECT_TREE(state, sliceInfo);
  } else if (sliceInfo.constructor() === Array) {
    return DIG_ATTRIBUTES_OUT(state, sliceInfo);
  } else {
    return state;
  }
};

export default DETERMINE_ACTION;
