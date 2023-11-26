import Link from "next/link";
import css from "./Link.module.css";

const Link_ = (props) => {
  return (
    <div type="button" className={css.linkDiv}>
      <Link href={props.href} className={css.link}>
        {props.text ? props.text : props.children}
      </Link>
    </div>
  );
};

export default Link_;
