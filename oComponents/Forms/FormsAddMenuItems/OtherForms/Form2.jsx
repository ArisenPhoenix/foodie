import { Fragment, useState, useEffect } from "react";
import css from "../../Form.module.css"
import Card from "../../../../Merkurial/Components/UI/Cards/Card";
import Input from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Inputs/Input";
import Label from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Labels/Label";
import TextArea from "../../../../Merkurial/Components/UI/Basics/Text/TextArea";
import Button from "../../../../Merkurial/Components/UI/Buttons/Button";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import FormIngredients from "../AddIngredients/FormIngredient/SingleIngredient"
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";





const AddProductForm = (props) => {
  const [ingredientError, setIngredientError] = useState("");

  const [dishName, setDishName] = useState(props.name);
  const [dishType, setDishType] = useState(props.dishType);

  const [instructions, setInstructions] = useState(props.instructions);

  const [ingredients, setIngredients] = useState(props.ingredients);

  const [currentIngredient, setCurrentIngredient] = useState("");

  const [currentPrice, setCurrentPrice] = useState("");

  const formIsValid = dishName !== "" && ingredients.length > 0;

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    name === "dishName" && setDishName(value);
    name === "instructions" && setInstructions(value);
    name === "dishType" && setDishType(value);
    name === "ingredient" && setCurrentIngredient(value);
    name === "price" && setCurrentPrice(value);
    name === "instructions" && setInstructions(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formIsValid === true) {
      props.updateDish({
        _id: props.id,
        meal: props.meal,
        dishType: dishType,
        dish: dishName,
        ingredients: ingredients,
        instructions: instructions,
      });
    } else {
      console.log("all required fields not filled in...");
    }

    setDishName("");
    setInstructions("");
    setIngredients([]);
  };

  const addIngredients = (event) => {
    const data = { ingredient: currentIngredient, price: currentPrice };
    if (event) {
      event.preventDefault();
    }

    if (currentIngredient === "") {
      setIngredientError("You must first give the ingredient a name");
      return;
    }

    setIngredients((prev) => {
      return [...prev, data];
    });

    setIngredientError("");
    setCurrentIngredient("");
    setCurrentPrice("");
  };

  const removeIngredient = (id) => {
    console.log(id);
    setIngredients((prev) => {
      prev.splice(id, 1);
      return [...prev];
    });
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     $("#addIngredient").click().animate({ backgroundColor: "white" });
  //   }
  // };

  // useEffect(() => {
  //   $(document).ready(function () {
  //     $(window).on("keydown", function (event) {
  //       if (event.keyCode == 13) {
  //         event.preventDefault();
  //         return false;
  //       }
  //     });
  //   });
  // });

  return (
    <Fragment>
      <div className={css.spacer}></div>
      <Card className={css.card}>
        <form onSubmit={handleSubmit} className="form">
          <SUB_HEADING
            text="Edit or Delete Your Failure"
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

                <Fragment>
                  <FormIngredients
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
                    ingredients={ingredients}
                    onClick={addIngredients}
                    onChange={handleChange}
                    priceValue={currentPrice}
                    ingredientValue={currentIngredient}
                    onKeyDown={handleKeyDown}
                    buttonId="addIngredient"
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
                      id={props.instructions._id}
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
              onClick={handleSubmit}
            />
          </Card>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddProductForm;
