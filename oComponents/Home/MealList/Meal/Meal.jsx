import { Fragment } from "react";
import EntreeList from "./EntreeList/EntreeList";
import BootStrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import { TitleFy } from "../../../../Helpers/GeneralPurpose/Strings";

const Meal = (props) => {
  const { entrees, sides, dish, headers, show } = props.mealModuleClasses;
  return (
    <Fragment>
      {show.meals && typeof props.meal !== "undefined" && (
        <PageSection section={TitleFy(props.meal)} />
      )}

      <BootStrapGridder>
        <Col md="6">
          <EntreeList
            setCurrentMeal={props.setCurrentMeal}
            meal={props.meal}
            showMealType={show.mealType}
            entreeClasses={entrees}
            dishType="entree"
            dishClasses={dish}
            entrees={props.entrees}
            key={`EntreeList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
        <Col md="6">
          <EntreeList
            setCurrentMeal={props.setCurrentMeal}
            meal={props.meal}
            showMealType={show.mealType}
            show={show}
            sideClasses={sides}
            dishType="side"
            dishClasses={dish}
            entrees={props.sides}
            key={`SideList ${Math.random()}`}
            deleteDish={props.deleteDish}
          />
        </Col>
      </BootStrapGridder>
    </Fragment>
  );
};

export default Meal;
