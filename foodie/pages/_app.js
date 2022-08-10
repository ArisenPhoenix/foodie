import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import AppWrapper from "../oComponents/UI/AppWrapper/AppWrapper";
import { StrictMode } from "react";
import { ThemeProvider, SSRProvider } from "react-bootstrap";
import Container_ from "../oComponents/UI/BootStrap/Container";
import { AuthContextProvider } from "../store/auth-context";

import { BusinessContextProvider } from "../store/business-context";
import { WindowContextProvider } from "../store/window-context";
import { FoodContextProvider } from "../store/food-context";
import { UserContextProvider } from "../store/user-context";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <SSRProvider>
        <AuthContextProvider>
          <BusinessContextProvider>
            <UserContextProvider>
              <ThemeProvider
                breakpoints={["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
              >
                <FoodContextProvider>
                  <Container_ className={"main"}>
                    <WindowContextProvider>
                      <AppWrapper>
                        <Component {...pageProps} />
                      </AppWrapper>
                    </WindowContextProvider>
                  </Container_>
                </FoodContextProvider>
              </ThemeProvider>
            </UserContextProvider>
          </BusinessContextProvider>
        </AuthContextProvider>
      </SSRProvider>
    </StrictMode>
  );
}

export default MyApp;
