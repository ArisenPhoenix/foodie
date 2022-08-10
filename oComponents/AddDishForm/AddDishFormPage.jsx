import { Fragment } from "react";
import Form from "./Components/Form/Form";

const AddNewDish = (props) => {
  return (
    <Fragment>
      <Form dishes={props.dishes} />
    </Fragment>
  );
};

export default AddNewDish;
