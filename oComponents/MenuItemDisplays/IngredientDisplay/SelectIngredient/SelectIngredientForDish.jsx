import css from "./SelectIngredient.module.css";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const choose = {ingredient: "-", iid: -1, instructions: "", number: -1, is_entree: null, ingredients: []}
const SelectIngredient = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState(props.ingredientOptions);

  useEffect(() => {
    if (props.ingredientOptions &&
      props.ingredientOptions.length > 0){
        const data = props.ingredientOptions.sort((a, b) => {
          var textA = a.ingredient;
          var textB = b.ingredient;
          return textA < textB ? -1 : textA > textB ? 1 : 0;
          
        })
        if (data){
          if (data[0].ingredient != "-"){
            data.splice(0, 0, choose)
          }
          
          setIngredientOptions(data)
        }
      }
    
  }, [ingredientOptions])
  const changeHandler = (e) => {
    props.onChange(e);
  };


  return (
    <>
      <Form.Select
        aria-label="Selection"
        className={`${css.select} form-select2`}
        onChange={changeHandler}
        id={props.id}
        name={props.name}
        value={props.value}
      >
          {ingredientOptions.map((ingredientOption, index) => {
            return (
              <option
                key={`${ingredientOption.iid}|${index}-${Math.random() * Math.random()}`}
                className={
                  `${css.text} 
                  ${index === ingredientOptions.length - 1
                  ? `${css.finalOption} `
                  : null} ${css.optionClass}`
                }
                value={ingredientOption.ingredient === "-" ? "-" : ingredientOption.ingredient}
                id={`${props.iid}`}
              >
                {ingredientOption.ingredient === "-" ? "-" : ingredientOption.ingredient}
              </option>
            );
          })}
      </Form.Select>
    </>
  );
};

export default SelectIngredient;
