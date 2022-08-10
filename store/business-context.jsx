import { createContext, useContext } from "react";
import AuthContext from "./auth-context";

const BusinessContext = createContext({
  name: "Foodie",
  type: "",
  longName: "",
  address: "",
  motto: "",
  missionStatement: "",
  cur: "฿",
  measure: { sm: "mm", md: "cm", lg: "m" },
  theme: "",
  currConversion: () => {},
});

export const BusinessContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const contexValue = {
    name: "MerK",
    longName: "",
    address: "",
    motto: "",
    missionStatement: "",
    cur: "฿",
    measure: { sm: "mm", md: "cm", lg: "m" },
    currConversion: () => {},
  };

  return (
    <BusinessContext.Provider value={contexValue}>
      {props.children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
