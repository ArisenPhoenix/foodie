import Label from "./Labels/Label";
import Input from "./Inputs/Input";
import { useClass } from "../../../../hooks/usehooks";
import { VERIFY_VALUE } from "../../../../Helpers/Verifications/verify";
import css from "./inputLabel.module.css";

const INPUT_LABEL = (props) => {
  const lab = props?.label;
  const inp = props.input;
  const labelClass = useClass([css.label,
    lab && lab.className && lab.className
  ]);
  const inputType = VERIFY_VALUE(inp?.type, "text")
  const inputClass = useClass([inp?.className, css.input]);
  const divClass = useClass([css.main, props?.className ]);
  
  return (
    <div className={divClass} style={props.style}>
      {(!inp?.hidden || !lab) && (
        <>
          <Label
            text={VERIFY_VALUE(lab?.text, inp?.text)}
            required={props?.required ? props.required : false}
            className={labelClass}
          />
          <br></br>
        </>
      )}
      {<Input
        text={VERIFY_VALUE(inp?.text, lab?.text ? lab.text : inp?.value)}
        value={inp?.value}
        placeholder={VERIFY_VALUE(inp?.placeholder, inp?.text)}
        required={VERIFY_VALUE(props?.required)}
        onChange={inp.onChange}
        ref={VERIFY_VALUE(inp?.ref)}
        name={VERIFY_VALUE(inp?.name)}
        className={inputClass}
        type={inputType}
        min={inputType==="number" ? inp.min : null}
        max={inputType==="number" ? inp.max : null}
        readOnly={VERIFY_VALUE(props?.readOnly, false)}
        hidden={inp?.hidden ? true : null}
        autoComplete={inp?.autoComplete ? inp.autoComplete : null}

      />}
    </div>
  );
};

export default INPUT_LABEL;
