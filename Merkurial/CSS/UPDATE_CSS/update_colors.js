const ROOT_CSS = "../Themes/root.module.css";
import { useEffect } from "react";

export const get_color = () => {
  useEffect(() => {
    const r = ROOT_CSS;
    const rootCss = getComputedStyle(r);
    console.log("rootCss: ", rootCss.theme);
  }, []);
};

export const set_color = () => {
  r.style.setProperty("--blue", "lightblue");
};
