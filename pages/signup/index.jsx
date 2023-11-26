import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../store/site_context";
import { Form, Button } from "react-bootstrap";
import css from "./Signup.module.css";
import Card from "../../oComponents/UI/Card/Card";
import { userSchema } from "../../merkurialSchemas"
import LoadingScreen from "../../Merkurial/Components/UI/LoadingScreen/LoadingScreen";
import useSqlTable from "../../Merkurial/hooks/useSqlTable";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";


const Signup = () => {
  const authCtx = useContext(AuthContext);
  const messenger = (text) => {
    if (text !== "Table users Already Exists" && text != "Table users Does Not Exist"){
      setError(text)
    }
  }
  const router = useRouter()
  const {isQuerying, ADD_ROW} = useSqlTable("users", userSchema, "/api/postgres", "GET", true, messenger, {returning: "*"})

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("")
  const [sex, setSex] = useState("Select One")
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);


  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const resetError = () => {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
    let chosenSex = sex 
    if (sex[0] === "S"){
      chosenSex = "X"
    } else {
      chosenSex = chosenSex[0]
    }
    if (password.trim() != verifyPassword.trim()){
      setError("Emails Don't Match")
      resetError()
      return
    } else if (password == ""){
      setError("Please Make Sure You Have Entered A Password")
      resetError()
      return
    } else if (password.length < 7){
      setError("Password Must Be Atleast 7 Characters Long")
      resetError()
      return
    } else {

      const userObj = {
        username: displayName.trim(),
        first_name: fName.trim(),
        last_name: lName.trim(),
        email: email.trim(),
        password: password.trim(),
        currency: "฿",
        sex: sex[0],
        days_for_main_meals: 7,
        days_for_other_meals: 3,
      }
  
      const signupRes = await ADD_ROW(userObj, {returning: "*"})
      if (signupRes){
        router.push("/login")
      }
    }
  };

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    console.log("Value: ", value[0])
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
      case "verifyPassword":
        setVerifyPassword(value)
        break
      case "sex":
        setSex(value)
      default:
        break;
    }
  }; 
  return (
    <AUTH_GUARD needsLoggedIn={false} needsAdmin={false} needsUser={false}>
      {isQuerying === false ? (
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
                  Your email will not be shared with anyone else.
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

              <Form.Group className="mb-3" controlId="verifyPassword">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control
                  value={verifyPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                />
                <Form.Text className="text-muted">
                  Just To Be Sure
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="sex">
                <Form.Label>Sex</Form.Label>
                
                  <Form.Select
                    value={sex}
                    onChange={handleChange}
                    autoComplete="sex"
                  >
                    <option>{"Select One"}</option>
                    {["Male", "Female", "X"].map((val) => {
                    return <option key={val} value={val}>{val}</option>
                  })}
                  </Form.Select>

                <Form.Text >
                  For Statistical Purposes Only
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
        <LoadingScreen />
      )}
    </AUTH_GUARD>
  );
};

export default Signup;
