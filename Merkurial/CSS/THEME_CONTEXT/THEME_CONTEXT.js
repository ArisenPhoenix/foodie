import { createContext } from "react";

const THEME_CONTEXT = createContext({
  black: "black",
  white: "white",
  gold: "rgb(234, 200, 5)",
  silver: "rgba(195, 195, 195, 0.817)",
  orange: "rgb(228, 152, 11)",
  hotPink: "rgb(255, 79, 167)",
  pink: "rgb(238, 126, 163)",
  blue: "rgba(8, 68, 232, 0.76)",
  green: "rgba(7, 171, 7, 0.845)",
  purple: "rgba(109, 0, 192, 0.809)",
  lightPurple: "rgb(121, 56, 253)",
  mist: "rgba(128, 128, 128, 0.476)",
});

export default THEME_CONTEXT;
