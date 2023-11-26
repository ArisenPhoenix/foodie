import { createContext } from "react";
// import { linkify } from "../Helpers/GeneralPurpose/Strings";
import { LINKIFY } from "../Merkurial/Helpers/Links/Linkify"

const NavigationContext = createContext({
  linkify: () => {},
  landing: "Foodie",
  // home: "",
  // homeLink: "",
  allMeals: "",
  allMealsLink: "",
  breakfast: "",
  breakfastLink: "",
  lunch: "",
  lunchLink: "",
  dinner: "",
  dinnerLink: "",
  ingredients: "",
  ingredientsLink: "",
  dropDown: "",
  add: "",
  settings: "",
  settingsLink: "",
});

export const NavigationContextProvider = (props) => {
  const directory = "menu";
  const landing = "Foodie";
  const menu = "Menu";
  const menuLink = LINKIFY(menu);
  const breakfast = "Breakfast";
  const breakfastLink = LINKIFY(breakfast, directory);
  const lunch = "Lunch";
  const lunchLink = LINKIFY(lunch, directory);
  const dinner = "Dinner";
  const dinnerLink = LINKIFY(dinner, directory);
  const ingredients = "Ingredients";
  const ingredientsLink = LINKIFY(ingredients);
  const dropDown = "Account";
  const add = "Add";
  const addLink = LINKIFY(add);
  const settings = "Settings";
  const settingsLink = LINKIFY(settings);

  const contexValue = {
    landing: landing,
    menu: menu,
    menuLink: menuLink,
    breakfast: breakfast,
    breakfastLink: breakfastLink,
    lunch: lunch,
    lunchLink: lunchLink,
    dinner: dinner,
    dinnerLink: dinnerLink,
    ingredients: ingredients,
    ingredientsLink: ingredientsLink,
    add: add,
    addLink: addLink,
    dropDown: dropDown,
    settings: settings,
    settingsLink: settingsLink,
  };

  return (
    <NavigationContext.Provider value={contexValue}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
