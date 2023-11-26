import { useEffect } from "react"
import { useContext } from "react"
import AUTH_CONTEXT from "../Merkurial/store/Context/AUTH_CONTEXT/auth_context"

const Logout = (props) => {
    const authCtx = useContext(AUTH_CONTEXT)

    useEffect(() => {
        authCtx.logout()
    }, [])
}


export default Logout