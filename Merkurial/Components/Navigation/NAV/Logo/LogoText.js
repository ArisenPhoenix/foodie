import Link from "../../../Links/Link";



export const LogoText = (props) => {
    const router = useRouter();
    const route = (e) => {
        e.preventDefault();
        router.push(props.href);
        props.onClick && props.onClick();
    };

    const transition = getTransition(props.transition)
    const imageClass = useClass([css.logoButton, transition])
    let {width, height} = props.style

    return (
        <div 
            type="button" onClick={route} 
            className={imageClass}
            style={{width: width ? width : null, height: height ? height : null}}>

                <Image
                    src={`${props.src}`}
                    // as="static"
                    crossOrigin="true"
                    alt={props.alt}
                    onClick={route}
                    // priority={true}
                    sizes="(max-width: 200px) 15vw, (max-width: 300px) 15vw"
                    layout="fill"
                    rel="preload"
                    className={imageClass}
                />
        </div>
    );

}


const Button = (props) => {
  let classes;
  let type_;
  if (props.type === "main") {
    classes = `main navbar-text`;

    type_ = (
      <span
        // className={classes}
        onClick={props.onClick}
        name={props.name}
        id={props.id}
      >
        <Link 
          className={classes}
          href={props.href}
          text={props.text}
          name={props.name}
          id={props.id}
          style={props.style}
        />
      </span>
    );
  } else if (props.type === "link") {
    classes = `${props.className} dropdown-item`;

    type_ = (
      <button
        name={props.name}
        id={props.id}
        data-rr-ui-dropdown-item
        className={classes}
        onClick={props.onClick ? props.onClick : null}
      >
        <Link
          href={props.href}
          text={props.text}
          onClick={props.onClick}
          name={props.name}
          id={props.id}
        />
      </button>
    );
  } else if (props.type === "action") {
    classes = `${props.className} button`;
    type_ = (
      <button
        onClick={props.onClick}
        className={classes}
        name={props.name}
        id={props.id}
      >
        {props.text}
      </button>
    );
  }

  return type_;
};

export default Button;
