import Header from "./Header/Header";
import css from "./AppWrapper.module.css";
import Footer from "./Footer/Footer";
import { NavigationContextProvider } from "../../../store/navigation-context";

function Layout(props) {
  return (
    <NavigationContextProvider>
      <div className={css.container}>
        <Header className={`${css.general} `} />
        <main className={css.main}>{props.children}</main>
        <Footer className={`${css.general}`} />
      </div>
    </NavigationContextProvider>
  );
}

export default Layout;
