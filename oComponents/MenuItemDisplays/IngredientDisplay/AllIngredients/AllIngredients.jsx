import { useContext, useEffect, useState } from "react";
import css from "./AllIngredients.module.css";
import IngredientAndOptionButtons from "../IngredientAndOptionButtons/IngredientAndOptionButtons";
import BootStrapGridder from "../../../../Merkurial/Components/UI/BootStrap/BootStrapGridder";
import { Col } from "react-bootstrap";
import FoodContext from "../../../../store/food-context";
import USER_CONTEXT from "../../../../Merkurial/store/Context/USER_CONTEXT/user_context";
import AddIngredient from "../AddIngredient/AddIngredient";


const measurementFiller = "measurement..."

const AllIngredients = (props) => {
  const foodCtx = useContext(FoodContext)
  const allMeasurements = foodCtx.allMeasurements
  const userCtx = useContext(USER_CONTEXT)
  const { currency } = userCtx.userData
  const allIngredients = foodCtx.allIngredients
  const [measurementOptions, setMeasurementOptions] = useState([])


  const ADD_INGREDIENT = async (ingredient, measurement, price) => {
    const res = await foodCtx.ADD_INGREDIENT(ingredient, measurement, price)
    if (res){
      return true
    }
    return false
  }


  useEffect(() => {
    
    if (allMeasurements.length > 0){
      const allMeasures = allMeasurements.map(measurement => measurement.measurement)

      allMeasures.unshift(measurementFiller)
      console.log("ALL MEASURES: ", allMeasures)
      setMeasurementOptions(allMeasures)
    }
  }, [allMeasurements])

  return (
    <>

     <BootStrapGridder fluid>
        <AddIngredient AddIngredient={ADD_INGREDIENT} measurementOptions={measurementOptions} currency={currency}/>
        { allIngredients &&
        allIngredients.length > 0 &&
        allIngredients[0].ingredient ? (
          allIngredients
            .sort((a, b) => {
              var textA = a.ingredient;
              var textB = b.ingredient;
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            }) 
            .map((ingredientData, index) => {
              return (
                <Col xs="12" sm="6" key={`${index}||${ingredientData.ingredient}`}>
                  <IngredientAndOptionButtons
                    deleteIngredientAfterDelete={() => {}}
                    updateIngredientItem={() => {}}
                    index={index}
                    ingredient={ingredientData.ingredient}
                    price={ingredientData.price}
                    measurement={ingredientData.measurement}
                    number={ingredientData.number}
                    key={ingredientData.iid}
                    id={ingredientData.iid}
                    uid={ingredientData.uid}
                  />
                </Col>
              );
            })
        ) : (
          <p className={css.noIngredients}>
            Add an ingredient so this message will go away...
          </p>
        )}
      </BootStrapGridder>
    
    </>
  );
};

export default AllIngredients;
