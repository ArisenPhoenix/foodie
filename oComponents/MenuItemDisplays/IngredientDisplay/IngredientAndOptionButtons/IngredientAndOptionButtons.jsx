import css from "./IngredientAndOptionButtons.module.css";
import IngredientActionButtons from "../../../Buttons/IngredientActionButtons/IngredientActionButtons";
import { useState, useContext } from "react";
import FoodContext from "../../../../store/food-context";
import Input from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/INPUT_LABEL"
import { Col, Row } from "react-bootstrap";
import PostButton from "../../../UI/Button/PostButton/PostButton"
import Modal from "../../../UI/Modal/Modal0";
import USER_CONTEXT from "../../../../Merkurial/store/Context/USER_CONTEXT/user_context";

const IngredientAndActionButtons = (props) => {
  const foodCtx = useContext(FoodContext);
  const userCtx = useContext(USER_CONTEXT)

  const [edit, setEdit] = useState("cancel");
  const orPrice = props.price
  const orIngredient = props.ingredient
  const orMeasurement = props.measurement

  const [newPrice, setNewPrice] = useState(props.price);
  const [newIngredient, setNewIngredient] = useState(props.ingredient);

  const [newMeasurement, setNewMeasurement] = useState(props.measurement)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const verifyUpdate = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const editHandler = () => {
    if (edit === "edit") {
      setEdit("cancel");
    } else {
      setEdit("edit");
    }
  };

  const updateHandler = async () => {
    setEdit("cancel");
    setShowUpdateModal(false);
    const UPDATE_INGREDIENT = foodCtx.UPDATE_INGREDIENT
    const updateResponse = await UPDATE_INGREDIENT(props.id, newIngredient, newMeasurement, +newPrice, props.uid)
    console.log("UPDATE RESPONSE: ", updateResponse)

  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    name === "newIngredient" && setNewIngredient(value);
    name === "newPrice" && setNewPrice(value);
  };

  const verifyDelete = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteHandler = async () => {
    const DELETE_INGREDIENT = foodCtx.DELETE_INGREDIENT
    setShowDeleteModal(false);
    console.log("Deleting Ingredient: ", props.ingredient)
    const delResponse = await DELETE_INGREDIENT(props.id, props.ingredient, props.measurement, +props.price, props.uid)
    console.log("DELETE INGREDIENT RESPONSE: ", delResponse)

  };

  return (
    <div
      className={
        props.index === 0 || props.index === 1
          ? props.index % 2 === 0
            ? `${css.fullDiv} ${css.separate1}`
            : `${css.fullDiv} ${css.separate1} ${css.partition}`
          : props.index % 2 === 0
          ? `${css.fullDiv} ${css.separate2}  ${css.partition}`
          : `${css.fullDiv} ${css.separate1} ${css.partition}`
      }
    >
      <Modal
        show={showDeleteModal}
        title="Warning!"
        message={`Are You Sure You Want To Delete ${orIngredient} for ${foodCtx.currency}${orPrice}?`}
        okayButton="Delete"
        closeButton="Cancel"
        handleNo={closeDeleteModal}
        handleYes={deleteHandler}
      />

      <Modal
        show={showUpdateModal}
        title="Warning!"
        message={`Are You Sure You Want To Update ${orIngredient} at ${foodCtx.currency}${orPrice} to ${newIngredient} ${foodCtx.currency}${newPrice}?`}
        okayButton="Update"
        closeButton="Cancel"
        handleNo={closeUpdateModal}
        handleYes={updateHandler}
      />
      {edit === "cancel" ? (
        <table className={`${css.table}`}>
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td className={css.td}>
                <div className={css.displayTextContainer}>
                  <p className={css.p}>
                    {orIngredient}
                    </p>
                </div>
              </td>
              
              <td className={css.td}>
                <div className={css.displayTextContainer}>
                  <p className={css.p}>
                    {userCtx.userData.currency}
                    {orPrice}
                  </p>
                </div>
              </td>
              
              <td className={css.td}>
                <div className={css.displayTextContainer}>
                  <p className={css.p}>
                    {orMeasurement}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <>
          <Row>
            <Col xs="5" sm="4">
              <Input
                input={{
                  text: "Ingredient",
                  name: "newIngredient",
                  placeholder: "new ingredient...",
                  id: "AddNewIngredientInput",
                  className: css.ingredientInput,
                  value: newIngredient,
                  onChange: handleChange,
                }}
              />
            </Col>
            <Col xs="4" sm="4" md="4">
              <Input
                input={{
                  type: "number",
                  name: "newPrice",
                  text: "Price",
                  placeholder: "price...",
                  id: "AddNewPriceInput",
                  className: css.priceInput,
                  value: newPrice,
                  onChange: handleChange,
                }}
              />
            </Col>
            <Col xs="2" sm="4" md="4">
              <PostButton
                text="Update"
                className={css.addButton}
                onClick={verifyUpdate}
              />
            </Col>
          </Row>
        </>
      )}
      <div className={css.actionDiv}>
        <IngredientActionButtons
          data={props}
          editValue={edit === "edit" ? "Cancel" : "Edit"}
          deleteValue="Delete"
          onEdit={editHandler}
          onDelete={verifyDelete}
          className={css.actionButtons}
        />
      </div>
      <hr className={css.hr}></hr>
    </div>
  );
};

export default IngredientAndActionButtons;
