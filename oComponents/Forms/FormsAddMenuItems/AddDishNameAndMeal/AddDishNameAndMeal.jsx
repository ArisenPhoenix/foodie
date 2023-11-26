import css from "./AddDishNameAndMeal.module.css"
import { Col, Row } from "react-bootstrap"
import Label from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Labels/Label"
import Input from "../../../../Merkurial/Components/UI/Basics/INPUT_LABEL/Inputs/Input"
import SELECTION from "../../../../Merkurial/Components/UI/Basics/SELECTION/SELECTION"


export const AddDishName = (props) => {
    return (
        <>
        <Label text="Dish" id="dishName" name="dishName-label" />
        <br></br>
        <Input 
            className={css.dishInput} 
            placeholder="Masterpiece..."
            id="dishName"
            name="dishName"
            onChange={props.onChange}
            value={props.value}
        />
        </>
    )
}

export const AddMealName = (props) => {
    return (
        <SELECTION
            className={css.mealDiv}
            selectClass={css.mealInput}
            choose={false}
            text="Meal"
            onChange={props.onChange}
            options={props.options}
            htmlSize={100}
            value={props.value}
            id="mealName"
            name="mealName"
        />
    )
}


const AddDishNameAndMeal = (props) => {
    const {} = props
    return (
        <Row>
            <Col md="6">
            <AddDishName value={props.dishValue} onChange={props.onChange} />
            </Col>
            <Col md="6">
            <AddMealName value={props.mealValue} onChange={props.onChange} options={props.options}/>
            </Col>
            
        </Row>
    )
}

export default AddDishNameAndMeal
