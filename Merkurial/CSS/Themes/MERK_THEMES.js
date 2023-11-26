// THEMES
import dark from "./Dark.module.css";
import light from "./Light.module.css";
import ethereal from "./Ethereal.module.css";
import highContrast from "./HighContrast.module.css";

// STYLES
import divStyles from "../Styles/Div/Div.module.css";
import headerStyles from "../Styles/Headers/Headers.module.css";
import tableStyles from "../Styles/Table/Table.module.css";
import generalStyles from "../Styles/General/General.module.css";
import buttonStyles from "../Styles/Button/Button.module.css";
import borderStyles from "../Styles/Borders/Borders.module.css";
import textStyles from "../Styles/Text/Text.module.css";
import absoluteStyles from "../Styles/Absolute/Absolute.module.css";
import colorStyles from "../Styles/Colors/Colors.module.css";
import dimensionStyles from "../Styles/Dimensions/Dimensions.module.css";
import spacingStyles from "../Styles/Spacing/Spacing.module.css";
import navigationStyles from "../Styles/Navigatioon/Navigation.module.css";

// ANIMATIONS
import flipStyles from "../Animations/Flip.module.css";
import popStyles from "../Animations/pop.module.css";

const THEMES = {
  DARK: dark,
  LIGHT: light,
  ETHEREAL: ethereal,
  HIGHCONTRAST: highContrast,
};

const STYLES = {
  DIVS: divStyles,
  HEADERS: headerStyles,
  TABLES: tableStyles,
  GENERAL: generalStyles,
  BUTTON: buttonStyles,
  BORDERS: borderStyles,
  TEXT: textStyles,
  ABSOLUTE: absoluteStyles,
  COLORS: colorStyles,
  DIMENSIONS: dimensionStyles,
  SPACING: spacingStyles,
  NAVIGATION: navigationStyles,
};

const ANIMATIONS = { FLIPCARD: flipStyles, POP: popStyles };

const MERK_THEMES = () => {
  return { STYLES, ANIMATIONS, THEMES };
};

export default MERK_THEMES;
