import React, { createContext, useContext } from "react";
import NAVIGATION_CONTEXT, { NAVIGATION_CONTEXT_PROVIDER } from "./navigation_context";
import USER_CONTEXT, {USER_CONTEXT_PROVIDER} from "../USER_CONTEXT/user_context";
// import AdminContextProvider, { AdminContext } from "../ADMIN_CONTEXT/admin_context";

const MERKURIAL_CONTEXT = createContext({
    nav: NAVIGATION_CONTEXT,
    user: USER_CONTEXT,
  });

export default MERKURIAL_CONTEXT

const MERKURIAL_CONTEXT_PROVIDERS_CONTAINER = (props) => {
    const navCtx = useContext(NAVIGATION_CONTEXT)
    const userCtx = useContext(USER_CONTEXT)
    // const authCtx = useContext(AdminContext)

    const merkCtx = {
        nav: navCtx,
        user: userCtx,
    }
    
    return (
        <MERKURIAL_CONTEXT.Provider value={merkCtx}>
            {props.children}
        </MERKURIAL_CONTEXT.Provider>
    )
}

const MERKURIAL_PROVIDERS = (props) => {
    return (
        <>
            <NAVIGATION_CONTEXT_PROVIDER>
                <USER_CONTEXT_PROVIDER>
                    <MERKURIAL_CONTEXT_PROVIDERS_CONTAINER>
                        {props.children}
                    </MERKURIAL_CONTEXT_PROVIDERS_CONTAINER>
                </USER_CONTEXT_PROVIDER>
            </NAVIGATION_CONTEXT_PROVIDER>
        </>
    )
}

export const MERKURIAL_CONTEXT_PROVIDER = (props) => {

    return (
    <MERKURIAL_PROVIDERS>
            <>
                {props.children}
            </>
    </MERKURIAL_PROVIDERS>
    )
}






