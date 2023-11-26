import { createSlice } from "@reduxjs/toolkit";
import MERK_THEMES from "../../../CSS/Themes/MERK_THEMES";

const { STYLES, ANIMATIONS, THEMES } = MERK_THEMES();

const initialState = {
  theme: THEMES["DARK"],
  styles: STYLES,
  animations: ANIMATIONS,
};

const ThemeProviderSlice = createSlice({
  name: "THEME",
  initialState: initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = THEMES[action.payload.theme];
    },
  },
});

export default ThemeProviderSlice;
