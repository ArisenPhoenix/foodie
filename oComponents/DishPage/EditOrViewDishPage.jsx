import css from "./DishPage.module.css";
import { useState, useContext } from "react";
import DisplayDish from "../MenuItemDisplays/DishDisplay/DisplayDish";
import Button from "../UI/Button/PostButton/PostButton";
import Modal from "../UI/Modal/Modal0";
import { useRouter } from "next/router";
import UpdateDishForm from "../Forms/FormsUpdateMenuItems/UpdateDishForm";
import SiteContext from "../../store/site_context";
import FoodContext from "../../store/food-context";

const EditOrViewDishPage = (props) => {
  const siteCtx = useContext(SiteContext)
  const foodCtx = useContext(FoodContext)
  const router = useRouter();

  const dishData = props.dishData ? props.dishData : siteCtx.lastDishData
  const allIngredients = props.allIngredients

  const { 
    did,
    dishName: prevDishName,
    dishType: prevDishType,
    ingredients: prevChosenIngredients, 
    details: prevDetails, 
    mealName: prevMealName,
    ingredients_ids,
    ingredients_uids,
    ingredients_numbers
  } = dishData
  

  if (!props.dishData.dishName) {
    router.back()
  }

  const [edit, setEdit] = useState("false");
  const [editText, setEditText] = useState("Edit");
  const [showModal, setShowModal] = useState(false);

 
  const confirmDelete = () => {
    setShowModal(true);
  };

  const handleNo = () => {
    setShowModal(false);
  };

  const deleteDish = async () => {
    const DELETE_DISH = foodCtx.DELETE_DISH
    setShowModal(false);
    const delRes = await DELETE_DISH(
      did, 
      prevDishName, 
      prevDishType === "entree" ? true : false,
      prevMealName, 
      prevDetails
      )
    if (delRes){
      router.back()
    }
  }; 

  const pushEdit = () => {
    if (edit === "false") {
      setEdit("true");
      setEditText("Cancel");
    } else {
      setEdit("false");
      setEditText("Edit");
    }
  };

  const Buttons = () => {
    return (
      <div className={css.buttonContainer}>
          <Button
            text={editText}
            onClick={pushEdit}
            className={`btn btn-secondary ${css.buttonEdit}`}
          />
          <Button
            text="Delete"
            onClick={confirmDelete}
            className={`btn btn-secondary ${css.buttonDelete}`}
          />
      </div>
      )
  }

  const mealProps = {
    mealName: prevMealName,
    chosenIngredients: prevChosenIngredients,
    dishName: prevDishName,
    details: prevDetails,
    dishType: prevDishType,
    did: did,
    options: allIngredients,
    entree: prevDishType,
    is_entree: prevDishType === "entree" ? true : false,
    UpdateButtons: Buttons,
    ingredients_ids: ingredients_ids,
    ingredients_uids: ingredients_uids,
    ingredients_numbers: ingredients_numbers
  }
  
 
 
  return (
    <div className={css.main}> 
      {dishData ? (
        <>
          <Modal
            title="Confirm Delete"
            message="Are you sure you'd like to delete the selected item?"
            show={showModal}
            okayButton="Sure"
            closeButton="No"
            handleNo={handleNo}
            handleYes={deleteDish}
          />
          
          {editText === "Cancel" ? (
            <>
              <UpdateDishForm
                {...mealProps}
              />
            </> 
          ) : (
            <>
              <DisplayDish
                {...mealProps}
              />
            </>
          )}
          
        </>
      ) : (
        <h1>Please Try Again.</h1>
      )}

          
    </div>
  );
};

export default EditOrViewDishPage;
