import css from "./Section.module.css"
import { useClass } from "../../../../hooks/usehooks"

const NavSection = (props) => {
    const pos = props.position
    const loc = pos === "left" ? css.leftSection : pos === "right" ? css.rightSection : css.center
    const styles={width: props.width, height: props.height}
    const classes = useClass([loc, props.className])

    return (
        <section className={classes} style={styles}>
            {props.children}
        </section>
    )
}


export default NavSection