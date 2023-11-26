import css from "./Ingredients.module.css";
import BootStrapGridder from "../../../../Merkurial/Components/UI/BootStrap/BootStrapGridder";
import Ingredient from "./Ingredient/Ingredient";
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";

const Ingredients = (props) => {
  return (
    <div
      className={`${css.ingredientsDiv} ${props.className}`}
      key={`Ingredient-Main-Div: ${Math.random()}`}
    >
      <SUB_HEADING
        className={css.title}
        text="Ingredients:"
        key={`SubSection: ${Math.random()}`}
      />
      <BootStrapGridder fluid="md" key={`Ingredient-Gridder: ${Math.random()}`}>
        {props.ingredients && props.ingredients?.length > 0 && props.ingredients.map((ingredient, index) => { 
          return (
            <Ingredient
              key={`Ingredient-Col-${Math.random()}`}
              ingredient={ingredient.ingredient}
              price={ingredient.price}
              id={ingredient.iid}
              index={index}
              uid={ingredient.uid}
            />
          );
        })}
      </BootStrapGridder> 
    </div>
  );
};

export default Ingredients;
