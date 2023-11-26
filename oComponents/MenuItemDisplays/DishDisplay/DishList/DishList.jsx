import { useRouter } from "next/router";
import Dish from "./Dish/Dish"
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import { TitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";

const DishList = (props) => {
  const { mealName: meal, dishes } = props 
  const router = useRouter();
  const mealName = meal ? meal : router.query.meal
  const mealIdString = "mid"

  return (
    <div key={Math.random() + Math.random()}>
      <SUB_HEADING
        text={props.dishType && TitleFy(props.dishType)+"s"}
      /> 

      {dishes && Array.isArray(dishes) && dishes.length > 0 &&
        dishes.map((dish, index) => {
          const dishName = dish.dish

          return ( 
            <div key={`DishList ${mealName} | ${dish.is_entree ? "Entree" : "Side"}: ${dishName} | ${index}`}>
              {
                <Dish
                  index={index}
                  mealName={mealName}
                  dishType={props.dishType}
                  did={dish[mealIdString]}
                  entree={dish.is_entree}
                  dishName={dishName}
                  ingredients={dish.ingredients ? dish.ingredients : []}
                  details={dish.details}
                  key={`Dish ${dish[mealIdString]}`}
                  ingredients_ids={dish.ingredients_ids}
                  ingredients_uids={dish.ingredients_uids}
                  ingredients_numbers={dish.ingredients_numbers}
                />
              }
            </div>
          );
        })}
    </div>
  );
};

export default DishList;
