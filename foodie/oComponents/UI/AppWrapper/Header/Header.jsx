import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import DropDown from "../DropDownNavigation/DropDown";
import css from "./Header.module.css";
import ButtonLink from "../WrapComponents/Button/Button";
import { useContext } from "react";
import BusinessContext from "../../../../store/business-context";
import NavigationContext from "../../../../store/navigation-context";

function Header1() {
  const busiCtx = useContext(BusinessContext);
  const navCtx = useContext(NavigationContext);
  const closeHeader = (event) => {
    event.stopPropagation();
    const dropEl = document.getElementById("basic-navbar-nav");
    const dropElClasses = dropEl.classList;

    let eventName = event.target.className;

    if (eventName.includes("main")) {
      eventName = "main";
    } else if (eventName.includes("navbar-toggler-icon")) {
      eventName = "toggler";
    }

    if (eventName === "main" || eventName === "toggler") {
      if (dropElClasses.contains("show")) {
        dropElClasses.add("hidden");
      }
    }
  };

  const in_ = <DropDown id="in" className={`in ${css.in}`} />;
  const out = <DropDown id="out" className={`out ${css.out}`} />;

  return (
    <div className={css.height}>
      <Navbar expand="md" className={`${css.paddings} ${css.color}`}>
        <Navbar.Text className="myLogo">
          <Navbar.Brand>
            <ButtonLink
              type="main"
              href="/"
              text={busiCtx.name}
              onClick={closeHeader}
              id="main"
            />
          </Navbar.Brand>
        </Navbar.Text>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={closeHeader} />

        <Navbar.Collapse
          justify="true"
          id="basic-navbar-nav"
          onClick={closeHeader}
        >
          <Nav fill="true" variant="tabs" justify="true">
            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.menuLink}
                text={navCtx.menu}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>

            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.breakfastLink}
                text={navCtx.breakfast}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>
            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.lunchLink}
                text={navCtx.lunch}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>
            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.dinnerLink}
                text={navCtx.dinner}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>
            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.ingredientsLink}
                text={navCtx.ingredients}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>
            <Navbar.Text>
              <ButtonLink
                type="main"
                href={navCtx.addLink}
                text={navCtx.add}
                onClick={closeHeader}
                id="main"
              />
            </Navbar.Text>
          </Nav>
          {in_}
        </Navbar.Collapse>
        {out}
      </Navbar>
    </div>
  );
}
export default Header1;
