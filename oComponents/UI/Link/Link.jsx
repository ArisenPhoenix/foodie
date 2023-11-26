import Link from "next/link";
import React from "react";
import css from "./Link.module.css";

const Link1 = (props) => {
  const classes = `${css.controls} ${props.className}`;
  return (
    <Link href={props.href}>
      <a className={classes}>{props.text}</a>
    </Link>
  );
};
// const NewA = React.forwardRef(({ onClick, href, name }, ref) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>
//       {name}
//     </a>
//   );
// });

// const NavLink = ({ href, name }) => {
//   return (
//     <Link href={href} passHref>
//       <NewA name={name} />
//     </Link>
//   );
// };

export default Link1;
