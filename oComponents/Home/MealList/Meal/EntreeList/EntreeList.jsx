import { useRouter } from "next/router";
import Entree from "./Entree/Entree";
import PageSubSectionHeader from "../../../../BasicPageComponents/PageSubSectionHeader/PageSubSectionHeader";
import { TitleFy } from "../../../../../Helpers/GeneralPurpose/Strings";

const EntreeList = (props) => {
  const router = useRouter();
  const text = "Entree";

  return (
    <div key={Math.random() + Math.random()}>
      <PageSubSectionHeader
        text={props.showMealType && TitleFy(props.dishType)}
      />

      {props.entrees &&
        props.entrees.map((entree, index) => {
          return (
            <div key={`EntreeList Div: ${Math.random()} * ${Math.random()}`}>
              {
                <Entree
                  index={index}
                  access="access"
                  showMealType={props.showMealType}
                  setCurrentMeal={props.setCurrentMeal}
                  meal={props.meal}
                  dishType={props.dishType}
                  id={entree._id}
                  showMeals={props.showMeals}
                  entree={entree.dish}
                  ingredients={entree.ingredients}
                  instructions={entree.instructions}
                  key={`Entree ${Math.random()}`}
                />
              }
            </div>
          );
        })}
    </div>
  );
};

export default EntreeList;
