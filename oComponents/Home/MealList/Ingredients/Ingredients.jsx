import css from "./Ingredients.module.css";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Ingredient from "./Ingredient/Ingredient";
import SubSection from "../../../BasicPageComponents/SubSection/SubSection";

const Ingredients = (props) => {
  return (
    <div
      className={`${css.ingredientsDiv} ${props.className}`}
      key={`Ingredient-Main-Div: ${Math.random()}`}
    >
      <SubSection
        className={css.title}
        text="Ingredients:"
        key={`SubSection: ${Math.random()}`}
      />
      <BootStrapGridder fluid="md" key={`Ingredient-Gridder: ${Math.random()}`}>
        {props.ingredients.map((ingredient, index) => {
          return (
            <Ingredient
              key={`Ingredient-Col-${Math.random()}`}
              ingredient={ingredient.ingredient}
              price={ingredient.price}
              id={ingredient._id}
              number={index + 1}
            />
          );
        })}
      </BootStrapGridder>
    </div>
  );
};

export default Ingredients;
