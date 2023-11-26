import GroceryList from "./GroceryList/GroceryList";
import { useContext, useEffect, useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import css from "./ShoppingList.module.css";
import FoodContext from "../../store/food-context";
import HEADING from "../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import PostButton from "../UI/Button/PostButton/PostButton";
import TextModal from "../../Merkurial/Components/UI/BootStrap/Modal/TextModal";
import {IS_POPULATED_OBJECT_ARRAY} from "../../Merkurial/Helpers/Objects/Validations"
import NextPrevButtons from "../Buttons/NextPrevButtons/NextPrevButtons";
import ShoppingOptionButtons from "./ShoppingOptionsButtons";
import useToggle from "../../Merkurial/hooks/Toggle";
import ShoppingListMainButtons from "./ShoppingListMainButtons";

const ShoppingList = (props) => { 
  const foodCtx = useContext(FoodContext)
  const {main_meals, other_meals, schedule_name, wid} = foodCtx.currentMenu
  const [isWriting, setIsWriting] = useState(false)
  const [name, setName] = useState(schedule_name ? schedule_name : "")
  const [displayButtons, toggleDisplayButtons] = useToggle(false)
  const depth = 2
  
  // console.log("MAIN MEALS: ", main_meals)

  const saveWeeklyPlan = async(e) => {
    e.preventDefault()
    if (canSubmit){
      await foodCtx.ADD_MENU(name)
    }
  }


  const updateWeeklyPlan = async(e) => {
    e.preventDefault()
    if (canSubmit){
      await foodCtx.UPDATE_MENU(name)
    }
  }

  const setToCurrent = async(e) => {
    e.preventDefault()
    if (canSubmit){
      await foodCtx.SET_CURRENT_MENU()
    }
  }

  const deleteThisMenu = async(e) => {
    if (canSubmit){
       const delRes = await foodCtx.DELETE_MENU()
    }
  }


  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    name === "name" && setName(value)
  }

  const handleYes = () => {
    setIsWriting(false)
  }

  const handleNo = () => {
    setIsWriting(false)
    setName("")
  }


  useEffect(() => {
    if (schedule_name !== ""){
      setName(schedule_name)
    }
  }, [schedule_name])

  const isNameValid = name && name != ""
  const isPlanValid = IS_POPULATED_OBJECT_ARRAY(main_meals, depth) && IS_POPULATED_OBJECT_ARRAY(other_meals, depth) ? true : false
  const canSubmit = name && name != "" && isPlanValid ? true : false

  const options = [
    {name: "namePlan", text: wid ? `Rename ${name}` : "Name Plan", callback: () => setIsWriting(true), condition: isPlanValid},
    {name: "deletePlan", text: `Delete ${name}`, callback: deleteThisMenu, condition: isNameValid && canSubmit},
    {name: "displayOptions", text: "Close Options", callback: toggleDisplayButtons, condition: displayButtons},
    {name: "updatePlan", text: `Update ${name}`, callback: updateWeeklyPlan, condition: isNameValid && canSubmit},
    {name: "setCurrentPlan", text: `Set As Default`, callback: setToCurrent, condition: isNameValid && canSubmit},
  ]


  return (
    <div className={css.shoppingContainer}>
      <TextModal value={name} 
        onChange={handleChange} 
        name="name" 
        show={isWriting}
        handleYes={handleYes}
        handleNo={handleNo}
        okayButton="Save"
        closeButton="Cancel"
      />
      <>
        

        <HEADING text="Grocery List" className={css.groceryHeader} />
        {/* <GroceryButtons getNewMenu={foodCtx.GENERATE_NEW_MENU} printPage={printPage} /> */}
        <ShoppingListMainButtons getNewSchedule={foodCtx.GENERATE_NEW_MENU} mainText={name}/>

        <GroceryList
          scheduleId={props.scheduleId}
          currency={foodCtx.currency}
          shoppingListIngredients={foodCtx.shoppingListIngredients}
        />
        <NextPrevButtons 
          back={foodCtx.PREVIOUS_MENU}
          next={foodCtx.NEXT_MENU}
          leftClass={css.back}
          rightClass={css.next}
          className={css.nextPrevDiv}
        />
        <ShoppingOptionButtons 
          buttons={options}
          displayButtons={displayButtons}
          toggleDisplayButtons={toggleDisplayButtons}
          displayButtonText={"Options"}
          buttonsClass={css.optionsButtons}
        />
      </> 
      <div className={css.planContainer}>
        {main_meals && (
          <>
            <h1 className={css.groceryHeader}>Weekly Plan</h1>
            <WeeklyPlan 
              plan={main_meals}
              planText="Main"
              mealModuleClasses={props.mealModuleClasses}
            />
          </>
        )}
      </div>
      <div>
        {other_meals && (
          <WeeklyPlan
            plan={other_meals}
            planText="Other"
            mealModuleClasses={props.mealModuleClasses}
          />
        )}
      </div>

      <PostButton text="Save Plan" className={css.saveWeeklyPlanButton} onClick={saveWeeklyPlan}/>
    </div>
  );
};

export default ShoppingList;
