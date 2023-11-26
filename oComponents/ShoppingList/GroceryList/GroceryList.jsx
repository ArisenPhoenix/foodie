import css from "./GroceryList.module.css";
import { useContext, useEffect, useState } from "react";
import PostButton from "../../UI/Button/PostButton/PostButton";
import Card from "../../UI/Card/Card";
import GroceryListTable from "./GroceryListTable";
import FoodContext from "../../../store/food-context";
import SUB_HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";


const GroceryList = (props) => {
  const foodCtx = useContext(FoodContext)
  const IngredientsTable = foodCtx.ingredientTable
  const isLoading = IngredientsTable.isQuerying
  const { allIngredients, allDishes } = foodCtx
  const [grandTotal, setGrandTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [seeTotal, setSeeTotal] = useState("Total");
  const [ingredients, setIngredients] = useState([]);

  const [checkedIndices, setCheckedIndices] = useState([])
  const onIngredientClick = (ingredientIndex, checked) => {
    
    setIngredients((prevs) => {
      const tempIngredients = prevs.slice()
      
      const checkedIngredient = tempIngredients.splice(ingredientIndex, 1)[0]
      const lastIngredientIndex = tempIngredients.length

      const positionBeforeCheckedIngredients = lastIngredientIndex - checkedIndices.length
      const lastPositionNotChecked = positionBeforeCheckedIngredients - 1 >= 0 ? positionBeforeCheckedIngredients : 0
      const checkedPos = tempIngredients.length === checkedIndices.length - 1  ? 0 : lastPositionNotChecked + 1

      checked ? tempIngredients.splice(checkedPos, 0, checkedIngredient) : tempIngredients.splice(lastPositionNotChecked, 0, checkedIngredient)

      setCheckedIndices((prevs) => {
        const tempChecks = prevs.slice()
        checked ? tempChecks.splice(tempChecks.indexOf(checkedPos), 1) : tempChecks.splice(tempChecks.length, 0, lastPositionNotChecked) 

        return [...tempChecks]
      })
      return [...tempIngredients]
    })
    
  }

  const messageToDisplay = 
  ingredients.length == 0 
  ? "You Need To Make A New Schedule"  
  : allIngredients.length == 0
    ? "You Need TO Add Some Ingredients"
    : allDishes.length == 0
    ? "You Need Too Create Some Dishes Now"
    : false

  
  useEffect(() => {
    if (Array.isArray(props.shoppingListIngredients)){
      const newIngredients = [...props.shoppingListIngredients]
      const newGrandTotal = newIngredients.reduce((prev, ingredient, index) => {
        return prev + ingredient.total
      }, 0)
  
      const totalNumItems = newIngredients.reduce((prev, ingredient, index) => {
        return prev + ingredient.number
      }, 0)
      setIngredients(newIngredients)
      setGrandTotal(newGrandTotal)
      setNumberOfItems(totalNumItems)
    }
    
    // setIngredients(formattedIngredients);
  }, [props.shoppingListIngredients]);

  

  const toggleButton = () => {
    seeTotal === "Total" ? setSeeTotal("Price") : setSeeTotal("Total");
  }; 
 
  return (
    <div className={css.main}>
      {isLoading ? (
        <h1>Retreiving a New Schedule</h1>
      ) : !messageToDisplay ? (
        <Card className={css.card}>
          <PostButton
            className={css.show}
            text={`See ${seeTotal === "Total" ? "Prices" : "Totals"}`}
            onClick={toggleButton}
          />

          <GroceryListTable  
            ingredients={ingredients} 
            seeTotal={seeTotal}
            grandTotal={grandTotal}
            numberOfItems={numberOfItems}
            currency={props.currency}
            onClick={onIngredientClick}
            checkedIndices={checkedIndices}
          />

        </Card>
      ) : (
        <SUB_HEADING text={messageToDisplay} />
      )}
      
    </div>
  );
};

export default GroceryList;

