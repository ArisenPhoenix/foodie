// import { useContext} from "react";
import css from "./FormIngredients.module.css";
import BootstrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import Button from "../../../UI/Button/PostButton/PostButton";
import Label from "../../../UI/Label/Label";
// import SelectIngredientForDish from "../../../MenuItemDisplays/IngredientDisplay/SelectIngredient/SelectIngredientForDish"
import INPUT_LABEL from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/INPUT_LABEL";


const AddIngredientToDish = (props) => {
  return (
    <div>
      <div className={css.labelDiv}>
        <Label
          text="Add Ingredient" 
          className={`btn form-control  ${css.mainLabel}`}
        />
      </div>
      <BootstrapGridder>
        <Col xs="12" md="5">
          {/* <SelectIngredientForDish
            options={listIngredients}
            choose={false}
            label="Meal"
            labelClass={css.label}
            optionClass={css.selectorsOptions}
            className={css.selectLeft}
            onChange={props.onChange}
            htmlSize={100}
            value={meal}
            id="meal"
            name="meal"
            bsPrefix={css.selectPrefix}
          /> */}
        </Col>
        <Col>
          <INPUT_LABEL
            input={{
              label: "number",
              text: "number",
              type: "number",
              id: "number",
              name: "number",
              separate: "true",
              onChange: props.onChange,
            }}
            onChange={props.onChange}
          />
        </Col>
        
        <Col>
        
          <Button
            id={props.buttonId}
            onClick={props.onClick}
            text="+"
            type="button"
            className={`btn btn-primary ${css.button}`}
            onKeyDown={props.onKeyDown}
          />
        </Col>
      </BootstrapGridder>



      {/* {props.ingredients.length > 0 ? ( */}
        <div className={css.ingredientsDiv}>
          {/* <TABLE data={props.ingredients}/> */}
          {/* <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Ingredient Price Header">
                <th className={css.th}>Ingredients</th>
                <th className={css.th}>Prices</th>
                <th className={css.th}>Number</th>
              </tr> 
              {props.ingredients.map((ingredient, index) => {
                return (
                  <IngredientDisplay 
                    onClick={deleter}
                    index={index}
                    key={`${ingredient._id} | ${index}`}
                    id={ingredient.id}
                    line={index + 1}
                    price={ingredient.price}
                    number={ingredient.number ? ingredient.number : 1}
                    ingredient={ingredient.ingredient}
                    hide={true}
                  />
                );
              })}
            </tbody>
          </table> */}
        </div>
      {/* // ) : null} */}
    </div>
  );
};

export default AddIngredientToDish;
