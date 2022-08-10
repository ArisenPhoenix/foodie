import css from "./IngredientPrice.module.css";
// import Label from "../../UI/Label/Label";
import Input from "../../../UI/Input/Input";

const IngredientPrice = (props) => {
  return (
    <Input
      input={{
        placeholder: "Price",
        id: "price",
        name: "price",
        value: props.value,
        onChange: props.onChange,
        type: "number",
        onKeyDown: props.onKeyDown,
      }}
      label={{
        label: props.label,
        id: "price",
        name: "price-label",
      }}
    />
  );
};

export default IngredientPrice;
