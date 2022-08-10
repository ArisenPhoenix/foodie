import AuthContext from "../../../../store/auth-context";
import { useContext, Fragment } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Link from "../../Link/Link";
import css from "./DropDown.module.css";
import ButtonLink from "../WrapComponents/Button/Button";
import NavigationContext from "../../../../store/navigation-context";

const DropDown = (props) => {
  const authCtx = useContext(AuthContext);
  const navCtx = useContext(NavigationContext);
  const classes = `${props.className} ${css.center}`;

  const logoutHandler = () => {
    authCtx.logout("LOGOUT BUTTON");
  };
  return (
    <Dropdown>
      <DropdownButton
        variant="nav-item"
        id="dropdown-menu-align-end"
        title={navCtx.dropDown}
        className={classes}
      >
        {/* <Dropdown.ItemText>{userCtx.userName}</Dropdown.ItemText> */}
        {!authCtx.isLoggedIn && (
          <Fragment>
            <Dropdown.Item as="button">
              <Link
                href="/login"
                text="Login"
                className={`${css.dropdownMenu}`}
                // onClick={authCtx.login}
              />
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <Link
                href="/signup"
                text="SignUp"
                className={`${css.dropdownMenu}`}
                // onClick={}
              />
            </Dropdown.Item>
          </Fragment>
        )}

        {authCtx.isLoggedIn && (
          <Fragment>
            <Dropdown.Item as="button">
              <Link
                href={navCtx.settingsLink}
                text={navCtx.settings}
                className={`${css.dropdownMenu}`}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <ButtonLink
                type="action"
                text="Logout"
                onClick={logoutHandler}
                id="logout"
                className={`${css.buttonLink}`}
              />
            </Dropdown.Item>
          </Fragment>
        )}
      </DropdownButton>
      <Dropdown.Menu>
        <Link href="/login" text="Login" className={`${css.dropdownMenu}`} />

        <Link
          href="/settings"
          text="Settings"
          className={`${css.dropdownMenu}`}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
