import { useContext, useState } from "react";
import AuthContext from "../../Merkurial/store/Context/AUTH_CONTEXT/auth_context";
import css from "../../pages/login/Login.module.css";
import Card from "../../oComponents/UI/Card/Card";
import { Form, Button } from "react-bootstrap";
import { userSchema } from "../../merkurialSchemas";
import useSqlTable from "../../Merkurial/hooks/useSqlTable";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
import LoadingScreen from "../../Merkurial/Components/UI/LoadingScreen/LoadingScreen";


const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null);
  const messenger = (text) => {
    if (text !== "Table users Already Exists" && text != "Table users Does Not Exist"){
      setError(text)
    }
  }
  
  const {isQuerying, FIND_ROWS} = useSqlTable("users", userSchema, "/api/postgres", "GET", true, messenger, {returning: true})

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!submitted){ 
      let credentials = {
        email: email,
        password: password,
      };
  
      const finder = async () => {
        const res = await FIND_ROWS(credentials)
        console.log("LOGIN RES: ", res)
        if (res.ok && res.rows){
          const rows = res.rows
          authCtx.login(rows[0])
          setSubmitted(true)
        }
      }
      
      finder()
      
    }
    
   
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  return (
    <AUTH_GUARD needsAdmin={false} needsLoggedIn={false} needsUser={false}>
      {!isQuerying  ? (
        <div className={css.login}>
          <Card className={css.card}>
            <h1 className={css.heading}>Login</h1>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </Form.Group>
              <Button
                className={css.button}
                onClick={formSubmitHandler}
                variant="secondary"
                type="submit"
              >
                Submit
              </Button>
              {error && <p className={css.errorText}>{error}</p>}
            </Form>
          </Card>
          <div className={css.createSpace}></div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </AUTH_GUARD>
  );
};

export default Login;
