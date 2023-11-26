import { getRandomArrayIndex, getRandomArrayItem, shuffle, GET_LARGEST_ARRARY_OF_ARRAYS } from "../Merkurial/Helpers/Arrays/randomizations"
import { copyArray } from "../Merkurial/Helpers/Arrays/copy"
import { MAP_OBJECT } from "../Merkurial/Helpers/Objects/ArrayMethods"

const allMealsNames = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]

export const mergeIngredientsById = (listOfMealsDishes, ingredientArray, mealName) => {
  const listOfDishesInMeal = listOfMealsDishes.slice()
  const updatedDishes = listOfDishesInMeal.map((dish, index) => {
    const dishData = {...dish}
    dishData.ingredients = dishData.ingredients_ids.map((dishIngredient, dishIngredientIndex) => {
      const dishIngredientIID = dishIngredient
      const match = [...ingredientArray].reduce((allMatchingIngredients, ingredientBeingChecked, ingredientIndex, arr) => {
        if ( ingredientBeingChecked.iid == dishIngredientIID) {
          const mergedData = {
            iid: ingredientBeingChecked.iid,
            ingredient: ingredientBeingChecked.ingredient,
            measurement: ingredientBeingChecked.measurement,
            price: ingredientBeingChecked.price,
            number: dish.ingredients_numbers[dishIngredientIndex],
            uid: ingredientBeingChecked.uid,
            meal: dish.meal
          }
          if (!allMatchingIngredients){
            allMatchingIngredients = []
          }

          allMatchingIngredients[allMatchingIngredients.length] = mergedData
          return mergedData
        } else {
          return allMatchingIngredients
        }
      }, [])

      return match
    })
    if (Array.isArray(dishData.ingredients[0])){
      dishData.ingredients = []
    } 
    return dishData
  })
  return updatedDishes
  }

export const setMealItems = (mealDishList, setMeal, allIngredients, mealName) => {
    const exclusions = ["ingredients", "menu"]
    if (mealDishList.length > 0 && allIngredients.length > 0 && !exclusions.includes(mealName)){
        const mergedMealList = mergeIngredientsById([...mealDishList], allIngredients, mealName)
        // console.log("MERGED MEAL LIST: ", mergedMealList) 
        setMeal(mergedMealList)
      }  
  }

export const GET_MEAL_ID = (mealName) => {
  const mealId = mealName !== "dessert" ? mealName[0]+"id" : mealName[0] + mealName[1] + "id"
  return mealId
  }

export const ADD_FOREIGN_KEY_DATA = (rowData) => {
    const updatedData = {...rowData, uid: userid}
    return updatedData
  }

export const UPDATE_WEEKLY_SCHEDULE = async () => {
    const newSchedule = GENERATE_SCHEDULE(
      fullMeals,
      otherMeals,
      numMainDays,
      numOtherDays
    );

    console.log("NEW SCHEDULE: ", newSchedule);

    try {
      const response = await update_weekly_schedule_fetch({
        schedule: { ...newSchedule },
        user_id: scheduleId,
        schedule_id: siteCtx.mealData.weeklyList._id,
      });

      if (response) {
        setWeeklyScheduleData(newSchedule);
        console.log(response);
      }
      setReload(false);
      siteCtx.getDbUpdate();
      return response;
    } catch (err) {
      console.log("There was an error sending updated info");
      console.log(err);
      return err;
    }
  };

export const SEPARATE_MEALS = (allDishes) => {
  const separatedMeals = allDishes.reduce(
    (final, dish) => {
      const meal = dish.meal
      try {
        final[meal] = [...final[meal], dish]
      } catch (err) {
        final[meal] = []
        final[meal] = [...final[meal], dish]
      }
      return final
    }, {});

  // console.log("SEPARATED MEALS: ", separatedMeals)
  return separatedMeals
  }

export const deleteIngredientsFromMealsQuery = () => {
    let q = ""
    q += `UPDATE meals `
    q += `SET `
    q +=      `"ingredients_ids" = "new_values"."ingredients_ids", `
    q +=      `"ingredients_uids" = "new_values"."ingredients_uids", `
    q +=      `"ingredients_numbers" = "new_values"."ingredients_numbers" `
    q += `FROM ( SELECT "meals"."mid", `
    q +=            `ARRAY_AGG("mi"."iid" ORDER BY "mi"."n") AS "ingredients_ids", `
    q +=            `ARRAY_AGG("mi"."uid" ORDER BY "mi"."n") AS "ingredients_uids", `
    q +=            `ARRAY_AGG("mi"."ingredients_number" ORDER BY "mi"."n") AS "ingredients_numbers" `
    q +=          `FROM meals `
    q +=          `CROSS JOIN UNNEST("meals"."ingredients_ids", "meals"."ingredients_uids", "meals"."ingredients_numbers") WITH ORDINALITY "mi"(iid, uid, ingredients_number, n) `
    q +=          `JOIN ingredients `
    q +=            `ON "mi"."iid" = "ingredients"."iid" `
    q +=          `GROUP BY "meals"."mid") AS "new_values" `
    q += `WHERE "meals"."mid" = "new_values"."mid" `
    q +=    `AND CARDINALITY("meals"."ingredients_ids") <> CARDINALITY("new_values"."ingredients_ids") `
    q += `RETURNING meals.*;`

    return q
  }

export const updateMenuToBeCurrentQuery = (wid) => {
  let q = ""
  q += `UPDATE full_menu ` 
  q += `SET "is_current" = `
  q +=     `CASE `
  q +=        ` WHEN "wid" = ${wid} `
  q +=         `THEN true `
  q +=         `ELSE false `
  q +=      `END`
  return q
}

export const getUpdateDishObject = ({mid, dishName, is_entree, mealName, details, ingredients_ids, ingredients_uids, ingredients_numbers}) => {
  const dishObj = {}
  if (mid && typeof mid == "number" || typeof mid == "bigint"){
    dishObj["mid"] = mid 
  } else {
    throw Error("To Update A Dish You Must First Enter A Valid 'mid'...")
  }
  if (dishName){ 
    dishObj["dish"] = dishName 
  }
  if (typeof is_entree == "boolean"){
    dishObj["is_entree"] = is_entree 
  }
  if (allMealsNames.includes(mealName)){ 
    dishObj["meal"] = mealName
  }
  if (typeof details == "string" && details != undefined){
    dishObj["details"] = details
  } 

  if (Array.isArray(ingredients_ids) && Array.isArray(ingredients_uids) && Array.isArray(ingredients_numbers)){
    dishObj["ingredients_ids"] = ingredients_ids
    dishObj["ingredients_uids"] = ingredients_uids
    dishObj["ingredients_numbers"] = ingredients_numbers
  }
  return dishObj
}

export const getRandomMenuItems = (dishArray, numDays) => {
  const ArrayCopy = copyArray(dishArray)
  const randomMenuItems = [] 
  let shuffled = shuffle([...ArrayCopy])
  
  for (let index = 0; index < numDays; index++){
    if (shuffled.length === 0){
      shuffled = shuffle([...ArrayCopy])
    }
    const randomIndex = getRandomArrayIndex(shuffled)
    const randomized = shuffled.splice(randomIndex, 1)
    randomMenuItems.push(randomized)
  }
  return randomMenuItems
}

export const separateSidesAndEntrees = (dishArray) => {
  const entrees = dishArray.filter(dish => dish.is_entree)
  const sides = dishArray.filter(dish => !dish.is_entree)
  return {entrees: entrees, sides: sides}
}

export const separateMealsByDay = (listOfMeals) => {
  const {entrees, sides } = listOfMeals
  const [largerNumCategory, category1] = entrees.length >= sides.length ? [[...entrees], "entree"] : [[...sides], "side"]
  const category2 = category1 === "entree" ? "side" : "entree"
  const smallerNumCategory = category2 === "entree" ? entrees : sides

  const separated = largerNumCategory.reduce((prevObj, dish, index, array) => {

    const smallerOne = smallerNumCategory.length < index ? getRandomArrayItem(smallerNumCategory) : smallerNumCategory[index]

    prevObj[index] = {[category1]: dish, [category2]: smallerOne}
    return prevObj
  }, [])

  return separated  
}

export const separateMealsByMealType = (dishArray, numDays) => {
  const {entrees, sides} = separateSidesAndEntrees(dishArray)
  const shuffledEntrees = getRandomMenuItems(entrees, numDays)
  const shuffledSides = getRandomMenuItems(sides, numDays)
  
  const mealTypes = { 
    entrees: shuffledEntrees,
    sides: shuffledSides 
  }

  return mealTypes
}

export const cleanMeals = (dishArray, numDays) => {
  const mealTypes = separateMealsByMealType(dishArray, numDays)
  const mealsByDay = separateMealsByDay(mealTypes)
  return mealsByDay
}
 
export const cleanAllMeals = (allMeals_DishArrays, numDays) => {
  const allArrays = copyArray(allMeals_DishArrays)
  const allCleaned = allArrays.map(dishArray => {
    return cleanMeals(copyArray(dishArray), numDays)
  })
  return allCleaned
}

export const getCurrentDish = (dishList, index, largestNumber) => dishList.length <= largestNumber ? dishList[index] : getRandomArrayItem(dishList)

export const mergeMealsPerDay = (arrayOfArrays) => {
  if (Array.isArray(arrayOfArrays) && Array.isArray(arrayOfArrays[0])){
    const largestArray = GET_LARGEST_ARRARY_OF_ARRAYS(arrayOfArrays)
    const largestArrayLength = largestArray.length
    
    const mergedArrays = largestArray.map((_, index) => {
      const currentDayMeals = []
        arrayOfArrays.forEach((array) => {
          const currentDish = getCurrentDish([...array], index, largestArrayLength)
          currentDayMeals.push(currentDish)
        })
      return currentDayMeals
  
        
  })
  return mergedArrays
  }
  return []
}

export const MERGE_MEALS = (arrayOfArrays, numDays) => {
  return mergeMealsPerDay(cleanAllMeals([...arrayOfArrays], numDays))
}

const getTheDaysIngredients = (entree, side) => {
  switch (true) {
    case Array.isArray(entree.ingredients) && Array.isArray(side.ingredients):
      return [ ...entree.ingredients, ...side.ingredients] 
    case (Array.isArray(entree.ingredients)):
      return [ ...entree.ingredients ]
    case (Array.isArray(side.ingredients)):
      return [ ...side.ingredients]
    default:
      return []
  }
}


const pullAllIngredients = ( allMeals ) => {
  const allIngredients = copyArray(allMeals).map((meal, index) => {
    const dishIngredients = [...meal].map((dish, dishIndex) => {
      const dishUsed = {...dish}
      const { entree: entArray, side: sideArray } = dishUsed
      const entree = {...entArray[0]} 
      const side = {...sideArray[0]}
      const dayIngredients = getTheDaysIngredients(entree, side)
      return [...dayIngredients] 
    })  
    return dishIngredients
  }).flat(2)
  return allIngredients
}

export const mergeAllIngredients = (allMeals) => {
  const allIngredients = pullAllIngredients(copyArray(allMeals))
  const mergedIngredients = allIngredients.reduce((obj, ingredient) => {
    const ingredientName = ingredient.ingredient
    if (obj[ingredientName]){
        obj[ingredientName].number += Number(ingredient.number)
        
      } else {   
        obj[ingredientName] = ingredient
      }
      return obj
  }, {})

  const finalIngredients = MAP_OBJECT(mergedIngredients, (_, value) => {
    value.total = value.number * value.price
    return value
  }, []) 

  return finalIngredients
  
}