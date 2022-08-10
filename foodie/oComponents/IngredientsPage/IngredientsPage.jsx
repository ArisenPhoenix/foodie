import { Fragment } from "react";
import ListIngredientActions from "./IngredientModules/ListIngredientActions/ListIngredientActions";

const IngredientsPage = (props) => {
  return (
    <Fragment>
      <ListIngredientActions ingredients={props.ingredients} />
    </Fragment>
  );
};

export default IngredientsPage;
