import IS_COMPONENT from "../../../Helpers/REACT_COMPONENT_CHECK/REACT_COMPONENT_CHECK";
import CREATE_REACT_KEY from "../../../Helpers/Misc/createReactKey";
import React from "react";

export const GENERAL_MAPPER = (props) => {
  if (!props) {
    throw Error("Mapper Has No Props.");
  }
  const data = props.data;
  if (!data) {
    throw Error("Mapper Has No Data.");
  }

  const Component = props.component;

  let d = data;
  if (Array.isArray(data)) {
    console.log("is Array");
  } else if (typeof data === "object") {
    console.log("is Object");
    d = Object.keys(data);
    return d.map((item, index) => {
      console.log("ITEM: ", item);
      let Item = data[item];
      if (IS_COMPONENT(Item)) {
        const props = props.props;
        return (
          <Item
            props={props}
            key={`Mapped Component ${CREATE_REACT_KEY(index)}`}
          />
        );
      } else {
        if (Component) {
          return (
            <Component
              props={props.props}
              key={`Mapped Component ${CREATE_REACT_KEY(index)}`}
            />
          );
        } else {
          throw Error("There Must Be A React Component Present");
        }
      }
    });
  }
  return d;
};
