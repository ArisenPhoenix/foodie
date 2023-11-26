import { createContext } from "react";
import SQL_TABLE from "../../Merkurial/SQL/OBJECT_CLASS/SQL";

const FoodContextContext = createContext({
  menuId: "",
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  dessert: [],
  weeklySchedule: {},
  currentMeal: "",
  mainMeals: {
    list: [],
    ingredients: [],
  },
  otherMeals: {
    list: [],
    ingredients: [],
  },
  scheduleId: "",
  currency: "",

  hasScheduleIngredients: Boolean,

  setCurrentMeal: () => {},
  addNewDish: () => {},
  setBreakfast: () => {},
  setLunch: () => {},
  setDinner: () => {},
  setSnack: () => {},
  setDessert: () => {},
  getNew: () => {},
  reload: () => {},
  setReload: () => {},
  deleteDish: () => {},
  updateDish: () => {},
  updateIngredient: () => {},
  deleteIngredient: () => {},
  addNewIngredient: () => {},
  setAllIngredients: () => {},

  allIngredients: [],
  allMeals: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
  allDishes: [],
  menu: [],
  currentMenu: [],
  shoppingListIngredients: [],

  breakfastTable: SQL_TABLE,
  lunchTable: SQL_TABLE,
  dinnerTable: SQL_TABLE,
  snackTable: SQL_TABLE,
  dessertTable: SQL_TABLE,
  ingredientTable: SQL_TABLE,
  
  ADD_FOREIGN_KEY_DATA: () => {},
  GET_MEAL_ID: ( mealId ) => {},
  ADD_DISH: async (dishName, is_entree, ingredient_ids, ingredient_uids, ingredients_numbers, meal, details) => {},
  ADD_INGREDIENT: async (ingredientName, measurement, price, options=false) => {},
  DELETE_INGREDIENT: async (ingredientName, measurement, price, options=false) => {},
  UPDATE_INGREDIENT: async (ingredientName, measurement, price, options=false) => {},
  DELETE_DISH: async (dishId, dishName, is_entree, mealName, details, options) => {},
  UPDATE_DISH: async ({mid, dishName, is_entree, mealName, details, ingredients_ids, ingredients_uids, ingredients_numbers}) => {},
  GENERATE_NEW_MENU: function(){
    return {"breakfast": [], "lunch": [], "dinner": [], "snack": [], "dessert": []}
  },

  ADD_MENU: async (schedule_name) => {},
  DELETE_MENU: async () => {},
  UPDATE_MENU: async (schedule_name) => {},
  SET_CURRENT_MENU: async () => {},
  setCurrentMenu: () => {},
  NEXT_MENU: () => {},
  PREVIOUS_MENU: () => {}
  
  
});

export default FoodContextContext;
