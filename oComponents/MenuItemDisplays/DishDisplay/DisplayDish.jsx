import css from "./Dish.module.css";
import Card from "../../../Merkurial/Components/UI/Cards/Card"
import DishIngredients from "./DishIngredients";
import DishInstructions from "./DishInstructions";
import SECTION from "../../../Merkurial/Components/UI/SectionHeaders/Sections/Section";
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import { TitleFy } from "../../../Merkurial/Helpers/Text/text";

const DisplayDish = (props) => {
  const {
    dishName: currentDishName,
    dishType: currentDishType,
    chosenIngredients: currentChosenIngredients, 
    details: currentDetails,
    UpdateButtons
  } = props

  return (
    <Card className={css.mainCard}>
      <HEADING text={TitleFy(currentDishType)} />
      <SECTION text={currentDishName} />
        <Card className={css.card}>
          <DishIngredients ingredients={currentChosenIngredients} />
          <DishInstructions details={currentDetails} />
        </Card>
        {UpdateButtons && <UpdateButtons />}
    </Card>
  ); 
};

export default DisplayDish;
  