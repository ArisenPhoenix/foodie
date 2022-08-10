import css from "./DishPage.module.css";
import { Fragment, useState, useContext } from "react";
import Dish from "./Dish";
import Button from "../UI/Button/PostButton/PostButton";
import Modal from "../UI/Modal/Modal0";
import { useRouter } from "next/router";
import Form3 from "../AddDishForm/Components/Form/Form3";
import FoodContext from "../../store/food-context";

const DishPage = (props) => {
  console.log("DISH PAGE: ", props);
  // console.log(props);
  if (!props.mealData.dish) {
    return null;
  }
  const foodCtx = useContext(FoodContext);
  const ingredientList = foodCtx.allIngredients;
  const data = props.mealData;
  const router = useRouter();
  // console.log("DISH PAGE: ", props);

  const [edit, setEdit] = useState("false");
  const [editText, setEditText] = useState("Edit");
  const [showModal, setShowModal] = useState(false);

  const updateDishHandler = async (update_data) => {
    const dishId = props.mealData.id;
    update_data = { ...update_data, _id: dishId };
    props.updateDish(update_data);
    const redirect = `/menu/${router.query.meal}`;
    const meal = update_data.meal;
    console.log("update_data,", update_data);
    const index = meal.index;
    const dishType = data.dishType;

    if (meal === "breakfast") {
      foodCtx.setBreakfast((prev) => {
        const newDishType = `${dishType}s`;
        prev[newDishType].splice(index, 1);
        return prev;
      });
    } else if (meal === "lunch") {
      foodCtx.setLunch((prev) => {
        const newDishType = `${dishType}s`;
        prev[newDishType].splice(index, 1);
        return prev;
      });
    } else if (meal === "dinner") {
      foodCtx.setLunch((prev) => {
        const newDishType = `${dishType}s`;
        prev[newDishType].splice(index, 1);
        return prev;
      });
    } else if (meal === "snack") {
      foodCtx.setSnack((prev) => {
        const newDishType = `${dishType}s`;
        prev[newDishType].splice(index, 1);
        return prev;
      });
    } else if (meal === "dessert") {
      foodCtx.setDessert((prev) => {
        const newDishType = `${dishType}s`;
        prev[newDishType].splice(index, 1);
        return prev;
      });
    }

    router.push(redirect);
  };

  const confirm = () => {
    setShowModal(true);
  };

  const handleNo = () => {
    setShowModal(false);
  };

  const deleteDish = async () => {
    const sendData = {
      meal: data.meal,
      dishType: data.dishType,
      id: data.id,
      name: data.dish,
    };

    props.deleteDish(sendData);
    setShowModal(false);
    const redirect = `/menu/${router.query.meal}`;
    router.push(redirect);
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

  return (
    <Fragment>
      {data ? (
        <Fragment>
          <Modal
            title="Confirm Delete"
            message="Are you sure you'd like to delete the selected item?"
            show={showModal}
            okayButton="Sure"
            closeButton="No"
            handleNo={handleNo}
            handleYes={deleteDish}
          />
          <div className={css.buttonContainer}>
            <Button
              text="Delete"
              onClick={confirm}
              className={`btn btn-secondary ${css.buttonDelete}`}
            />
            <Button
              text={editText}
              onClick={pushEdit}
              className={`btn btn-secondary ${css.buttonEdit}`}
            />
          </div>
          {editText === "Cancel" ? (
            <Fragment>
              <Form3
                meal={data.meal}
                ingredients={data.ingredients}
                name={data.dish}
                instructions={props.mealData.instructions}
                instructions_id={data.instructions}
                mealType={data.mealType}
                dishType={data.dishType}
                id={data.id}
                updateDish={updateDishHandler}
                options={ingredientList}
                setCurrentMeal={props.setCurrentMeal}
              />
            </Fragment>
          ) : (
            <Dish
              entree={data.dish}
              ingredients={data.ingredients}
              key={`Entree ${Math.random()}`}
              meal={data.meal}
              dishType={data.dishType}
              mealType={data.mealType}
              id={data._id}
              instructions={props.mealData.instructions}
              setCurrentMeal={props.setCurrentMeal}
            />
          )}
        </Fragment>
      ) : (
        <h1>Please Try Again.</h1>
      )}
    </Fragment>
  );
};

export default DishPage;
