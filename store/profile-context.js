import { createContext } from "react";

const ProfileContext = createContext({
  name: "Peter's Shop",
  userName: "",
  fullName: "",
  address: "",
  sex: "",
  gender: "",
  country: { name: "", cur: "textName" },
  missionStatement: "",
  cur: "฿",
  measure: { metric: true, imperial: false },
  theme: "",
});
