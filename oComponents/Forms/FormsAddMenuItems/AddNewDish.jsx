import css from "../Form.module.css"
import { Fragment, useState, useContext, useEffect } from "react";
import FoodContext from "../../../store/food-context";
import Card from "../../../Merkurial/Components/UI/Cards/Card";
import TextArea from "../../../Merkurial/Components/UI/Basics/Text/TextArea";
import Button from "../../../Merkurial/Components/UI/Buttons/Button";
import BootStrapGridder from "../../../Merkurial/Components/UI/BootStrap/BootStrapGridder"
import AddIngredientsToDish from "./AddIngredients/AddIngredientsToDish";
import SUB_HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import AddDishNameAndMeal from "./AddDishNameAndMeal/AddDishNameAndMeal";
import { OBJECT_ARRAY_TABLE } from "../../../Merkurial/Components/UI/Table/TABLE";
import { 
  AppendChosenIngredient, 
  HandleChange, 
  RemoveIngredient, 
  HandleDishSaveSubmit, 
  GetDefaultInstructionsText,
 } from "../FormHelpers"
import RADIOS from "../../../Merkurial/Components/UI/Basics/SELECTION/RADIAL";


const dishTypeOptions = [{value: true, text: "Entree"}, {value: false, text: "Side"}]
const MealType = RADIOS
const INGREDIENT_TABLE = OBJECT_ARRAY_TABLE 

const AddNewDishForm = (props) => {
  const foodCtx = useContext(FoodContext);
  const mealOptions = [...foodCtx.allMeals]
  mealOptions.unshift("-")
  const [ingredientOptions, setIngredentOptions] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([])

  const [formError, setFormError] = useState(null)
  const [currentMealName, setCurrentMealName] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishIsEntree, setDishIsEntree] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(1);

  const [textAreaUpdated, setTextAreaUpdated] = useState(false);
  const [instructions, setInstructions] = useState("");
  

  useEffect(() => {
    setIngredentOptions([...foodCtx.allIngredients])
  }, [foodCtx.allIngredients])



  const handleChange = (event) => {
    const setObject = {
      "dishName": setDishName,
      "mealName": setCurrentMealName,
      "dishType": setDishIsEntree,
      "instructions": setInstructions,
      "number": setCurrentNumber
    }

    HandleChange(event, setObject)
    if (event.target.name === "instructions"){
      setTextAreaUpdated(true)
    } 
  }; 
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = HandleDishSaveSubmit(
      dishName.trim(), 
      chosenIngredients, 
      dishIsEntree === "true" ? true : false, 
      currentMealName.trim(), 
      instructions.trim())
    if (formIsValid[0]) {
      const [
        finalDishName,  
        is_entree, 
        iids, 
        uids, 
        numbers,
        fixedMealName
      ] = formIsValid

      const response = await foodCtx.ADD_DISH(
          finalDishName, 
          is_entree,
          iids,
          uids,
          numbers,
          fixedMealName,
          instructions,
      )
        if (response){
          setCurrentMealName("-")
          setCurrentNumber(1)
          setDishName("")
          setDishIsEntree(null)
          setInstructions("")
          setChosenIngredients([])

        }
    } else {
      const message = formIsValid[1]
      setFormError(message)
      setTimeout(() => {
        setFormError(null)
      }, 3000)
    }  
  };


  const removeIngredient = (index) => {
    RemoveIngredient(index, setChosenIngredients)
  };

  const appendToChosenIngredients = (ingredientData) => {
    AppendChosenIngredient(ingredientData, ingredientOptions, setChosenIngredients)

  }


  const tableIngredients = [...chosenIngredients]

  useEffect(() => {
    // Just For Until User Edits Text
    if (dishName != "" && typeof dishName === "string" && !textAreaUpdated){
      const [_, defaultIngredientInstructions, __] = GetDefaultInstructionsText(dishName, textAreaUpdated, chosenIngredients)
      if (defaultIngredientInstructions){
        setInstructions(defaultIngredientInstructions)
      }  
    }
  }, [dishName, textAreaUpdated, chosenIngredients.length])

 

  return (
    <Fragment>
      <Card className={css.card}>
        <form onSubmit={handleSubmit} className="form">
          <SUB_HEADING
            text="Create Your Next Masterpiece"
            className={css.title}
          />
          <Card className={css.formContainer}>
            <div className={css.selectors}>
              <BootStrapGridder className={css.gridder} fluid>
                <AddDishNameAndMeal onChange={handleChange} options={mealOptions} dishValue={dishName} mealValue={currentMealName} />

                {currentMealName && currentMealName !== "choose" && currentMealName !== "-" && currentMealName !== "" && (

                  <Fragment>
                    <MealType onChange={handleChange} options={dishTypeOptions} value={dishIsEntree} className={css.radials}  id="dishType" name="dishType" />
                    
                    <AddIngredientsToDish
                      ingredientLabel="Ingredient"
                      ingredientOptions={ingredientOptions}
                      number={currentNumber}
                      onChange={handleChange}
                      appendToChosenIngredients={appendToChosenIngredients}

                    />

                    <INGREDIENT_TABLE
                      tableClass={css.tableClass}
                      headerClass={css.tableHeaderClass}
                      dataClass={css.columns}
                      rowClass={css.rows}
                      rows={tableIngredients}
                      wantHeaders
                      exclusions={["uid", "iid"]}
                      onRowClick={removeIngredient}
                      
                    />
                    
                    {chosenIngredients.length > 0 && 
                      <div className={css.instructionsDiv}>
                        <TextArea 
                          label={{
                            text: "Instructions", 
                            className:css.labelDiv,
                            name: "instructions",
                            }
                          }
                          className={css.description}
                          value={instructions}
                          placeholder={`Instructions for making ${dishName}`}
                          id="instructions"
                          name="instructions"
                          onChange={handleChange}
                        />
                      </div>
                      
                    }
                  </Fragment>
                )}
              </BootStrapGridder>
            </div>
            {formError != null && <p>{formError}</p>}
            <Button
              type="action"
              text="Save"
              className={`${css.postButtonDiv}`}
              buttonClass={css.postButton}
            />
          </Card>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddNewDishForm;
