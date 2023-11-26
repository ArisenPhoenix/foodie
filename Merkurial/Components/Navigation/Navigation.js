import Bottom from "./Bottom/Bottom";
import Canvas from "./Canvas/Canvas";
import css from "./Navigation.module.css";
import TopNav from "./Top/TopNav";
import { leftNavs, rightNavs, centerNavs, dropDowns, navStyles2 } from "../../../merkurialConfig";
const { navMain: {canvas: {bg, bgColor}} } = navStyles2

const Navigation = (props) => {

  return (
    <div className={css.navigation}>

      <TopNav
        logoImg={props.logoImg}
        logoAlt={props.logoAlt} 
        itemWidth="20%"
        itemHeight="4rem"
        navWidth="100%"
        navHeight="4rem"
        mobileBorders={false}
        navBorders={false}
        left={leftNavs}
        center={centerNavs}
        dropDowns={dropDowns}
        right={rightNavs}
        radius="xs"
        transition="slide"
      />

      <Canvas bg={bg} bgColor={bgColor}> {props.children}</Canvas>
      <Bottom className={css.bottom} />
    </div>
  );
};

export default Navigation;
