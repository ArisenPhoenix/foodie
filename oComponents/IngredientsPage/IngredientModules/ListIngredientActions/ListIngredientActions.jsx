import { Fragment, useState, useContext, useEffect } from "react";
import css from "./ListIngredientActions.module.css";
import IngredientDisplay from "../IngredientDisplay/IngredientDisplay";
import AddIngredient from "../../AddIngredient/AddIngredient";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import {
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
} from "../../../../Helpers/GeneralPurpose/Lists/lists";
import { Col } from "react-bootstrap";
import AuthContext from "../../../../store/auth-context";

const ListIngredientActions = (props) => {
  const authCtx = useContext(AuthContext);
  const [ingredients, setIngredients] = useState(props.ingredients);

  const addIngredientLocally = async (ingredient) => {
    const r = await ADD_LIST_ITEM(setIngredients, ingredient, "name");
    return r;
  };

  const deleteIngredientLocally = (id) => {
    console.log("REMOVING INGREDIENT by id: ", id);
    DELETE_LIST_ITEM(setIngredients, id);
    authCtx.getDbUpdate();
  };

  const updateIngredientLocally = (ingredient, id) => {
    setIngredients((prev) => {
      prev.splice(id, 1, ingredient);
      prev.sort((a, b) => {
        var textA = a.ingredient.name;
        var textB = b.ingredient.name;
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      return [...prev];
    });
    authCtx.getDbUpdate();
  };

  useEffect(() => {
    setIngredients(props.ingredients);
  }, [props.ingredients]);

  let dependencies = ingredients;
  if (typeof ingredients === "undefined" || !ingredients.ingredient) {
    dependencies = [];
  }
  return (
    <Fragment>
      <BootStrapGridder>
        <AddIngredient addIngredientToList={addIngredientLocally} />
        {ingredients &&
        ingredients.length > 0 &&
        ingredients[0].ingredient &&
        ingredients[0].ingredient.name ? (
          ingredients
            .sort((a, b) => {
              var textA = a.ingredient.name;
              var textB = b.ingredient.name;
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((ingredient_data, index) => {
              return (
                <Col xs="12" sm="6" key={`${index}||${ingredient_data._id}`}>
                  <IngredientDisplay
                    deleteIngredientAfterDelete={deleteIngredientLocally}
                    updateIngredientItem={updateIngredientLocally}
                    index={index}
                    ingredient={
                      ingredient_data.ingredient &&
                      ingredient_data.ingredient.name
                        ? ingredient_data.ingredient.name
                        : null
                    }
                    price={ingredient_data.ingredient.price}
                    key={ingredient_data._id}
                    _id={ingredient_data._id}
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
    </Fragment>
  );
};

export default ListIngredientActions;
