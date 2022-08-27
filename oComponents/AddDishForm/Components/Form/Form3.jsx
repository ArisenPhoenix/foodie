import { Fragment, useState, useEffect } from "react";
import $ from "jquery";
import css from "../Form/Form.module.css";
import Card from "../../../UI/Card/Card";
import Input from "../../../UI/Input/Input";
import Label from "../../../UI/Label/Label";
import TextArea from "../../../UI/TextArea/TextArea";
import Button from "../../../UI/AppWrapper/WrapComponents/Button/Button";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import { Col } from "react-bootstrap";
import AddIngredients from "../../AddIngredients/AddIngredients";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import { SuperTitleFy } from "../../../../Helpers/GeneralPurpose/Strings";

const Form3 = (props) => {
  const [ingredientError, setIngredientError] = useState(null);
  const [dishError, setDishError] = useState(null);
  const [dishName, setDishName] = useState(props.name);
  const [instructions, setInstructions] = useState(props.instructions);
  const ingredientData = props.ingredients;

  ingredientData.forEach((ingredient) => {
    if (!ingredient.number) {
      ingredient.number = 1;
      return { ingredient };
    } else {
      return ingredient;
    }
  });

  const [ingredients, setIngredients] = useState(ingredientData);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const compileAllDataForUpdate = (e) => {
    console.log("compile update info function");
    e.preventDefault();
    if (dishName === "" || dishName === "unidentified") {
      setDishError("You need to specify a name for your dish");
      return;
    }
    if (ingredients && ingredients.length < 1) {
      setIngredientError("You have no ingredients.");
      return;
    }
    const finalDishName = SuperTitleFy(dishName);
    const data = {
      dish: finalDishName,
      instructions: { instructions: instructions, _id: props.instructions._id },
      ingredients: ingredients,
      dishType: props.dishType,
      meal: props.meal,
    };
    setIngredientError(null);
    setDishError(null);
    props.updateDish(data);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    name === "dishName" && setDishName(value);
    name === "instructions" && setInstructions(value);
    name === "ingredient" && setCurrentIngredient(value);
    name === "price" && setCurrentPrice(value);
    name === "instructions" && setInstructions(value);
  };

  const addIngredients = (event) => {
    const data = { ingredient: currentIngredient, price: currentPrice };
    if (event) {
      event.preventDefault();
    }
    setIngredientError(null);
    setCurrentIngredient("");
    setCurrentPrice("");
  };

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
    <div className={css.main}>
      <div className={css.spacer}>
        <Card className={css.card}>
          <form onSubmit={compileAllDataForUpdate} className="form">
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
                    {dishError !== null && <p>{dishError}</p>}
                  </Col>

                  <Fragment>
                    <AddIngredients
                      ingredients={ingredients}
                      removeIngredient={removeIngredient}
                      setIngredient={setIngredients}
                      onClick={addIngredients}
                      setIngredientError={setIngredientError}
                      onKeyDown={handleKeyDown}
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
                </BootStrapGridder>
              </div>

              <Button
                type="action"
                text="Update"
                className={`btn btn-secondary ${css.postButton}`}
              />
            </Card>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Form3;
