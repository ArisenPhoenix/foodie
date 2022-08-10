import { createContext } from "react";

const BusinessContext = createContext({
  callbackSite: "",
  saveCallbackSite: () => {},
});

export const BusinessContextProvider = (props) => {
  const contexValue = {};

  return (
    <BusinessContext.Provider value={contexValue}>
      {props.children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
