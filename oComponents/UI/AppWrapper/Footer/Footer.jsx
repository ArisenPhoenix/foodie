import { Fragment, useContext } from "react";
import css from "./footer.module.css";
import Link from "../../Link/Link";
import React from "react";
import SocialMediaButton from "../../Button/SocialMediaButton/SocialMediaButton";
import BusinessContext from "../../../../store/business-context";
import {
  faTwitter,
  faLinkedin,
  faFacebookF,
  faInstagram,
  faGithub,
  faGoogle,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const currentYear = new Date().getFullYear();
let classes;

function Footer() {
  const busiCtx = useContext(BusinessContext);
  return (
    <div className={css.placement}>
      {/* <div className={css.footerSpacer}></div> */}
      <footer className={`bg-light text-center ${css.fix}`}>
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Social media --> */}

          <div className="mb-4">
            {/* <!-- Facebook --> */}
            <SocialMediaButton
              href="https://facebook.com"
              icon={faFacebook}
              className={`${css.facebook}`}
            />

            {/* <!-- Twitter --> */}
            <SocialMediaButton icon={faTwitter} className={`${css.twitter}`} />

            {/* <!-- Google --> */}
            <SocialMediaButton icon={faGoogle} className={`${css.google}`} />

            {/* <!-- Instagram --> */}
            <SocialMediaButton
              icon={faInstagram}
              className={`${css.instagram}`}
            />

            {/* <!-- Linkedin --> */}
            <SocialMediaButton
              icon={faLinkedin}
              className={`${css.linkedIn}`}
            />

            {/* <!-- Github --> */}
            <SocialMediaButton icon={faGithub} className={`${css.github}`} />
          </div>

          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          {`© ${currentYear} Copyright `}
          <Link text={busiCtx.name} href="/" className={classes} />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
