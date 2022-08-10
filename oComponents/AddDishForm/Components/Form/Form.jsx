import { Fragment, useState, useEffect, useContext } from "react";
import $ from "jquery";
import css from "../Form/Form.module.css";
import Card from "../../../UI/Card/Card";
import Input from "../../../UI/Input/Input";
import Label from "../../../UI/Label/Label";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/AppWrapper/WrapComponents/Button/Button";
import Select from "../../../UI/Select/Select";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col } from "react-bootstrap";
import Radial from "../../../UI/Radials/Radial";
import AddIngredients from "../../AddIngredients/AddIngredients";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import { SuperTitleFy } from "../../../../Helpers/GeneralPurpose/Strings";
import FoodContext from "../../../../store/food-context";
import AuthContext from "../../../../store/auth-context";

const AddProductForm = (props) => {
  const foodCtx = useContext(FoodContext);
  const authCtx = useContext(AuthContext);
  const update = authCtx.getDbUpdate;
  const addNewDish = foodCtx.addNewDish;
  const [ingredientError, setIngredientError] = useState("");
  const [meal, setmeal] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishType, setDishType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");

  const dishes = props.dishes;

  const ingredientsAreValid = ingredients.length > 0;

  const dishTypeIsValid = dishType === "entrees" || dishType === "sides";
  const formIsValid =
    dishName !== "" &&
    dishType !== "" &&
    ingredients.length >= 0 &&
    dishTypeIsValid;

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    name === "dishName" && setDishName(value);
    name === "meal" && setmeal(value);
    name === "instructions" && setInstructions(value);
    name === "dishType" && setDishType(value);
    name === "ingredient" && setCurrentIngredient(value);
    name === "price" && setCurrentPrice(value);
    name === "instructions" && setInstructions(value);
    name === "number" && setCurrentNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalDishName = SuperTitleFy(dishName);

    const sendData = {
      meal: meal,
      dishType: dishType,
      data: {
        dish: finalDishName,
        ingredients: ingredients,
        instructions: instructions,
      },
    };

    if (formIsValid) {
      const response = await addNewDish(sendData);
      update();
      console.log(response);
    } else {
      console.log("all required fields not filled in...");
    }

    setDishName("");
    setInstructions("");
    setIngredients([]);
  };
  // console.log(ingredients);

  const addIngredients = (event) => {
    const data = { ingredient: currentIngredient, price: currentPrice };
    if (event) {
      event.preventDefault();
    }

    setIngredientError("");
    setCurrentIngredient("");
    setCurrentPrice("");
  };
  // console.log(ingredients);

  const removeIngredient = (id) => {
    setIngredients((prev) => {
      prev.splice(id, 1);
      return [...prev];
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      $("#addIngredient").click().animate({ backgroundColor: "white" });
    }
  };
  useEffect(() => {
    $(document).ready(function () {
      $(window).on("keydown", function (event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    });
  });

  return (
    <Fragment>
      <div className={css.spacer}></div>
      <Card className={css.card}>
        <form onSubmit={handleSubmit} className="form">
          <PageSection
            section="Add Your Next Masterpiece"
            className={css.title}
          />
          <Card className={css.formContainer}>
            <div className={css.selectors}>
              <BootStrapGridder>
                <Col md="6">
                  <Input
                    input={{
                      placeholder: "Masterpiece...",
                      id: "dishName",
                      name: "dishName",
                      onChange: handleChange,
                      value: dishName,
                    }}
                    label={{
                      text: "Dish",
                      id: "dishName",
                      name: "dishName-label",
                    }}
                  />
                </Col>

                <Col md="6">
                  <Select
                    choose={false}
                    label="Meal"
                    labelClass={css.label}
                    optionClass={css.selectorsOptions}
                    className={css.selectLeft}
                    onChange={handleChange}
                    options={dishes}
                    htmlSize={100}
                    value={meal}
                    id="meal"
                    name="meal"
                    bsPrefix={css.selectPrefix}
                  />
                </Col>

                {meal !== "choose" && meal !== "" && (
                  <Fragment>
                    <div className={css.radials} name="dishType" id="dishType">
                      <BootStrapGridder>
                        <Col sm="12" md="6">
                          <Radial
                            value="entrees"
                            text="Main Dish"
                            id="dishType"
                            name="dishType"
                            onChange={handleChange}
                            checked={dishType === "entrees" ? true : false}
                          />
                        </Col>

                        <Col sm="12" md="6">
                          <Radial
                            value="sides"
                            text="Side Dish"
                            id="dishType"
                            name="dishType"
                            onChange={handleChange}
                            checked={dishType === "sides" ? true : false}
                          />
                        </Col>
                      </BootStrapGridder>
                    </div>

                    <AddIngredients
                      ingredientLabel="Ingredient"
                      priceLabel="Price"
                      removeIngredient={removeIngredient}
                      label={{
                        text: "Ingredients",
                        id: "ingredient",
                        name: "ingredient",
                        value: "",
                      }}
                      input={{ text: "Ingredient", onKeyDown: handleKeyDown }}
                      buttonId="addIngredient"
                      ingredients={ingredients}
                      priceValue={currentPrice}
                      ingredientValue={currentIngredient}
                      currentIngredient={currentIngredient}
                      number={currentNumber}
                      setIngredient={setIngredients}
                      onClick={addIngredients}
                      onChange={handleChange}
                      setCurrentIngredient={setCurrentIngredient}
                      setIngredientError={setIngredientError}
                      onKeyDown={handleKeyDown}
                      setNumber={setCurrentNumber}
                      setIngredients={setIngredients}
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
                        handleChange={handleChange}
                      />
                    </div>
                  </Fragment>
                )}
              </BootStrapGridder>
            </div>

            <Button
              type="action"
              text="Add"
              className={`btn btn-secondary ${css.postButton}`}
            />
          </Card>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddProductForm;
