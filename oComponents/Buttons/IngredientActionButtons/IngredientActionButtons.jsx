import css from "./IngredientActionButtons.module.css";
import PostButton from "../../UI/Button/PostButton/PostButton";

const IngredientActionButtons = (props) => {
  const classes = `${props.className} ${css.mainDiv}`;
  const editClass = props.editValue === "Edit" ? css.edit : css.edit2;
  return (
    <div className={classes}>
      <div className={css.mainDiv}>
        <PostButton
          text={props.deleteValue}
          onClick={props.onDelete}
          className={css.delete}
        />
        <PostButton
          text={props.editValue}
          onClick={props.onEdit}
          className={editClass}
        />
      </div>
    </div>
  );
};

export default IngredientActionButtons;
