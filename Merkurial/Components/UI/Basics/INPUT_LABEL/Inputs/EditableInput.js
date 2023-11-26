import Input from "./Input"
import Label from "../Labels/Label"
import css from "../inputLabel.module.css"


const EditableInput = (props) => {
    const isEditable = props.contenteditable
    const editableClass = `${props.editClass} ${css.editableInput}`
    const notEditableClass = `${props.className} ${css.editableLabel}`
    const onDoubleClick = props.onDoubleClick ? props.onDoubleClick : false
    const onClick = props.onClick ? props.onClick : onDoubleClick ? () => {} : null
    const allProps = isEditable
    ? {...props, className: editableClass, onDoubleClick: onDoubleClick, onClick: onClick} 
    : {...props, className: notEditableClass, text: props.value, onDoubleClick: onDoubleClick, onClick: onClick}
    
    {
        return isEditable ? <Input {...allProps} /> : <Label {...allProps} />
    }
}

export default EditableInput


const EditableSelection = (props) => {

}