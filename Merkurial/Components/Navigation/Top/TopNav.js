import css from "./TopNav.module.css"
import { useClass } from "../../../hooks/usehooks"
import Logo from "../NAV/Logo/Logo"
import useToggle from "../../../hooks/Toggle"
import DropDown, { DropDownButton } from "../DropDownContainer/DropDown/DropDown"
import { getRadius } from "../NAV/NavHelpers"
import NavItem from "../NAV/NavItem/NavItem"
import NavSection from "../NAV/NavSection/NavSection"
import { useContext } from "react"
import { determineAcess } from "../NAV/NavHelpers"
import { DEFAULT_PROP } from "../../../Helpers/Verifications/Validations"
import { centerNavs, leftNavs, navStyles, rightNavs } from "../../../../merkurialConfig"
import NAVIGATION_CONTEXT from "../../../store/Context/MERKURIAL_CONTEXT/navigation_context"
import { memo } from "react"
import { useWindow } from "../../../hooks/usehooks"
import AUTH_CONTEXT from "../../../store/Context/AUTH_CONTEXT/auth_context"

/** each dropDown item requires a position prop
 * @param {Object[]} left - for left side of nav @type {Object[]}
 * @param {Object[]} right - for right side of nav @type {Object[]}
 * @param {Object[]} dropDown - for dropdowns @type {Object[]}
 * @param {string} dropDowns.position - ex: position for left @type {string}
 * @param {boolean} isMobile - is the screen size determined to be mobile or not? @type {boolean}
 * @param {string} radius - bootstrap sizing methodology i.e 'xl' or 'sm' @type {string}
*/
 
const NavSectionWrapper = (props) => {    
    const navCtx = useContext(NAVIGATION_CONTEXT)
    const authCtx = useContext(AUTH_CONTEXT)
    const { isUser, isAdmin } = authCtx
    const items = props.items

    return (
        <NavSection className={css.centerSection} position={props.position} width="100%">
            {items && items.map((item, index) => {
                const key = `${index}|${item.name ? item.name : Math.random()}`
                const hasAccess = determineAcess(isUser, isAdmin, item.requiresUser, item.requiresAdmin, item.requiresLogin, item.isPublic )
                { return hasAccess && 
                    ( 
                    <NavItem key={key}
                        className={props.className} 
                        position={props.position}
                        text={item.text}
                        border={props.navBorders && item.border}
                        width={props.width}
                        height={props.itemHeight}
                        isMobile={navCtx.isMobile}
                        setCurrentPage={navCtx.setCurrentPage}
                        href={item.href}
                    />
                    )
                }
            })}
        </NavSection>
    )
}
  
const TopNav_ = (props) => {
    const navCtx = useContext(NAVIGATION_CONTEXT)
    const authCtx = useContext(AUTH_CONTEXT)
    const { isUser, isAdmin } = authCtx
    const currentPage = navCtx.currentPage
    const setCurrentPage = navCtx.setCurrentPage
    const dropDowns = props?.dropDowns
    const left = props?.left
    const right = props?.right
    const center = props?.center
    const { width } = useWindow(); 
    const isMobile = width < navCtx.mobileWidth;
    
    const [radius, radiusI] = getRadius(props.radius)
    const dropDownClasses = useClass([radiusI])
    const [isDropped, toggleDrop, setIsDropped] = useToggle(false)
    
    const {mobile, nav, dropDown} = navCtx.navStyles
    const { logo } = navStyles
    let {width: logoWidth, height: logoHeight, bgColor: logoBg, src: logoSrc, alt: logoAlt} = logo
    let {width: dropWidth, heigth: dropHeight, bgColor: dropColor} = dropDown
    let {width: fullWidth, height: fullHeight} = nav
    
    logoWidth = DEFAULT_PROP(logoWidth, "5rem")
    logoHeight = DEFAULT_PROP(logoHeight, "4rem")

    fullWidth = DEFAULT_PROP(fullWidth, "5rem")
    fullHeight = DEFAULT_PROP(fullHeight, "4rem")

    dropWidth = DEFAULT_PROP(dropWidth, "100%")
    dropHeight = DEFAULT_PROP(dropHeight, "4rem")
    

    const itemHeight = !isMobile ? props.itemHeight ? props.itemHeight : dropHeight : null;

    const navWidth = props.navWidth ? props.navWidth :"100%"
    const navHeight = props.navHeight ? props.navHeight : "4rem"

    const navClass = useClass([radius, isMobile ? css.navMobile : css.nav]);
    const leftSideWidth = left.length/(left.length+right.length) * 100;
    const rightSideWidth = 100 - leftSideWidth;

    return <>
        <nav style={{height: navHeight, width: navWidth}}>
            <main className={navClass} style={{backgroundColor: nav.bgColor}}>
                {
                    <NavSection position="left" className={css.logoSection} 
                        style={{
                            width:isMobile ? "fit-content" : logoWidth,
                            height: logoHeight,
                            backgroundColor: logoBg

                    }}>
                        {
                        logoSrc 
                        ? 
                        <Logo  
                            src={logoSrc.src} 
                            alt={logoAlt} 
                            href="/" 
                            width={dropWidth} 
                            height={dropHeight}
                            style={{width: logoWidth, height: logoHeight, backgroundColor: logoBg}}
                            transition="pop" 
                            className={css.logo}
                    /> 
                    : 
                        <NavItem
                            className={props.className} 
                            position={props.position}
                            text={logoAlt}
                            border={props.navBorders && props.border}
                            width={props.width}
                            height={props.itemHeight}
                            isMobile={navCtx.isMobile}
                            setCurrentPage={navCtx.setCurrentPage}
                            href="/"
                        />
                    }
                        
                    </NavSection >
                } 
                
                {!isMobile && left && 
                 <NavSectionWrapper
                    items={left}
                    className={css.leftSection}
                    style={{width: `${leftSideWidth}%`}}
                    position="left"
                    navBorders={props.navBorders}
                    width={width/leftSideWidth}
                    />
                } 

                {!isMobile &&
                    <NavSectionWrapper
                        items={center}
                        className={css.centerSection}
                        style={{width: 'fit-content'}}
                        position="center"
                        navBorders={props.navBorders}
                        width={width/rightSideWidth}
                />
                }

                {isMobile && 

                    <NavSection
                        position="center"
                    >
                       <NavItem
                            position="center"
                            className={css.centerSection}
                            style={{width: 'fit-content'}}
                            text={currentPage.text}
                            href={currentPage.href}
                            border={props.navBorders}
                            width="100%"
                            height={itemHeight}
                            isMobile={true}
                            setCurrentPage={setCurrentPage}
                            isMobileCenter={true}
                        />
                    </NavSection>
                }
            
                
                {!isMobile && right.length > 0 && 
                    <NavSectionWrapper
                        items={right}
                        className={css.rightSection}
                        style={{width: `${rightSideWidth}%`}}
                        position="right"
                        navBorders={props.navBorders}
                        width={width/rightSideWidth}
                    />

                }
                
                {isMobile &&
                    <NavSection className={css.dropButton} position="right" style={{width: "100%"}}>
                        <DropDownButton
                            onClick={toggleDrop}
                            setIsDropped={setIsDropped}
                            width={dropWidth}
                            height={dropHeight}
                            transition="pop"
                            as="text"
                        />
                    </NavSection>
                    }

                {!isMobile && dropDowns &&
                    <NavSection className={css.dropButton} position="right" style={{width: "100%"}}>
                        <DropDownButton
                            onClick={toggleDrop}
                            setIsDropped={setIsDropped}
                            width={dropWidth}
                            height={dropHeight}
                            transition="pop"
                            as="text"
                        />
                    </NavSection>
                    }
                    
            </main>
            
            {isDropped && isMobile &&
                <NavSection className={`${css.dropDownButtonSection} ${css.dropDownDiv}`} position="center">
                    <DropDown 
                        left={leftNavs}
                        center={centerNavs}
                        right={rightNavs}
                        dropDowns={dropDowns} 
                        className={dropDownClasses}
                        width={dropWidth}
                        height={dropHeight}
                        border={true}
                        bgColor={dropColor}
                        mobileBorders={props.mobileBorders}
                        setCurrentPage={setCurrentPage}
                        isUser={isUser}
                        isAdmin={isAdmin}
                        styles={mobile}
                    />
                </NavSection>
                }

            {isDropped && !isMobile &&
                
                <NavSection className={`${css.dropDownButtonSection} ${css.dropDownDiv}`} position="center">
                    
                    <DropDown 
                        dropDowns={dropDowns} 
                        className={dropDownClasses}
                        width={dropWidth}
                        height={dropHeight}
                        border={true}
                        bgColor={dropColor}
                        mobileBorders={props.navBorders}
                        setCurrentPage={setCurrentPage}
                        isUser={isUser}
                        isAdmin={isAdmin}
                        styles={mobile}
                    />
                </NavSection>
                }

        </nav>
    </>
}
export const TopNav = memo(TopNav_)

export default TopNav
















