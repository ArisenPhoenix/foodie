const isClassComponent = (component) => {
  return (
    typeof component === "function" && !!component.prototype.isReactComponent
  );
};

export const isFunctionComponent = (component) => {
  return (
    typeof component === "function" &&
    String(component).includes("return React.createElement")
  );
};

const IS_REACT_COMPONENT = (component) => {
  return isClassComponent(component) || isFunctionComponent(component);
};

const isElement = (element) => {
  return React.isValidElement(element);
};

const isDOMTypeElement = (element) => {
  return isElement(element) && typeof element.type === "string";
};

const isCompositeTypeElement = (element) => {
  return isElement(element) && typeof element.type === "function";
};

const IS_COMPONENT = (item) => {
  return (
    IS_REACT_COMPONENT(item) ||
    isDOMTypeElement(item) ||
    isCompositeTypeElement(item)
  );
};

export default IS_COMPONENT;
