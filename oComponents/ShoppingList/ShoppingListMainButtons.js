import css from "./ShoppingListMainButtons.module.css"
import { SimpleButton } from "../../Merkurial/Components/UI/Buttons/Button"
import HEADING from "../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING"

const ShoppingListMainButtons = (props) => {
    const mainText = props.mainText
    const getNewSchedule = props.getNewSchedule

    return (
        <div className={css.container}>
            <SimpleButton text="Print Plan" onClick={() => {print()}} className={css.left}/>
            <HEADING text={mainText} className={css.center} />
            <SimpleButton text="New Schedule" onClick={getNewSchedule} className={css.right}/>
        </div>

    )
}


export default ShoppingListMainButtons