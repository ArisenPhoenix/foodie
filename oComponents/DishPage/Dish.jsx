import css from "./Dish.module.css";
import Card from "../UI/Card/Card";
import PageTitle from "../BasicPageComponents/PageTitle/PageTitle";
import DishIngredients from "./DishIngredients";
import DishInstructions from "./DishInstructions";

const Dish = (props) => {
  return (
    <Card className={css.mainCard}>
      <PageTitle title={props.entree} />
      <Card>
        <Card className={css.card}>
          <DishIngredients ingredients={props.ingredients} />
          <DishInstructions instructions={props.instructions} />
        </Card>
      </Card>
    </Card>
  );
};

export default Dish;
