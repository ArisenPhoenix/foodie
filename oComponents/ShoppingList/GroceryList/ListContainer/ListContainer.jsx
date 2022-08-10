import css from "./ListContainer.module.css";

const ListContainer = (props) => {
  return (
    <tbody className={css.tbody}>
      {props.list.map((ingredient, index) => {
        return (
          <ToBuy
            key={data[ingredient]._id}
            line={index + 1}
            id={data[ingredient]._id}
            ingredient={data[ingredient].ingredient}
            price={data[ingredient].price}
            number={data[ingredient].number}
          />
        );
      })}
    </tbody>
  );
};

export default ListContainer;
