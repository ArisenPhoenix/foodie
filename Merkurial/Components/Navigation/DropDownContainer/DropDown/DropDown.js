import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import css from "./DropDown.module.css"
import NavItem from "../../NAV/NavItem/NavItem"
import { useClass } from "../../../../hooks/usehooks"
import OutsideAlerter from "../../../../hooks/useOutsideAlerter"
import { getTransition } from "../../NAV/NavHelpers"
import { verifyWidthHeightForCss } from "../../NAV/NavHelpers"
import { determineAcess } from "../../NAV/NavHelpers"
import { linkify } from "../../../../Helpers/Text/text"
import { DEFAULT_PROP } from "../../../../Helpers/Verifications/Validations"
import { useContext } from "react"
import NAVIGATION_CONTEXT from "../../../../store/Context/MERKURIAL_CONTEXT/navigation_context"

/**
 * @param {icon} props
 * @param {string} height - css style property
 * @param {string} color - css style property
 */

const DropDown = (props) => {
    const navCtx = useContext(NAVIGATION_CONTEXT)
    const {navStyles} = navCtx
    const {dropDownNavItem} = navStyles

    const {width: navWidth} = dropDownNavItem
    
    const left = props.left ? props.left : []
    const center = props.center ? props.center : []
    const right = props.right ? props.right : []
    const dropDowns = props.dropDowns ? props.dropDowns : []
    const navItems = [...left, ...center, ...right, ...dropDowns]
    const transition = props.transition && getTransition(props.transition)
    const classes = useClass([css.dropDownMain, css.radiusXxsI, props.className, transition])
    const {isAdmin, isUser, height} = props

    const bgColor = DEFAULT_PROP(props.bgColor, "black")
    return (
        <> 
            {navItems.length > 1 &&
                <main className={classes} style={{backgroundColor: bgColor, width: "100%"}}>
                    {navItems.map((navItem, index) => {
                        const keyInfo = navItem.name ? navItem.name : navItem.id ? navItem.id : Math.random()
                        const key = `${index}|${keyInfo}`
                        const href = navItem.href ? navItem.href : linkify(navItem.text)
                        const hasAccess = determineAcess(isUser, isAdmin, navItem.requiresUser, navItem.requiresAdmin, navItem.requiresLogin, navItem.isPublic)
                        {
                            return hasAccess && 
                            (
                                <NavItem key={key}
                                    text={navItem.text} 
                                    isMobile={true}
                                    height={height/2}
                                    width={navWidth}
                                    borders={navItem.border}
                                    setCurrentPage={props.setCurrentPage}
                                    href={href}
                                />
                            )
                        }
                    })}
                </main>
            }
        </>
    )
}

export default DropDown

/**
 * @param {icon} props
 * @param {string} height - css style property
 * @param {string} color - css style property
 */ 
 
export const DropDownButton = (props) => {
    const transition = getTransition(props.transition)
    const [width, height] = verifyWidthHeightForCss(props.width, props.height);
    const pos = props.position && props.position === "left" ? css.left : props.position === "right" ? css.right : css.center
    const classes = useClass([transition, props.className, pos])

    return (
        <OutsideAlerter setToFalse={props.setIsDropped} className={classes}>
            <div onClick={props.onClick} className={classes}>
                <FontAwesomeIcon
                    icon={faBars}
                    style={{
                        width: width,
                        height: height,
                        color: props.bg ? props.bg : "antiquewhite",
                    }}
                />
            </div>
        </OutsideAlerter>
        )
}
