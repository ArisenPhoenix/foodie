import { SimpleButton } from "../../../Merkurial/Components/UI/Buttons/Button"
import css from "./NextPrevButtons.module.css"


const NextPrevButtons = (props) => {
    const back = props.back
    const next = props.next
    const leftClass = props.leftClass
    const rightClass = props.rightClass

    return (
        <div className={css.container}>
            <div className={`${css.div} ${props.className}`}>
                <SimpleButton text="<" className={`${css.leftSide} ${leftClass}`} onClick={back}/>
                <SimpleButton text=">" className={`${css.rightSide} ${rightClass}`} onClick={next}/>
            </div>
        </div>
        

    )
}



export default NextPrevButtons