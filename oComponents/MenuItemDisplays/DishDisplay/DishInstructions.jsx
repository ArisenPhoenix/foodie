import Card from "../../UI/Card/Card";
import css from "./DishInstructions.module.css";

const DishInstructions = (props) => {
  const instructions = props.details;
  return (
    <>
      <h5 className={css.text}>Instructions:</h5>
      <Card className={css.card}>
        <p id={Math.random()}>{instructions}</p>
      </Card>
    </>
  ); 
};

export default DishInstructions;
