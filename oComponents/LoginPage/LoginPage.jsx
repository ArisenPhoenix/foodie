import { useContext, useState, Fragment } from "react";
import AuthContext from "../../store/auth-context";
import css from "../../pages/login/Login.module.css";
import { AXIOS_POST } from "../../store/FOODCONTEXT/FETCH_API";
import Card from "../UI/Card/Card";
import { Form, Button } from "react-bootstrap";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let credentials = {
      email: email,
      password: password,
    };

    setIsLoading(true);

    try {
      const credentialsResponse = await AXIOS_POST(
        credentials,
        "/api/get_credentials"
      );

      if (credentialsResponse.idToken) {
        try {
          const data = await AXIOS_POST(credentialsResponse, "/api/login");
          const mealData = {
            fullMenu: data.fullMenu,
            ingredients: data.ingredients,
            weeklyList: data.weeklyList,
          };
          const token = data.token;
          const userName = data.displayName;
          const profile = { ...data.profile, userId: data._id };
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(token, userName, expirationTime, profile, mealData);
          console.log("LOGIN SUCCESSFUL FOR: ", data.email);
        } catch (err) {
          console.log("error logging in: ", err);
        }
      } else {
        console.log("Credentials Did Not Come");
      }
    } catch (err) {
      console.log("ERROR GETTING CREDENTIALS: ", err);
    }

    setIsLoading(false);
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
    <Fragment>
      {isLoading === false ? (
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
        <h1>Logging In...</h1>
      )}
    </Fragment>
  );
};
export default LoginPage;
