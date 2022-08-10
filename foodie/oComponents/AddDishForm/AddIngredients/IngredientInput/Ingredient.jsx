import Input from "../../../UI/Input/Input";

const Ingredient = (props) => {
  return (
    <div>
      <Input
        input={{
          placeholder: "Ingredient",
          id: "ingredient",
          name: "ingredient",
          value: props.value,
          onChange: props.onChange,
          onKeyDown: props.onKeyDown,
        }}
        label={{
          label: props.label,
          id: "ingredient",
          name: "ingredient-label",
        }}
      />
    </div>
  );
};

export default Ingredient;
