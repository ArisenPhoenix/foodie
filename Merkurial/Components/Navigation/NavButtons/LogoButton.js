import { useRouter } from "next/router";
import css from "./LogoButton.module.css";
import Image from "next/image";
// import sai_nam_yen_logo from "../../../../public/branding/SaiNamYenLogo.jpg";
import React from "react";

const LogoButton = (props) => {
  const router = useRouter();
  const route = (e) => {
    e.preventDefault();
    router.push(props.href);
    props.onClick && props.onClick();
  };

  return (
    <div type="button" onClick={route} className={css.logoButton}>
      <Image
        src={props.src}
        as="preloaded"
        alt={props.alt}
        onClick={route}
        priority
        placeholder="empty"
        sizes="(max-width: 50px)"
        className={css.image}
        fill
      />
    </div>
  );
};

export default LogoButton;
