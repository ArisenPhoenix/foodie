import MENU_SETUP from "../../Helpers/client_to_api_functions/MENU_SETUP";
import EmptyMenu from "../../Dummy_Data_Full/EmptyMenu.json";

const Menu_Setup = () => {
  MENU_SETUP(EmptyMenu);
  return <h1>Setting Up Database...</h1>;
};

export default Menu_Setup;
