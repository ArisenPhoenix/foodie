import Link_ from "next/link";
import css from "./Link.module.css";
import { useClass } from "../../hooks/usehooks";

const Link = (props) => {
  const classes = useClass([css.color, props.className]);
  return (
    <Link_ href={props.href} className={classes}>
      {props.text}
    </Link_>
  );
};

export default Link;
