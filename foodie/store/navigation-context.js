import { createContext } from "react";
import { linkify } from "../Helpers/GeneralPurpose/Strings";

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
  const directory = "menu/";
  const landing = "Foodie";
  // const home = "Home";
  // const homeLink = linkify(home);
  const menu = "Menu";
  const menuLink = linkify(menu);
  const breakfast = "Breakfast";
  const breakfastLink = linkify(breakfast, directory);
  const lunch = "Lunch";
  const lunchLink = linkify(lunch, directory);
  const dinner = "Dinner";
  const dinnerLink = linkify(dinner, directory);
  const ingredients = "Ingredients";
  const ingredientsLink = linkify(ingredients);
  const dropDown = "Account";
  const add = "Add";
  const addLink = linkify(add);
  const settings = "Settings";
  const settingsLink = linkify(settings);

  const contexValue = {
    landing: landing,
    // home: home,
    // homeLink: homeLink,
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
