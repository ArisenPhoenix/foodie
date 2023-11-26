import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { StrictMode } from "react";
import { ThemeProvider, SSRProvider } from "react-bootstrap";
import { FoodContextProvider } from "../store/food-context";
import { MERKURIAL_CONTEXT_PROVIDER } from "../Merkurial/store/Context/MERKURIAL_CONTEXT/merkurial_context";
import { USER_CONTEXT_PROVIDER } from "../Merkurial/store/Context/USER_CONTEXT/user_context"
import { AUTH_CONTEXT_PROVIDER } from "../Merkurial/store/Context/AUTH_CONTEXT/auth_context";
import { FOOD_CONTEXT_CONNECTIONS_CONTEXT_PROVIDER } from "../store/food_context_connections"
import { SiteContextProvider } from "../store/site_context";
import Navigation from "../Merkurial/Components/Navigation/Navigation";
import Head from "next/head";


function FoodieApp({ Component, pageProps }) {
  return (
    // <StrictMode>
      <SSRProvider>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        </Head>
        
        <MERKURIAL_CONTEXT_PROVIDER>
          <USER_CONTEXT_PROVIDER>
            <AUTH_CONTEXT_PROVIDER>
              <Navigation>
            
                <SiteContextProvider>
                  <FOOD_CONTEXT_CONNECTIONS_CONTEXT_PROVIDER>
                    <FoodContextProvider>
                      <ThemeProvider breakpoints={["xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}>
                        <Component {...pageProps} />
                      </ThemeProvider>
                    </FoodContextProvider>
                  </FOOD_CONTEXT_CONNECTIONS_CONTEXT_PROVIDER>
                </SiteContextProvider>
              
              </Navigation>
            </AUTH_CONTEXT_PROVIDER>
            </USER_CONTEXT_PROVIDER>
        </MERKURIAL_CONTEXT_PROVIDER>
      </SSRProvider>
    // </StrictMode>
  );
}

export default FoodieApp;
