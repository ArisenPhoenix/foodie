import { useRouter } from "next/router";
import SUB_HEADING from "../../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import DishList from "../../../DishDisplay/DishList/DishList"
import BootStrapGridder from "../../../../../Merkurial/Components/UI/BootStrap/BootStrapGridder";
import { Col } from "react-bootstrap";
import { TitleFy } from "../../../../../Merkurial/Helpers/Links/Linkify";

const Meal = (props) => {
  const router = useRouter()
  const mealName = props.mealName && props.mealName !== "" ? props.mealName : router.query.meal
  const { entrees: entreeClasses, sides: sideClasses, dish: dishClasses, headers, show } = props.mealModuleClasses;


  return (
    <>
      {mealName && (
        <SUB_HEADING text={TitleFy(mealName)} />
      )}

      <BootStrapGridder fluid>
        <Col md="6">
          <DishList
            setCurrentMeal={props.setCurrentMeal}
            mealName={mealName}
            showDishType={show.mealType}
            dishType="entree"
            dishClasses={dishClasses}
            dishes={props.entrees}
            key={`EntreeList of ${mealName}}`}
            deleteDish={props.deleteDish} 
          />
        </Col>
        <Col md="6">
          <DishList
            setCurrentMeal={props.setCurrentMeal}
            mealName={mealName}
            showDishType={show.mealType}
            show={show}
            dishType="side"
            dishClasses={dishClasses}
            dishes={props.sides}
            key={`SideList of ${mealName}`}
            deleteDish={props.deleteDish}
          />
        </Col>
      </BootStrapGridder>
    </>
  );
};

export default Meal;
