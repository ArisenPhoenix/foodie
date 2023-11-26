import { useEffect, useState } from "react";
import css from "./AddIngredients.module.css";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import { SimpleButton } from "../../../../Merkurial/Components/UI/Buttons/Button";
import SELECTION from "../../../../Merkurial/Components/UI/Basics/SELECTION/SELECTION";
import Label from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Labels/Label";
import Input from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Inputs/Input";


const IngredientSelection = (props) => {
  const textOptions = props.ingredientOptions.map((option) => {
    return option.ingredient
  })
  !textOptions.includes("-") && textOptions.unshift("-")
  return (
        <SELECTION
            className={css.selectDiv}
            selectClass={css.ingredientSelect}
            choose={false}
            text="Ingredient"
            onChange={props.handleChange}
            options={textOptions}
            htmlSize={100}
            value={props.value}
            id="ingredients"
            name="ingredients"
        />
  )
} 


const IngredientNumberInput = (props) => {
  return (
    <>
    <div className={css.numberDiv}>
    
      <Input 
        placeholder="number"
        type="number"
        value={props.value}
        id="number"
        name="number" 
        min="1"
        onChange={props.handleChange}
        className={css.numberInput}
      />
    </div>
      </>
  )
}


const AddIngredientButton = (props) => {
  return (
      <div className={`${css.buttonDiv}`}>
        <SimpleButton
            className={css.button}
            id={props.id}
            text="+"
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
          />
      </div>
  )
}



const AddIngredientsToDish = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState([])
  useEffect(() => {
    const newIngredients = [...props.ingredientOptions]
    newIngredients.sort((a, b) => {
      var textA = a.ingredient;
      var textB = b.ingredient;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    }) 
    setIngredientOptions(newIngredients)
  }, [props.ingredientOptions])

  const [number, setNumber] = useState(1);
  const [chosenIngredient, setChosenIngredient] = useState({})
 
  const addIngredient = (e) => {
    e.preventDefault()

    if (chosenIngredient.ingredient === "Choose" || chosenIngredient.ingredient === "" || chosenIngredient.ingredient == "-") {
      props.setIngredientError("You First Need To Choose An Ingredient");
      return;
    } 

    if (chosenIngredient.number === "" || chosenIngredient.number === NaN || chosenIngredient.number < 1) {
      props.setIngredientError(
        "You Must First Enter The Number Needed For This Ingredient"
      );
      return;
    }
    props.appendToChosenIngredients({name: chosenIngredient, number: number});
  };


  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    name === "number" && setNumber(+value);

    if (name === "ingredients") {
      // console.log("Ingredient Options: ", ingredientOptions)
      if (ingredientOptions){
        for (let option of ingredientOptions){
          if (option.ingredient === value){
            if (option !== "Choose" && option !== "-"){
              setChosenIngredient(value)
            } else {
              setChosenIngredient(value)
            }
            
          }
        }
      }

    }
    props.onChange(e)
  };

  const xs = "12"
  const md = "6"

  return (

    <Row sm="12" md="12" className={css.row}>
        <Col xs={xs} md={md} fluid="true">
          <IngredientSelection 
            value={chosenIngredient} 
            ingredientOptions={ingredientOptions} 
            appendToChosenIngredients={props.appendToChosenIngredients} 
            handleChange={handleChange} 
          />
        </Col>

        <Col xs="12" md="6" className={css.numberCol}>
        <Label text="Number" name="number" className={css.numberLabelClass}/>
        
          <div className={css.numberAndButtonDiv}>
          
            <IngredientNumberInput
                value={number} 
                handleChange={handleChange} 
              />

            <AddIngredientButton 
              onClick={addIngredient} 
              id={props.buttonId} 
            />

          </div>
        </Col>
      </Row>
  );
};

export default AddIngredientsToDish;
