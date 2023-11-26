import { Fragment, useEffect, useState, useContext } from "react";
import FoodContext from "./FOODCONTEXT/food-context-context";
import USER_CONTEXT from "../Merkurial/store/Context/USER_CONTEXT/user_context";
import FoodContextConnections from "./food_context_connections";
import { 
  GET_MEAL_ID, 
  setMealItems, 
  ADD_FOREIGN_KEY_DATA, 
  UPDATE_WEEKLY_SCHEDULE, 
  SEPARATE_MEALS, 
  deleteIngredientsFromMealsQuery, 
  getUpdateDishObject,
  MERGE_MEALS,
  mergeAllIngredients,
  updateMenuToBeCurrentQuery
 } from "./food_context_helpers";
import AUTH_CONTEXT from "../Merkurial/store/Context/AUTH_CONTEXT/auth_context";
import { copyArray } from "../Merkurial/Helpers/Arrays/copy";

let lastMeal;
 

export const FoodContextProvider = (props) => {
  const conCtx = useContext(FoodContextConnections);
  const userCtx = useContext(USER_CONTEXT);
  const authCtx = useContext(AUTH_CONTEXT)
  const userid = userCtx.userData.userid
  const isUser = authCtx.isUser
  const currency = userCtx.userData.currency;
  const numMainDays = userCtx.userData.days_for_main_meals
  const numOtherDays = userCtx.userData.days_for_other_meals
 
  const { tables, items, flow } = conCtx;

  const {
    connectionsAreOpen,
    setConnectionsAreOpen,
    OPEN_UP_CONNECTIONS,
    RETREIVE_FROM_DB,
    TABLE_ACTIVE_ARRAY
  } = flow

  const {
    MEALS_TABLE,
    INGREDIENTS_TABLE,
    MENU_TABLE,
  } = tables;

  // Below items Are The Table States
  const { allIngredients: ingredients, allMeals: meals, menu: fullMenu, allMeasurements } =
    items;


  const anyTableIsQuerying = MEALS_TABLE.isQuerying || INGREDIENTS_TABLE.isQuerying || MENU_TABLE.isQuerying

  
  const [currentMeal, setCurrentMeal] = useState(lastMeal ? lastMeal : {});
  const [scheduleId, setScheduleId] = useState("");
  const [reload, setReload] = useState(false);

  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [snack, setSnack] = useState([])
  const [dessert, setDessert] = useState([])

  const allDishes = [...breakfast, ...lunch, ...dinner, ...snack, ...dessert]

  const [menus, setMenus] = useState([])
  const [currentMenu, setCurrentMenu] = useState({})
 
  const [allIngredients, setAllIngredients] = useState([])
  const [shoppingListIngredients, setShoppingListIngredients] = useState([])

  

  useEffect(() => { 
    const tempMenus = copyArray(fullMenu)
    const currentMenuIndex = tempMenus.findIndex((menu, index) => menu.is_current)
    setCurrentMenu(tempMenus[currentMenuIndex >= 0 ? currentMenuIndex : 0] ? tempMenus[currentMenuIndex >= 0 ? currentMenuIndex : 0] : {})
    setMenus(tempMenus)
  }, [fullMenu])
    
  
  useEffect(() => {
      if (allIngredients.length > 0){
        const parted = SEPARATE_MEALS(meals)
        parted.breakfast && setMealItems(parted.breakfast, setBreakfast, allIngredients, "breakfast")
        parted.lunch && setMealItems(parted.lunch, setLunch, allIngredients, "lunch")
        parted.dinner && setMealItems(parted.dinner, setDinner, allIngredients, "dinner")
        parted.snack && setMealItems(parted.snack, setSnack, allIngredients, "snack")
        parted.dessert && setMealItems(parted.dessert, setDessert, allIngredients, "dessert")
      }
      // GENERATE_NEW_MENU()
  }, [meals, allIngredients])
 
  useEffect(() => {
    if (ingredients.length > 0 && JSON.stringify(ingredients) !== JSON.stringify(allIngredients)){
      setAllIngredients([...ingredients])
    }
  }, [ingredients]) 

  useEffect(() => {
    if (isUser && userid && connectionsAreOpen) {
      const RETREIVE_ALL_DATA_FROM_DB = async () => {
        await RETREIVE_FROM_DB()
        setConnectionsAreOpen(false)
      }   

      RETREIVE_ALL_DATA_FROM_DB()
        
    } 
  }, [isUser, userid, connectionsAreOpen, ...TABLE_ACTIVE_ARRAY]);
  
  const ADD_DISH = async (dishName, is_entree, ingredient_ids, ingredient_uids, ingredients_numbers, mealName, details) => {
    if (userid){ 
      const mealObj = {
        dish: dishName,
        is_entree: is_entree,
        ingredients_ids: ingredient_ids,
        ingredients_uids: ingredient_uids,
        ingredients_numbers: ingredients_numbers,
        meal: mealName,
        details: details,
        uid: userid, 
      } 
      console.log("MEAL OBJECT: ", mealObj)
      const response = await MEALS_TABLE.ADD_ROW(mealObj, {returning: "*"})
      return response
    } else {
      console.log("You Need To LogIn First")
      return false
    }
  }  

  const UPDATE_DISH = async ({mid, dishName, is_entree, mealName, details, ingredients_ids, ingredients_uids, ingredients_numbers}) => {
    if (userid){
      const dishObj = getUpdateDishObject({mid, dishName, is_entree, mealName, details, ingredients_ids, ingredients_uids, ingredients_numbers})
      console.log("final update object: ", dishObj)
      const updateRes = await MEALS_TABLE.UPDATE_ROW_BY_ANY_COLUMNS(dishObj)
      return updateRes
    }
    
  }
    
  const DELETE_DISH = async (dishId, dishName, is_entree, mealName, details, options) => {
    if (userid){
      const mealObj = {
        mid: dishId,
        dish: dishName,
        is_entree: is_entree,
        meal: mealName,
        details: details
      }

      const removeDishRes = await MEALS_TABLE.DELETE_ROW_BY_ANY_COLUMNS(mealObj)
      return removeDishRes
    } else {
      console.log("You Need To Login First")
    }
  }
 
  const ADD_INGREDIENT = async (ingredientName, measurement, price, options) => {
    if (userid){
      const ingredientObj = {
        ingredient: ingredientName,
        measurement: measurement,
        price: price,
        uid: userid
      }
  
      const response = await INGREDIENTS_TABLE.ADD_ROW(ingredientObj)
      console.log("ADD_INGREDIENT RESPONSE: ", response)
      return response
    } else {
      console.log("You Need To LogIn First")
      return false
    }
  } 
 
  const DELETE_INGREDIENT = async (ingredientId, ingredientName, measurement, price, ingredientUID, options) => {
    if (userid && userid == ingredientUID){
      const ingredientObj = {
        iid: ingredientId,
        ingredient: ingredientName,
        measurement: measurement,
        price: price,
        uid: userid,
      }
      
      // const numIngredients = ingredients.length
      const deleteIngredientResponse = await INGREDIENTS_TABLE.DELETE_ROW(ingredientObj)
      const removeIngredientFromMeals = await MEALS_TABLE.TABLE.query({query: deleteIngredientsFromMealsQuery(), type: "DELETE"}, "DELETE")
      
      
    } else {
      return "You Do Not Have Permission To Do This Action On An Ingredient That Is Not Yours"
    }
  }
 
  const UPDATE_INGREDIENT = async (ingredientId, ingredientName, measurement, price, ingredientUID, options) => {
    if (userid && userid == ingredientUID){
      const ingredientObj = { 
        iid: ingredientId,
        ingredient: ingredientName,
        measurement: measurement,
        price: price,
        uid: userid,
      }
      const updateResponse = await INGREDIENTS_TABLE.UPDATE_ROW(ingredientObj)
      return updateResponse
    } else {
      return "You Do Not Have Permission To Do This Action On An Ingredient That Is Not Yours"
    } 
  }
 
  const GENERATE_NEW_MENU = () => {
    const mergedMainMeals = MERGE_MEALS([copyArray(breakfast), copyArray(lunch), copyArray(dinner)], numMainDays)
    const mergedOtherMeals = MERGE_MEALS([copyArray(snack), copyArray(dessert)], numOtherDays)
    const allDishes = {main_meals: copyArray(mergedMainMeals), other_meals: copyArray(mergedOtherMeals)}
    setCurrentMenu(allDishes)
  }


  const NEXT_MENU = () => {
    const {wid} = currentMenu
    const currentIndex = menus.findIndex(menu => menu.wid === wid)
    const nextIndex = currentIndex + 1 > menus.length - 1 ? 0 : currentIndex + 1
    setCurrentMenu(menus[nextIndex])
  }

  const PREVIOUS_MENU = () => {
    const {wid} = currentMenu
    const currentIndex = menus.findIndex(menu => menu.wid === wid)
    const previousIndex = currentIndex - 1 < 0 ? menus.length -1 : currentIndex - 1
    setCurrentMenu(menus[previousIndex])
  }

 
  useEffect(() => {
    if (Object.keys(currentMenu).length > 0){
      const {main_meals, other_meals} = currentMenu
      const mergedEntreesAndSides = [...copyArray(main_meals), ...copyArray(other_meals)]
      const mergedIngredients = mergeAllIngredients(mergedEntreesAndSides)
      if (mergedIngredients && Array.isArray(mergedIngredients)){
        setShoppingListIngredients(mergedIngredients)
      }
      
    }
  }, [currentMenu])
 

  const SET_CURRENT_MENU = async (wid) => {
    const {wid: currentWid, is_current, schedule_name} = currentMenu
    const finalWid = wid ? wid : currentWid
    if (is_current){
      console.log(`${schedule_name} Is Already The current One`)
      return true
    } else {
      const setCurrentRes = await MENU_TABLE.TABLE.query({query: updateMenuToBeCurrentQuery(finalWid), type: "PUT"}, "POST")
      
      console.log("SET CURRENT RES: ", setCurrentRes)
      return setCurrentRes
    }

  }

  const ADD_MENU = async (schedule_name) => {
    if (userid && userid != null){
      const {main_meals, other_meals, wid} = currentMenu
      const dateCreated = new Date().toISOString()
      
      const addObj = {
        date_created: dateCreated,
        schedule_name: schedule_name,
        is_current: true,
        main_meals: main_meals,
        other_meals: other_meals,
        uid: userid
      }

      const addResponse = await MENU_TABLE.ADD_ROW(addObj, {}, true)
      console.log("ADD RESPONSE: ", addResponse)
      if (addResponse){
        const lastSaved = addResponse[addResponse.length-1]
        const {wid} = lastSaved
        SET_CURRENT_MENU(wid)
      }

      return addResponse
    }
    
  }

  const DELETE_MENU = async () => {
    const {schedule_name, wid} = currentMenu
    console.log("MENU WID: ", wid)
    const delObj = {
      wid: wid,
      schedule_name: schedule_name,
      uid: userid
    }

    const delResponse = await MENU_TABLE.DELETE_ROW(delObj)
    if (delResponse){
      const tempMenus = copyArray(fullMenu)
      const newCurrentIndex = tempMenus.length - 1
      const newMenu = tempMenus[newCurrentIndex >= 0 ? newCurrentIndex : 0] ? tempMenus[newCurrentIndex >= 0 ? newCurrentIndex : 0] : {}
      if (JSON.stringify(newMenu) !== JSON.stringify({})){
        const {wid} = newMenu
        if (wid){
          SET_CURRENT_MENU(wid)
        }
      }
      setCurrentMenu(newMenu)
    }
    console.log("DELETE RESPONSE: ", delResponse)
    return delResponse

  }

  const UPDATE_MENU = async (schedule_name) => {
    const { main_meals, other_meals, schedule_name: oldName, wid } = currentMenu
    const dateUpdated = new Date().toISOString()
    const updateObj = {
      wid: wid,
      date_created: dateUpdated,
      is_current: true,
      main_meals: main_meals,
      other_meals: other_meals,
      uid: userid
    }

    if (schedule_name != oldName && typeof schedule_name === "string" && schedule_name != ""){
      updateObj["schedule_name"] = schedule_name
    }


    const updateRes = await MENU_TABLE.UPDATE_ROW_BY_ANY_COLUMNS(updateObj)
    console.log("UPDATE RESPONSE: ", updateRes)
    return updateRes

  }


 

  const contextValue = {
    // OTHER NECESSARY DATA
    // weeklySchedule: weeklyScheduleData,
    scheduleId: scheduleId,
    reload: reload,
    currentMeal: typeof currentMeal === "undefined" ? {} : currentMeal,
    setAllIngredients: setAllIngredients,
    currency: currency,
    setCurrentMeal: setCurrentMeal,
    getNew: UPDATE_WEEKLY_SCHEDULE,
    breakfast: breakfast,
    lunch: lunch,
    dinner: dinner,
    snack: snack,
    dessert: dessert,
    allIngredients: allIngredients,
    mealsTable: MEALS_TABLE,
    ingredientTable: INGREDIENTS_TABLE,
    menuTable: MENU_TABLE,
    allMeasurements: allMeasurements,
    allMeals: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
    allDishes: allDishes,
    menu: menus,
    shoppingListIngredients: shoppingListIngredients,
    currentMenu: currentMenu,
    setCurrentMenu: setCurrentMenu,

    ADD_FOREIGN_KEY_DATA: ADD_FOREIGN_KEY_DATA,
    GET_MEAL_ID: GET_MEAL_ID,
    ADD_DISH: ADD_DISH,
    ADD_INGREDIENT: ADD_INGREDIENT,
    DELETE_INGREDIENT: DELETE_INGREDIENT,
    UPDATE_INGREDIENT: UPDATE_INGREDIENT,
    DELETE_DISH: DELETE_DISH,
    UPDATE_DISH: UPDATE_DISH,
    GENERATE_NEW_MENU: GENERATE_NEW_MENU,

    ADD_MENU: ADD_MENU,
    DELETE_MENU: DELETE_MENU,
    UPDATE_MENU: UPDATE_MENU,
    SET_CURRENT_MENU: SET_CURRENT_MENU,
    NEXT_MENU,
    PREVIOUS_MENU
    
  };

  return (
    <FoodContext.Provider value={contextValue}>
      <Fragment>{props.children}</Fragment>
    </FoodContext.Provider>
  );
};

export default FoodContext;
