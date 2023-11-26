import INPUT_LABEL from "../INPUT_LABEL/INPUT_LABEL"
import { VALIDATE_EMAIL } from "../../../../Helpers/Verifications/Validations"
import { useState, useEffect } from "react"
 
const EMAIL = (props) => {
    const submitted = props.submitted
    
    const [email, setEmail] = useState(props.input.value)
    const [emailTwo, setEmailTwo] = useState("")
    

    useEffect(() => {
        if (email !== ""){
            const emailIsGood = VALIDATE_EMAIL(email)
            if (!emailIsGood){
              props.setMessage("Email Is Invalid")
            } else if (props.validate){
                if ((email !== emailTwo) && (emailTwo !== "" && email !== "")){
                  props.setMessage("Emails Don't Match")
              } else {
                  props.setMessage(null)
              }
            } else {
              props.setMessage(emailIsGood)
          }
          }
        
        if (submitted){
            setEmailTwo("")
            setEmail("")
        }
    }, [email, emailTwo, setEmail, setEmailTwo, submitted])
    
    

    const handleChanges = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        if (name === props.input.name){
            setEmail(value)
            props.input.onChange(e)
        }
        if (props.validate){
            name === "email2" && setEmailTwo(value)
        }
    }

    return ( 
        <>
            <INPUT_LABEL
                label={{...props.label}}
                input={{...props.input, onChange: handleChanges}}
            />
            {props.validate && email && email !== "" && email !== " " && (
                <INPUT_LABEL 
                    label={{...props.label, text: `Validate ${props.label.text}`}}
                    input={{...props.input, value: emailTwo, name: "email2", text: `Validate ${props.label.text}`, autoComplete: null, onChange: handleChanges}}
                />
            ) }
        </>
    )
}

export default EMAIL