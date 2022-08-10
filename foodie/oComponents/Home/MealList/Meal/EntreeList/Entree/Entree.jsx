import css from "./Entree.module.css";
import Ingredients from "../../../Ingredients/Ingredients";
import Card from "../../../../../UI/Card/Card";
import PageSubSection from "../../../../../BasicPageComponents/PageSubSection/PageSubSection";
import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import FoodContext from "../../../../../../store/food-context";
import {
  TitleFy,
  kebabify,
} from "../../../../../../Helpers/GeneralPurpose/Strings";

const Entree = (props) => {
  const foodCtx = useContext(FoodContext);
  const router = useRouter();

  const getMeal = () => {
    const path = router.pathname;
    const mainPath = kebabify(props.meal, false);
    const subPath = kebabify(props.entree, false);
    if (path.toString() === "/menu") {
      router.push(`/menu/${mainPath}/${subPath}`);
    } else {
      router.push(`/menu/${mainPath}/${subPath}`);
    }
  };

  const getMealHandler = () => {
    if (props.access === "noAccess") {
      return;
    } else {
      foodCtx.setCurrentMeal({
        index: props.index,
        dishType: props.dishType,
        meal: props.meal,
        dish: props.entree,
        id: props.id,
        ingredients: props.ingredients,
        instructions: props.instructions,
      });

      getMeal();
    }
  };

  return (
    <Fragment>
      <Card
        id={props.id}
        onClick={props.access === "noAccess" ? null : getMealHandler}
        key={`IngredientCard ${Math.random() * Math.random()}`}
        className={`${css.card} `}
      >
        <div key={`IngredientDiv ${Math.random() * Math.random()}`}>
          <div className={css.heading}>
            <PageSubSection
              text={TitleFy(props.entree)}
              key={Math.random() * Math.random()}
            />
          </div>

          <Ingredients
            key={`Ingredients-Creation: ${Math.random()}`}
            ingredients={props.ingredients}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Entree;
