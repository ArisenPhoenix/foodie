import { useContext, useState } from "react";
import css from "./AddIngredients.module.css";
import BootstrapGridder from "../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import Button from "../../UI/Button/PostButton/PostButton";
import Label from "../../UI/Label/Label";
import FoodContext from "../../../store/food-context";
import SelectIngredient from "./SelectIngredient/SelectIngredient";
import Input from "../../UI/Input/Input";
import IngredientTable from "./FormIngredient/IngredientTable/IngredientTable";

const AddIngredients = (props) => {
  const foodCtx = useContext(FoodContext);
  const ingredientOptions = foodCtx.allIngredients;
  const [chosenIngredient, setChosenIngredient] = useState("Choose");
  const [optionData, setOptionData] = useState("");
  const [number, setNumber] = useState("");

  // console.log("ADD INGREDIENTS: ", ingredientOptions);

  const addIngredient = () => {
    if (chosenIngredient === "Choose" || chosenIngredient === "") {
      props.setIngredientError("You First Need To Choose An Ingredient");
      return;
    }

    if (number === "" || number === NaN || number < 1) {
      props.setIngredientError(
        "You Must First Enter The Number Needed For This Ingredient"
      );
      return;
    }

    props.setIngredientError(null);

    const newData = {
      price: optionData.ingredient.price,
      ingredient: optionData.ingredient.name,
      number: +number,
      id: optionData._id,
    };

    props.setIngredients((prev) => {
      return [...prev, newData];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    name === "number" && setNumber(+value);
    if (name === "select") {
      setChosenIngredient(value);
      const newData = pullOutFullData(value);
      setOptionData(newData[0]);
    }
  };

  const pullOutFullData = (data) => {
    console.log("data,", data);
    if (data === "Choose") {
      return {
        id: "None",
        ingredient: { name: "None", price: "0" },
        number: +number,
      };
    }

    const newOption = ingredientOptions.filter((option, index) => {
      return option && option.ingredient && option.ingredient.name === data;
    }, []);
    return newOption;
  };

  return (
    <div>
      <div className={css.labelDiv}>
        <Label
          text="Ingredients"
          id="ingredient"
          name="ingredient"
          className={`btn form-control  ${css.mainLabel}`}
        />
      </div>
      <div className={`${css.ingredientSelectContainer} ${css.verticalCenter}`}>
        <BootstrapGridder>
          <Col xs="12" md="5" className={css.fixCol}>
            <div className={css.selectDiv}>
              <SelectIngredient
                id="select"
                name="select"
                options={ingredientOptions}
                choose={true}
                value={chosenIngredient}
                onChange={handleChange}
              />
            </div>
          </Col>

          <Col>
            <Input
              input={{
                placeholder: "number",
                type: "number",
                value: number,
                id: "number",
                name: "number",
                onChange: handleChange,
              }}
            />
          </Col>
          <Col className={css.fixCol}>
            {/* Add Ingredient Button */}
            <Button
              id={props.buttonId}
              text="+"
              type="button"
              className={`btn btn-primary ${css.button}`}
              onClick={addIngredient}
              onKeyDown={props.onKeyDown}
            />
          </Col>
        </BootstrapGridder>
      </div>
      <IngredientTable
        ingredients={props.ingredients}
        delete={props.removeIngredient}
      />
    </div>
  );
};

export default AddIngredients;
