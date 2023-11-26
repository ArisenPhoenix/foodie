const Label = (props) => {

  const handleClick = (e) => {
    if (props.onClick){
      switch (e.detail){
        case 1: 
          return props.onClick()
        case 2:
          return props.onDoubleClick ? props.onDoubleClick() : props.onClick()
      }
    }
  }

  const text = 
    props.type === "password" 
      ? [...props.text].map(val => `•`)
      : props.text

  return (
    <label 
      className={props.className} 
      htmlFor={props.for ? props.for : null} 
      onBlur={props.onBlur ? props.onBlur : () => {}}
      onClick={handleClick}
    >
      {text} {props.required && <span>*</span>}
    </label>
  );
};

export default Label;
