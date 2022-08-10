const TextArea = (props) => {
  const classes = `${props.className}`;

  const handleChange = (event) => {
    const text = event.target.value;
    props.setText(text);
  };

  return (
    <div className={classes}>
      {props.label && (
        <label htmlFor={`textarea${props.id}`} className="form-label">
          {props.labelText}
        </label>
      )}
      <textarea
        placeholder={props.placeholder}
        onChange={props.handleChange ? props.handleChange : handleChange}
        className="form-control"
        id={`${props.id}`}
        value={props.value}
        rows="10"
        name={props.name}
      ></textarea>

      {/* <FloatingLabel
        className={css.textArea}
        controlClass={css.textArea}
        controlId="textArea"
        style={{ height: "200px" }}
      >
        <Form.Control
          as="textarea"
          placeholder="Please Tell Us More About You..."
        />
      </FloatingLabel> */}
    </div>
  );
};

export default TextArea;
