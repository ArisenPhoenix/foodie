import { useState, useEffect, useContext } from "react";
import css from "../Form.module.css"
import Card from "../../../Merkurial/Components/UI/Cards/Card";
import Label from "../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Labels/Label";
import TextArea from "../../../Merkurial/Components/UI/Basics/Text/TextArea"
import Button from "../../../Merkurial/Components/UI/Buttons/Button";
import BootStrapGridder from "../../../Merkurial/Components/UI/BootStrap/BootStrapGridder";
import AddIngredientsToDish from "../FormsAddMenuItems/AddIngredients/AddIngredientsToDish";
import SUB_HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import { SuperTitleFy } from "../../../Merkurial/Helpers/Links/Linkify";
import FoodContext from "../../../store/food-context";
import AddDishNameAndMeal from "../FormsAddMenuItems/AddDishNameAndMeal/AddDishNameAndMeal";
import { OBJECT_ARRAY_TABLE } from "../../../Merkurial/Components/UI/Table/TABLE"
import { 
  AppendChosenIngredient, 
  HandleChange, 
  RemoveIngredient, 
 } from "../FormHelpers";
 import { useRouter } from "next/router";

 import RADIOS from "../../../Merkurial/Components/UI/Basics/SELECTION/RADIAL";
  
 const MealType = RADIOS

const INGREDIENT_TABLE = OBJECT_ARRAY_TABLE


const dishTypeOptions = [{value: true, text: "Entree"}, {value: false, text: "Side"}]

  
const UpdateDishForm = (props) => {
  const {
    dishName: prevDishName,
    dishType: prevDishTYpe,
    is_entree: prevIsEntree,
    chosenIngredients: prevChosenIngredients, 
    details: prevDetails, 
    mealName: prevMealName,
    options: allIngredients,
    UpdateButtons
  } = props

  const foodCtx = useContext(FoodContext)
  const mealOptions = foodCtx.allMeals
  const router = useRouter()
  // Module Global States
  const [ingredientError, setIngredientError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [ingredientOptions, setIngredentOptions] = useState([])
  
  // Prev Dish States
  const [dishName, setDishName] = useState(prevDishName);
  const [instructions, setInstructions] = useState(prevDetails);
  const [chosenIngredients, setChosenIngredients] = useState(prevChosenIngredients); 
  const [mealName, setMealName] = useState(prevMealName)
  const [dishIsEntree, setDishIsEntree] = useState(null)
 
  useEffect(() => {
    setChosenIngredients([...prevChosenIngredients]) 
  }, [prevChosenIngredients])


  useEffect(() => {  
    // Initial Setters
    setIngredentOptions([...allIngredients])
    setDishName(prevDishName)
    setInstructions(prevDetails)
    setMealName(prevMealName)
    setDishIsEntree(prevIsEntree ? "true" : "false")
    setChosenIngredients(Array.isArray(prevChosenIngredients[0]) ? [] : [...prevChosenIngredients])

  }, [allIngredients])



  const compileAllDataForUpdate = async(e) => {
    e.preventDefault();
    if (dishName === "" || dishName === "unidentified") {
      setFormError("You need to specify a name for your dish");
      return;
    }
    if (chosenIngredients && chosenIngredients.length < 1) {
      setIngredientError("You have no ingredients.");
      return;
    }
    const finalDishName = SuperTitleFy(dishName);


    setIngredientError(null);
    setFormError(null);

    const UPDATE_DISH = foodCtx.UPDATE_DISH

    const updateObj = {
      mid: props.did, 
      dishName: finalDishName,
      is_entree: dishIsEntree == "true" ? true : false, 
      mealName: mealName, 
      details: instructions,
      ingredients_ids: chosenIngredients.map(ingredient => ingredient.iid),
      ingredients_uids: chosenIngredients.map(ingredient => ingredient.uid),
      ingredients_numbers: chosenIngredients.map(ingredient => ingredient.number)

    }

    const updateRes = await UPDATE_DISH(updateObj)
    if (updateRes){
      router.back()
    }
    
  };


  const handleChange = (event) => {

    event.preventDefault()
    const setObject = {
      "dishName": setDishName,
      "mealName": setMealName,
      "dishType": setDishIsEntree,
      "instructions": setInstructions,
    }

    HandleChange(event, setObject)
  };

  const removeIngredient = (index) => {
    RemoveIngredient(index, setChosenIngredients) 
  };

  const appendToChosenIngredients = (ingredientData) => {
    AppendChosenIngredient(ingredientData, ingredientOptions, setChosenIngredients)

  }

  useEffect(() => {
    if (chosenIngredients.length > 0 && ingredientError){
      setIngredientError(false)
    }
  }, [chosenIngredients])


  const tableIngredients = [...chosenIngredients]

  return (
    <Card className={css.card}>
      <form onSubmit={compileAllDataForUpdate} className="form">
        <SUB_HEADING
          text="Want To Update Your Failed Masterpiece Huh?"
          className={css.title}
        />
        <Card className={css.formContainer}>
          <div className={css.selectors}>
            <BootStrapGridder fluid> 

              <AddDishNameAndMeal onChange={handleChange} options={mealOptions} dishValue={dishName} mealValue={mealName} />
              <MealType onChange={handleChange} options={dishTypeOptions} value={dishIsEntree} className={css.radials} id="dishType" name="dishType" />
              <AddIngredientsToDish
                ingredientLabel="Ingredient"
                ingredientOptions={ingredientOptions} 
                onChange={handleChange}
                appendToChosenIngredients={appendToChosenIngredients}
                setIngredientError={setIngredientError}
              />


              <INGREDIENT_TABLE
                tableClass={css.tableClass}
                headerClass={css.tableHeaderClass}
                dataClass={css.columns}
                rowClass={css.rows}
                rows={tableIngredients}
                wantHeaders
                exclusions={["uid", "iid", "meal", "total"]}
                onRowClick={removeIngredient}
              />

              {ingredientError !== "" && <p>{ingredientError}</p>}
              <div className={css.instructionsDiv}>
                <div className={css.labelDiv}>
                  <Label
                    text="Instructions:"
                    className={`btn form-control  ${css.instructionsLabel}`}
                  />
                </div>
                <TextArea
                  className={css.description}
                  value={instructions}
                  placeholder={`Instructions for making ${dishName}`}
                  id="instructions"
                  name="instructions"
                  onChange={handleChange}
                />
              </div>
            </BootStrapGridder>
          </div>
          {UpdateButtons && <UpdateButtons />}
          <br></br>
          {formError && <p>{formError}</p>}
          <Button
            type="action"
            text="Update"
            buttonClass={`btn btn-secondary ${css.postButton}`}
          />
          
        </Card>
        
      </form>

      
    </Card>
      
  );
};

export default UpdateDishForm;
