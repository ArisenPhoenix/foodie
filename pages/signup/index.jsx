import { useState, useContext, Fragment } from "react";
import AuthContext from "../../store/auth-context";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import css from "./Signup.module.css";
import Card from "../../oComponents/UI/Card/Card";
import { SIGN_LOG_IN_FETCH } from "../../store/FOODCONTEXT/FETCH_API";

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setStates = [
    setFName,
    setLName,
    setEmail,
    setPassword,
    setDisplayName,
    setError,
  ];

  const loginHandler = async (userData) => {
    const toSend = JSON.stringify(userData);
    console.log("in login handler ...");
    let data;
    try {
      data = await fetch("/api/login", {
        method: "POST",
        body: toSend,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("There was an error posting data to the server...");
      setError(error);
      return null;
    }
    try {
      const loginData = await data.json();
      if (loginData.error) {
        console.log("this data is the error");
        console.log(loginData.error.message);
        return loginData.error.message;
      }

      return loginData;
    } catch (error) {
      console.log("there was an error signing you in");
      setError(error);
      return null;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const credentials = {
      fName: fName,
      lName: lName,
      displayName: displayName,
      email: email,
      password: password,
    };

    setIsLoading(true);
    const data = await SIGN_LOG_IN_FETCH(credentials, "/api/signup");
    if (data.token) {
      console.log("THE TOKEN AND ALL INFO IS IN:");
    } else {
      // console.log("FAULTY DATA, NOTHING CAME IN");
      console.log(data);
    }

    if (data === null || data === undefined || data === "null") {
      console.log("some error occured server side.");
    } else {
      const token = data.token;
      const userName = data.displayName;
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(token, userName, expirationTime);
    }
    setIsLoading(false);
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    switch (name) {
      case "fName":
        setFName(value);
        break;
      case "lName":
        setLName(value);
        break;
      case "displayName":
        setDisplayName(value);
        break;
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
        <div className={css.signup}>
          <Card className={css.card}>
            <h1 className={css.heading}>Signup</h1>
            <Form>
              <Form.Group className="mb-3" controlId="displayName">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  value={displayName}
                  onChange={handleChange}
                  type="text"
                  placeholder="offers more privacy"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={fName}
                  onChange={handleChange}
                  type="text"
                  placeholder="no display name means everyone sees your real name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={lName}
                  onChange={handleChange}
                  type="text"
                  placeholder="authenticity means easier authentication"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  autoComplete="email"
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
                </Form.Text>
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
                <Form.Text className="text-muted">
                  And of course not your password
                </Form.Text>
              </Form.Group>
              <Button
                className={css.button}
                onClick={formSubmitHandler}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              {error && <p className={css.errorText}>{error}</p>}
            </Form>
          </Card>
        </div>
      ) : (
        // This is just a loading sign.
        <h1>Checking...</h1>
      )}
    </Fragment>
  );
};

export default Signup;
