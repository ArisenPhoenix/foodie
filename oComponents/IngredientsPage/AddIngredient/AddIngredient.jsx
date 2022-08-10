import { useState, useContext } from "react";
import FoodContext from "../../../store/food-context";
import css from "./AddIngredient.module.css";
import Input from "../../UI/Input/Input";
import PostButton from "../../UI/Button/PostButton/PostButton";
import { Col, Row } from "react-bootstrap";
import PageSection from "../../BasicPageComponents/PageSection/PageSection";
import { SuperTitleFy } from "../../../Helpers/GeneralPurpose/Strings";
import AuthContext from "../../../store/auth-context";

const AddIngredient = (props) => {
  const foodCtx = useContext(FoodContext);
  const authCtx = useContext(AuthContext);
  const addIngredient = foodCtx.addNewIngredient;
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    name === "ingredient" && setIngredient(value);
    name === "price" && setPrice(value);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      ingredient === "" ||
      ingredient === "undefined" ||
      price === 0 ||
      price === NaN ||
      price === "" ||
      price === "undefined"
    ) {
      setErrorMessage("You Must Complete Both Fields To Add An Ingredient");
      return;
    }
    setErrorMessage(null);
    const finalIngredientName = SuperTitleFy(ingredient);
    const sendData = { ingredient: finalIngredientName, price: price };

    props.addIngredientToList({
      ingredient: { name: sendData.ingredient, price: sendData.price },
    });

    await addIngredient(sendData);

    authCtx.getDbUpdate();

    setPrice(0);
    setIngredient("");
  };

  return (
    <div className={css.addIngredientDiv}>
      <Row>
        <Col xs="5" md="6">
          <PageSection section="Ingredient" className={css.ingredientText} />
          <Input
            input={{
              text: "Ingredient",
              name: "ingredient",
              placeholder: "new ingredient...",
              id: "AddNewIngredientInput",
              className: css.ingredientInput,
              value: ingredient,
              onChange: handleChange,
            }}
          />
        </Col>

        <Col xs="4">
          <PageSection section="Price" className={css.priceText} />
          <Input
            input={{
              type: "number",
              name: "price",
              text: "Price",
              placeholder: "price...",
              id: "AddNewPriceInput",
              className: css.priceInput,
              value: price,
              onChange: handleChange,
            }}
          />
        </Col>
        <Col xs="2">
          <PostButton
            text="Add"
            className={css.addButton}
            onClick={handleAdd}
          />
        </Col>
        {errorMessage !== null && <p>{errorMessage}</p>}
      </Row>
    </div>
  );
};

export default AddIngredient;
