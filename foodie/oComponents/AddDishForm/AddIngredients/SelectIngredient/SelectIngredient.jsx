import css from "./SelectIngredient.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Label from "../../../UI/Label/Label";
import IngredientOption from "./IngredientOption/IngredientOption";

const SelectIngredient = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState(
    props.options &&
      props.options.length > 0 &&
      props.options[0].ingredient &&
      props.options[0].ingredient.name
      ? props.options.sort((a, b) => {
          var textA = a.ingredient.name;
          var textB = b.ingredient.name;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
      : []
  );

  if (ingredientOptions[0] !== "Choose") {
    setIngredientOptions((prev) => {
      return ["Choose", ...prev];
    });
  }

  // console.log("ingredientOptions: ", ingredientOptions);
  // console.log("ingredientOptions: ", props.options);
  const changeHandler = (e) => {
    props.onChange(e);
  };

  return (
    <>
      <Label
        text={props.label}
        className={props.labelClass}
        value={props.value}
      />
      <Form.Select
        aria-label="Selection"
        className={`${css.select} form-select2`}
        onChange={changeHandler}
        id={props.id}
        name={props.name}
        value={props.value}
      >
        {ingredientOptions.map((option, index) => {
          return (
            <IngredientOption
              key={`${option._id}|${index}-${Math.random() * Math.random()}`}
              option={option === "Choose" ? "Choose" : option.ingredient.name}
              optionClass={`${props.optionClass}`}
              className={
                index === props.options.length - 1
                  ? `${css.finalOption} `
                  : null
              }
              // onSelect={props.pullOut}
            />
          );
        })}
      </Form.Select>
    </>
  );
};

export default SelectIngredient;
