import css from "./MealType.module.css"
import Radial from "../../UI/Radials/Radial"
import { Col, Row } from "react-bootstrap"



const MealType = (props) => {
    const dishIsEntree = props.dishIsEntree
    const handleChange = props.handleChange
    console.log("MEAL TYPE IS ENTREE: ", dishIsEntree)

    const changeHandler = (e) => {
        e.preventDefault()
        console.log("E: ", e)
        const name = e.target.name
        const value = e.target.value
        console.log("Name: ", name, " Value: ", value)
        // handleChange(e)
    }

    return (
        <div className={css.radials} name="dishType" id="dishType">
            <Row>
                <Col xs="12" md="6">
                    <Radial
                        value={dishIsEntree}
                        text="Entree"
                        id="dishType"
                        name="dishType"
                        onChange={changeHandler}
                        onClick={changeHandler}
                        checked={dishIsEntree}
                    />
                </Col>

                <Col xs="12" md="6">
                    <Radial
                        value={dishIsEntree}
                        text="Side"
                        id="dishType"
                        name="dishType"
                        onChange={changeHandler}
                        onClick={changeHandler}
                        checked={dishIsEntree}
                    />
                </Col>
            </Row>
        </div>
    )
}


export default MealType