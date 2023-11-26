import { SuperTitleFy } from "../../Merkurial/Helpers/Links/Linkify"
import { Setter } from "Merkurial/TypescriptTypes/BasicTypes"

type IngredientObj = {
    ingredient: string,
    number: number
}

type IngredientData = {
    name: string,
    number: number
}

type IngredientOption = {
    iid: number,
    ingredient: string,
    measurement: string,
    price: number,
    uid: number
}

interface ChosenIngredient extends IngredientOption {
    number: number
}

interface SetterObj {
    [elementName: string]: Setter
}


export const STARTING_INSTRUCTION_TEXT  = (dishName: string) => {
    return `Instructions For ${dishName}:`
}

const bullet = "•"
export const GetDefaultInstructionsText = (dishName: string, textAreaUpdated: boolean, chosenIngredients: ChosenIngredient[]) => {
    const STARTING_INSTRUCTIONS = STARTING_INSTRUCTION_TEXT(dishName)

    if (dishName && !textAreaUpdated && chosenIngredients.length > 0){
        const defaultInstructions = chosenIngredients.map(ingredient => `${bullet} ${ingredient.ingredient}: `).join("\n")
        const STARTING_TEXT = `${STARTING_INSTRUCTIONS}\n\n${defaultInstructions}`
        return [STARTING_INSTRUCTIONS, defaultInstructions, STARTING_TEXT]
    }
    return [false, false, false]
}


export const RemoveIngredient = (index: number, setChosenIngredients: Setter) => {
    setChosenIngredients((prev) => {
        const slice = [...prev]
        slice.splice(index, 1);
        return [...slice];
      });
}

export const RemoveIngredientInstruction = (chosenIngredients: ChosenIngredient[], currentInstructions: string, dishName: string) => {
    const defaultInstructions = chosenIngredients.map(ingredient => `${bullet} ${ingredient.ingredient}: `).join("\n")
    const fullinstructionText = `Instructions For ${dishName}:\n\n${defaultInstructions}`

    if (currentInstructions !== fullinstructionText){
        // const currentIngredients = chosenIngredients.map((ingredient => ingredient.ingredient))
        const currentIngredients = defaultInstructions.split("\n")
        const currentInstructionIngredients = currentInstructions.split("\n")
        
        const plainIngredients = chosenIngredients.map(ingredient => ingredient.ingredient.toString().trim())

        console.log("Plain Ingredients: ", plainIngredients)
        const keptIngredients = currentInstructionIngredients.filter((ingredient, index, arr) => {
          const cleanIngredient = ingredient.split(bullet)[1]
          if (cleanIngredient){
            const ingredientText = cleanIngredient.split(":")[0] 
            if (ingredientText){
              console.log("INGREDIENT TEXT: ", ingredientText)
              for (let ing of plainIngredients){
                console.log("ING: ", ing)
                if (ing == ingredientText){
                  return true
                }
              }
              

              console.log("INCLUDED: ", plainIngredients.includes(ingredientText.toString()))

              return plainIngredients.includes(ingredientText.trim())
              
            }
          }
        })

        console.log("Kept Ingredients: ", keptIngredients)
        console.log("Current Ingredients: ", currentIngredients)
        console.log("Current Instruction Ingredients: ", currentInstructionIngredients)
        
      }
}

export const AddIngredientInstruction = (chosenIngredients: ChosenIngredient[], setInstructions: Setter, textAreaUpdated: boolean, dishName: string) => {
    if (!textAreaUpdated){
    const instructionText = chosenIngredients.map(ingredient => `${bullet} ${ingredient.ingredient}: `).join("\n")
      // console.log("AREA TEXT: ", instructionText)
    const fullinstructionText = `Instructions For ${dishName}:\n\n${instructionText}`
    setInstructions(fullinstructionText)
    }
}

export const HandleChange = (event, setterObj: SetterObj) => {
    const value = event.target.value;
    const name = event.target.name;
    const setter = setterObj[name]
    
    setter && value && setter(value)
}


export const HandleDishSaveSubmit = (dishName: string, chosenIngredients: ChosenIngredient[], 
    dishType: string | boolean, mealName: string) => {
    const mealOptions = ["breakfast", "lunch", "dinner", "snack", "dessert"]
    const formIsValid =
    dishName !== "" && dishName.toLowerCase() !== "choose" &&
    typeof mealName === "string" &&
    chosenIngredients.length > 0 && mealOptions.includes(mealName.toLowerCase())
    

    if (formIsValid){
        const finalDishName = SuperTitleFy(dishName)
        const is_entree = dishType
        const iids = chosenIngredients.map(ingredient => ingredient.iid)
        const uids = chosenIngredients.map(ingredient => ingredient.uid)
        const numbers = chosenIngredients.map(ingredient => ingredient.number)
        
        return [finalDishName,  is_entree,  iids,  uids,  numbers, mealName.toLowerCase()]
    } else {
        if (dishName === ""){
            return [false, "You Must First Enter A Dish Name"]

        } else if (dishType == null){
            return [false, "You Must First State Wheter This Dish Is An Entree Or Side"]

        } else if (chosenIngredients.length < 1){
            return [false, "You Must First Choose At Lease One Ingredient"]

        } else if (typeof mealName !== "string") {
            return [false, "The Meal Selected Is Not Valid For Some Reason..."]

        } else if (!mealOptions.includes(mealName.toLocaleLowerCase())) {
            return [false, "The Meal Specified Is Not Valid"]
        } else {
            return [false, "There Was An Unknown Error With This Dish"]
        }
        
    }
        

    // setDishName("");
    // setInstructions("");
    // setChosenIngredients([])
}

export const HandleDishUpdateSubmit = (dishName: string, chosenIngredients: ChosenIngredient[], dishType: boolean, meal: string) => {
    const formIsValid =
    dishName !== "" &&
    dishType !== null &&
    chosenIngredients.length >= 0 && typeof dishType !== "boolean"

    if (formIsValid){
        const finalDishName = SuperTitleFy(dishName)
        const is_entree = Boolean(dishType)
        const iids = chosenIngredients.map(ingredient => ingredient.iid)
        const uids = chosenIngredients.map(ingredient => ingredient.uid)
        const numbers = chosenIngredients.map(ingredient => ingredient.number)
        const mealName = meal.toLowerCase()
        // update();
        
        return [finalDishName,  is_entree,  iids,  uids,  numbers,  mealName]
    } else {
        if (dishName === ""){
            return [false, "You Must First Enter A Dish Name"]

        } else if (dishType == null){
            return [false, "You Must First State Wheter This Dish Is An Entree Or Side"]

        } else if (chosenIngredients.length > 0){
            return [false, "You Must First Choose At Lease One Ingredient"]

        } else {
            return [false, "There Was An Unknown Error With This Dish"]
        }
        
    }
}


export const AppendChosenIngredient = (ingredientData: IngredientData, ingredientOptions: IngredientOption[], setChosenIngredients: Setter) => {
    const ingredientName = ingredientData.name
    const ingredientNumber = ingredientData.number

    const match = [...ingredientOptions].reduce((prev, current, currentIndex) => {
        // console.log("CURRENT.INGREDIENT: ", current.ingredient)
        if (current.ingredient == ingredientName){
        prev = current
        }
        return prev
    }, {})


    setChosenIngredients((prevs: IngredientObj[]) => {
        const currents = [...prevs]
        // console.log("CURRENTS: ", currents)
        const index = currents.findIndex((val, index, obj) => {
            console.log("Val: ", val)
            return val.ingredient === ingredientName
        })

        // console.log("index: ", index)
        if (index > -1){
        currents[index].number += ingredientNumber
        }
        
        const updatedValue = index > -1 ? [...currents] :  [...currents, {...match, number: ingredientNumber}]
        return updatedValue
    })
}

