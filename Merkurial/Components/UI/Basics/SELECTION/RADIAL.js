import { useEffect, useState } from "react"
import css from "./selection.module.css"
import { Row, Col } from "react-bootstrap"
// import { COLUMN } from "../../../../../oComponents/UI/BootStrap/BootStrapGridder"  



export const RADIO = (props) => {
    const [isChecked, setIsChecekd] = useState(false)

    // console.log("FALSE == FALSE BELOW: ")
    // console.log(false == false)
    // console.log("TRUE == TRUE BELOW: ")
    // console.log(true == true)
    
    useEffect(() => {
        // console.log("")

        // console.log("=========================================================================================================")
        // console.log(`RADIO # ${props.radioNumber}`)
        // console.log(`VALUE: ${props.value}`)
        // console.log(`GLOBAL VALUE: ${props.globalValue}`)
        // console.log(`CHECKED RESULT FOR RADIO # ${props.radioNumber}`, String(props.value) === props.globalValue)
        // console.log("=========================================================================================================")
        // console.log("")
        setIsChecekd(String(props.value) == props.globalValue)
    }, [props.globalValue])

    const onChange = (e) => {
        e.preventDefault()
        // console.log(`Radio ${props.radioNumber} Is Changing to ${props.globalValue}`)
        props.onChange && props.onChange(e)
    }

    return (
        <div className={css.radials}>
          <label className={css.label} htmlFor={props.name ? props.name : props.id}>
            {props.text}
          </label>
    
          <input
            onChange={onChange}
            onClick={props.onClick}
            className={`${css.label}`}
            type="radio"
            id={props.id}
            name={props.name}
            value={Boolean(props.value)}
            checked={isChecked}
          />
        </div>
      );
    
}


const RADIOS = (props) => {
    const globalRadioValue = props.value
    useEffect(() => {
    }, [props.value])

    const onClick = (e) => {
        e.preventDefault()
        const {name, value, id} = e.target
        e && props.onChange && props.onChange(e)
    }


    return (
        <Row className={props.className}>
            {props.options.map((option, index) => {
                return (
                    <Col key={`${props.value} | ${option.value}`}>
                        <RADIO
                            value={Boolean(option.value)}
                            globalValue={globalRadioValue}
                            text={option.text ? option.text : option.value}
                            id={props.id ? props.id : index}
                            name={props.name ? props.name : props.id}
                            onClick={onClick}
                            radioNumber={index+1}
                            onChange={props.onChange}
                        />
                    </Col>
                )
            })}
        </Row>
    )
   
}

export default RADIOS