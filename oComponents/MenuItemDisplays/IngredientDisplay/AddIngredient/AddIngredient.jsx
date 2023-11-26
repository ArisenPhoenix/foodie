import { useState } from "react";
import css from "./AddIngredient.module.css";
import Input from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Inputs/Input";
import PostButton from "../../../UI/Button/PostButton/PostButton";
import { Col, Row } from "react-bootstrap";
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import { SuperTitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";
import SELECTION from "../../../../Merkurial/Components/UI/Basics/SELECTION/SELECTION";

const measurementFiller = "measurement..."

const AddIngredient = (props) => {
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState(1);
  const [measurement, setMeasurement] = useState(measurementFiller)
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    name === "ingredient" && setIngredient(value);
    name === "price" && setPrice(value);
    name === "measurement" && setMeasurement(value)
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      ingredient === "" ||
      ingredient === "undefined" ||
      measurement === measurementFiller ||
      price === 0 ||
      price === NaN ||
      price === "" ||
      price === "undefined"
    ) {
      setErrorMessage("You Must Fill All Fields To Add An Ingredient");
      return;
    }
    setErrorMessage(null);
    const finalIngredientName = SuperTitleFy(ingredient);
    const sendData = { ingredient: finalIngredientName.trim(), price: Number(price), measurement: measurement.trim() };
    const res = await props.AddIngredient(SuperTitleFy(sendData.ingredient), sendData.measurement, Number(sendData.price)) 
    if (res){
      setIngredient("")
      setPrice(1)
      setMeasurement(measurementFiller)
    }
  };

  
  const lg = "4"
  const xs = "12"

  return (
    <div className={css.addIngredientDiv}>
      <Row>
        <Col xs={xs} lg={lg}>
          <SUB_HEADING text="Ingredient" className={css.ingredientText} />
          <Input
            className = {css.ingredientInput}
            text="Ingredient"
            name="ingredient"
            placeholder="new ingredient..."
            id="AddNewIngredientInput"
            value={ingredient}
            onChange={handleChange}
          />
        </Col>

        <Col xs={xs} lg={lg}>
          <SUB_HEADING text={`Price (${props.currency})`} className={css.priceText} />
          <Input
            className={css.ingredientInput}
            type="number"
            name="price"
            text="Price"
            min="0.1"
            step=".1"
            placeholder="price..."
            id="AddNewPrice"
            value={price}
            onChange={handleChange}
          />
        </Col>

        <Col xs={xs} lg={lg} >
          <SUB_HEADING text="Measurement" />
          <SELECTION
            selectClass={css.selectionInput}
            name="measurement"
            id="measurement"
            title={false}
            value={measurement}
            onChange={handleChange}
            options={props.measurementOptions}
          />
        </Col>
        
        {errorMessage !== null && <p>{errorMessage}</p>}
      </Row>

      <Row xs="12" className={css.selectionColInput}>
          <PostButton
            text="Add"
            className={css.addButton}
            onClick={handleAdd}
          />
        </Row>
    </div>
  

  );
};

export default AddIngredient;
