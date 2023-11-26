import css from "./DropDown.module.css";
import DroppedButton from "../../../NavButtons/DroppedButton";
import DropDownDropButton from "../../../NavButtons/DropDownDroppedButtons";
import { useContext } from "react";
import USER_CONTEXT from "../../../../../store/Context/USER_CONTEXT/user_context";
import { useClass } from "../../../../../hooks/usehooks";

const DropDownNavs = (props) => {
  const userCtx = useContext(USER_CONTEXT);
  const { isAdmin, isLoggedIn } = userCtx;
  const navItems = props.navItems;
  const navKeys = Object.keys(navItems);
  const isDropped = props.isDropped;
  const drop = props.drop;

  const leftSideNavs = navKeys.filter((item) => {
    return navItems[item]?.dir.toLowerCase().trim() !== "right";
  });

  const rightSideNavs = navKeys.filter((item) => {
    return navItems[item]?.dir.toLowerCase().trim() === "right";
  });

  let allItems = leftSideNavs.concat(rightSideNavs);

  return (
    <>
      {isDropped && (
        <div className={css.dropDownNavsContainer}>
          {allItems.map((item, index) => {
            const firstClass = index === 0 ? css.button1 : css.button2;
            const nav = navItems[item];
            const SelectButton = nav.button
              ? nav.button
              : nav.isDropDown
              ? DropDownNav
              : Nav;
            if (nav.requiresAdmin && isAdmin && isLoggedIn) {
              return (
                <SelectButton
                  key={`NAV: ${nav.name}`}
                  nav={nav}
                  isDropped={isDropped}
                  close={drop}
                  href={nav.href}
                  className={firstClass}
                  items={nav.items && nav.items}
                />
              );
            } else if (isLoggedIn && requiresLogin) {
              return (
                <SelectButton
                  key={`NAV: ${nav.name}`}
                  nav={nav}
                  isDropped={isDropped}
                  close={drop}
                  href={nav.href}
                  className={firstClass}
                  items={nav.items && nav.items}
                />
              );
            } else {
              return (
                <SelectButton
                  key={`NAV: ${nav.name}`}
                  nav={nav}
                  isDropped={isDropped}
                  direction={nav.dir}
                  close={drop}
                  href={nav.href}
                  className={firstClass}
                  items={nav.items && nav.items}
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default DropDownNavs;

export const Nav = (props) => {
  const nav = props.nav;
  let className;
  const dir = props.direction ? props.direction : "left";
  if (dir.toLowerCase().trim() == "left") {
    className = css.buttonContainerLeft;
  } else if (dir.toLowerCase().trim() == "right") {
    className = css.buttonContainerRight;
  }
  className = useClass([className, props.className]);
  return (
    <div className={className}>
      <DroppedButton
        key={nav.href}
        text={nav.name}
        href={nav.href}
        className={props.isMobile ? css.navContainerMobile : css.button}
        isDropped={props.isDropped}
      />
    </div>
  );
};

export const DropDownNav = (props) => {
  const nav = props.nav;
  let className;
  const dir = props.direction ? props.direction : "left";
  if (dir.toLowerCase().trim() == "left") {
    className = css.buttonContainerLeft;
  } else if (dir.toLowerCase().trim() == "right") {
    className = css.buttonContainerRight;
  }
  className = useClass([className, props.className]);
  return (
    <div className={className}>
      <DropDownDropButton
        key={nav.href}
        text={nav.name}
        href={nav.href}
        className={props.isMobile ? css.navContainerMobile : css.button}
        isDropped={props.isDropped}
        close={props.close}
      />
    </div>
  );
};
