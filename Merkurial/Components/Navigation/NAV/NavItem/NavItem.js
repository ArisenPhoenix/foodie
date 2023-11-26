import { useRouter } from "next/router"
import { LINKIFY } from "../../../../Helpers/Links/Linkify"
import css from "./NavItem.module.css"
import { useClass } from "../../../../hooks/usehooks"
import { DEFAULT_PROP } from "../../../../Helpers/Verifications/Validations"
import { useContext } from "react"
import NAVIGATION_CONTEXT from "../../../../store/Context/MERKURIAL_CONTEXT/navigation_context"

const NavItem = (props) => {
    const navCtx = useContext(NAVIGATION_CONTEXT)
    const router = useRouter()
    const {navWidth, mobileBorder, navBorder, navStyles} = navCtx
    const {mobile, nav} = navStyles
    let {width: mobileWidth, height: mobileHeight} = mobile
    let {height: navHeight} = nav
    const isMobileCenter = props.isMobileCenter

    mobileWidth = DEFAULT_PROP(mobileWidth, "100%")
    mobileHeight = DEFAULT_PROP(mobileHeight, "4rem")

    const isMobile = props.isMobile
    const pos = props.position
    const loc = pos === "left" ? css.left : pos === "right" ? css.right : css.center
    const border = isMobile && mobileBorder ? css.mobileBorder : navBorder && css.border 

    const classes = !isMobile ? css.navItem : isMobileCenter ? "" : css.mobileNavItem

    const itemClass = useClass([loc, border, classes])
    const textClass = useClass([!isMobile ? css.navTextClass : css.mobileNavTextClass])

    const WIDTH = isMobile ? mobileWidth : navWidth
    const HEIGHT = isMobile ? mobileHeight : navHeight

    const height = DEFAULT_PROP(HEIGHT, "3rem")
    const width = DEFAULT_PROP(WIDTH, "7rem")
  
    const href = props.href ? props.href : LINKIFY(props.text)

    

    const handleClick = (e) => {
        e.preventDefault()
        props.setCurrentPage && props.setCurrentPage({text: props.text, href: props.href })

        // console.log("Current Path: ", router.asPath)
        if (props.href !== router.asPath){
            router.push(props.href)
        }
        
    }

    return (
            <li className={itemClass} style={{width: width, height: height}} onClick={handleClick}>
                <p className={textClass} style={{lineHeight: height}}>{props.text}</p>
            </li>
    )

}

export default NavItem