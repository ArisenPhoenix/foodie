const batchUpdateMealTables = () => {
    const meals = [
        ["breakfast", breakfastSchema], 
        ["lunch", lunchSchema], 
        ["dinner", dinnerSchema], 
        ["snack", snackSchema], 
        ["dessert", dessertSchema]
    ]

    meals.forEach(async(meal, index) => {
        const mealT = new SQL_TABLE(meal[0], "api/postgres", meal[1], mealFKs, null)
        await mealT.DELETE_TABLE()
        await mealT.CREATE_TABLE()
    })
}
const ingMs = ["l", "ml", "kg", "g", "lb", "oz", "loaf"]
const mockIngredients = [
    ["pepper", 20, ingMs[0]], 
    ["cheese", 49, ingMs[2]], 
    ["ham", 98, ingMs[2]], 
    ["wheat bread", 52, ingMs[6]], 
    ["ground beef", 200, ingMs[2]], 
    ["sirloin steak", 130, ingMs[2]],
    ["salt", 20, ingMs[0]], 
    ["cream cheese", 49, ingMs[2]], 
    ["chicken", 98, ingMs[2]], 
    ["white bread", 52, ingMs[6]], 
    ["ground pork", 200, ingMs[2]], 
    ["t-bone steak", 130, ingMs[2]]
]

const batchUpdateIngredients = async() => {
    const ingT = new SQL_TABLE("ingredients", "api/postgres",  ingredientSchema, mealFKs, setMsg)
    await ingT.DELETE_TABLE()
    await ingT.CREATE_TABLE()
    mockIngredients.forEach(async(ing, index) => {
        const rowItems = [
            ing[0], 
            ing[1], 
            ing[2],
            1
    ]
        const ingi = ingT.newRow(rowItems)
        const ingR = await ingi.addRow()
        console.log(`ADD ${ing[0]} RESPONSE : `, ingR)
    })
    
}

const addUUID = async() => {
    const bkT = new SQL_TABLE("breakfast", "api/postgres", breakfastSchema, mealFKs, null)
    const res = await bkT.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, "POST", "api/postgres", "uuid" )
    console.log("UUID RES: ", res)
}


const getUserIngredients = async() => {
    const userT = new SQL_TABLE("users", "api/postgres", userSchema, null, setMsg)
    const queryText = `
    SELECT iid, ingredient, price, measurement
    FROM users 
    LEFT JOIN ingredients ON users.userid = ingredients.uid
    WHERE userid = 1 
    `
    const qR = await userT.query(queryText, "POST", "api/postgres", "useEffect.queryFunc" )
    console.log("QUERY RESPONSE: ", qR)
    return qR
}

const getUserMeals = async() => {
    // LATER USE UNNEST(ingredients) to get ingredients onto separate rows with accompanying information
    // The following link will make that more clear:
    // https://www.commandprompt.com/education/understanding-postgresql-arrays-with-examples/#:~:text=So%2C%20let's%20start!-,How%20to%20Create%20Arrays%20in%20PostgreSQL%3F,tab_name(%20col_name%20data_type%5B%5D%2C%20)%3B
    
    const userT = new SQL_TABLE("users", "api/postgres", userSchema, null, setMsg)
    const queryText = `
    SELECT did, dish, ingredients, is_entree, meal, details
    FROM users 
    LEFT JOIN breakfast ON users.userid = breakfast.user_id
    WHERE userid = 1
    `
    const qR = await userT.query(queryText, "POST", "api/postgres", "useEffect.queryFunc" )
    console.log("QUERY RESPONSE: ", qR)
    return qR
}



const compileMealsAndIngs = async() => {
    let ings = await getUserIngredients()
    let meals = await getUserMeals()

    ings = ings.response.rows
    meals = meals.response.rows
    console.log("INGREDIENTS: ", ings)
    console.log("MEALS: ", meals)
    
    const updatedMeals = meals.map((meal, index) => {
        const mealIngs = meal.ingredients.map((ing, index) => {
            return Number(ing)
        })
        console.log("MEAL INGS: ", mealIngs)
        console.log("GETTING UPDATED MEAL INGREDIENTS")
        const updatedMealIngredients = ings.filter((ing, index) => {
            const ingid = ing.iid
            if (mealIngs.includes(ingid)){
                return {iid: ingid, measurement: ing.measurement, price: ing.price, ingredient: ing.ingredient}
            }
        })
        return {did: meal.did, dish: meal.dish, meal: meal.meal, details: meal.details, is_entree: meal.is_entree, ingredients: updatedMealIngredients }
    })
    
    return updatedMeals
}

const mockbfast = async(dishname, ings) => {
    const breakfastMeals = [dishname, false, ings, "breakfast", "yummy", 1]
    const bkT = new SQL_TABLE("breakfast", "api/postgres", breakfastSchema, mealFKs, null)
    const makeBkTR = await bkT.CREATE_TABLE()
    console.log("make breakfast table response: ", makeBkTR)
    const bkR = bkT.newRow(breakfastMeals, "api/postgres", null)
    const bkRR = await bkR.addRow()
    console.log("Breakfast Meal Add response: ", bkRR)
}


const handleClick = async () => {
    setButtonClicked(true)
}







// useEffect(() => {
//     if (buttonClicked){
        
//         // console.log("TRYING CLICK")
        
//         const get = async () => {
//             const newData = await compileMealsAndIngs()
//             console.log("UPDATED MEAL DATA: ", newData)
            
//             // const mealInfo = [["cat", [2,1,8,2]], ["naitwoot", [3,9,1]], ["cambridge", [3,9, 2, 2]], ["harvard", [2, 8, 1, 7]], ["silly", [1, 1, 1, 1]], ["kitty", [2, 2, 2, 2, 2, 2,2 ,2 ]]]
//             // mealInfo.forEach(async(meel) => {
//             //     await mockbfast(meel[0], meel[1])
//             // })
            

//             // batchUpdateMealTables()
//         }

//         get()
//         setButtonClicked(false)
//     }
// }, [buttonClicked])