import { useState, createContext } from "react";

const WindowContext = createContext({
  width: 0,
  height: 0,
  add: () => {},
  printAll: () => {},
  findOne: () => {},
});

export const WindowContextProvider = (props) => {
  const [windowList, setWindowList] = useState([]);

  const add = (newData) => {
    setWindowList((previous) => {
      return [...previous, newData];
    });
  };

  const printAll = (searchTerm) => {
    if (windowList.length !== 0) {
      if (
        searchTerm !== undefined &&
        searchTerm !== "undefined" &&
        searchTerm.length !== 0
      ) {
        windowList.forEach((item) => {
          console.log(item[searchTerm]);
        });
      } else {
        windowList.forEach((item) => {
          console.log(item);
        });
      }
    } else {
      console.log("No windows saved");
    }
  };

  const findOne = (one) => {
    for (let i = 0; i < windowList.length - 1; i++) {
      if (one === windowList[i]) {
        console.log("acquired");
        console.log(windowList[i]);
        return;
      }
    }
  };

  const contexValue = {
    width: props,
    height: props,
    add: add,
    printAll: printAll,
    findOne: findOne,
  };

  return (
    <WindowContext.Provider value={contexValue}>
      {props.children}
    </WindowContext.Provider>
  );
};

export default WindowContext;
