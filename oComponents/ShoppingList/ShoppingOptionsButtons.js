import { Fragment } from "react"
import { SimpleButton } from "../../Merkurial/Components/UI/Buttons/Button"
import { useClass } from "../../Merkurial/hooks/usehooks"
import css from "./ShoppingOptionsButtons.module.css"


const ShoppingOptionButtons = (props) => {
    const buttons = props.buttons
    const displayButtons = props.displayButtons
    const toggleDisplayButtons = props.toggleDisplayButtons
    const divClasses = useClass([css.container, props.className])
    const buttonsClass = props.buttonsClass
    

    return (
        <div className={divClasses}>
            {displayButtons ? 
                <>
                    {buttons.map((button, index) => {
                        return (
                            <Fragment key={`Grocery Option Button | ${button.name} | ${index}`}>
                                {
                                    button.condition && <SimpleButton
                                        text={button.text} 
                                        onClick={button.callback} 
                                        name={button.name} 
                                        id={button.name} 
                                        className={buttonsClass}
                                        />
                                }
                            </Fragment>
                        )
                        
                    })}
                </>
            : <SimpleButton onClick={toggleDisplayButtons} text={props.displayButtonText} className={`${buttonsClass}`}/>   
            }
        </div>
    )


}

export default ShoppingOptionButtons