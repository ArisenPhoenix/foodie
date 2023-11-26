import { useToggleText } from "../../../../hooks/Toggle";
import css from "./PASSWORD.module.css";
import { useClass } from "../../../../hooks/usehooks";
import PASSWORD_BUTTON from "./PASSWORD_BUTTON";
import INPUT_LABEL from "../INPUT_LABEL/INPUT_LABEL";
import { VALIDATE_PASSWORD } from "../../../../Helpers/Verifications/Validations";
import { useEffect, useState } from "react";

const PASSWORD = (props) => {
  const [isPassword, toggleIsPassword] = useToggleText("password", "text", 1000);
  const [password, setPassword] = useState(props?.input.value)

  const [passwordTwo, setPasswordTwo] = useState("")
  const [isPassword2, toggleIsPassword2] = useToggleText("password", "text", 1000)
  const submitted = props.submitted

  const required = props.required
    ? props.required
    : typeof props.required === "undefined"
    ? true
    : false;

  const lab = props.label;
  const inp = props.input;
  const button = props.button;
  const buttonClass = useClass([css.icon, button?.className]);
  const mainClass = useClass([css.main, props.className]);


  useEffect(() => {

      if (password !== ""){
        const isPassword = VALIDATE_PASSWORD(password)
        if (!isPassword.ok){
          props.setMessage(isPassword.message)
        } else if (props.validate){
            if ((password !== passwordTwo) && (passwordTwo !== "" && password !== "")){
              props.setMessage("Passwords Don't Match")
          } else {
              props.setMessage(isPassword.message)
          }
        } else {
          props.setMessage(isPassword.message)
      }
      }

    if (submitted){
      setPassword("")
      setPasswordTwo("")
    }
  }, [password, passwordTwo, submitted])

  const handleChanges = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    if (name === props.input.name){
        setPassword(value)
        props.input.onChange(e)
    }
    name === "password2" && setPasswordTwo(value)
}

  return (
    <>
    <div className={mainClass}>
        <INPUT_LABEL
          className={css.inputLabel}
          label={{...lab}}
          input={{...inp, value: password, type: isPassword, required: required, autoComplete: "current-password", onChange: handleChanges}}
        />
        <PASSWORD_BUTTON
          onClick={toggleIsPassword}
          buttonClass={buttonClass}
        />


    </div>

    {props.validate && password && password !== "" &&
      <div className={mainClass}>
        <INPUT_LABEL
          className={css.inputLabel}
          label={{...lab, text: "Validate Password"}}
          input={{...inp, value: passwordTwo, type: isPassword2, name: "password2", required: required, onChange: handleChanges}}
        />
        <PASSWORD_BUTTON
          onClick={toggleIsPassword2}
          buttonClass={buttonClass}
        />


    </div>
        }

    </>
    
  );
};

export default PASSWORD;
