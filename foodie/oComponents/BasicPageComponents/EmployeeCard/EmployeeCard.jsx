import css from "./EmployeeCard.module.css";
import Image from "next/image";

const EmployeeCard = (props) => {
  // const classes = `${css.card} ${props.className}`;
  return (
    <div className={`${css.container1}`}>
      <div className={`${css.card}`}>
        <div className={`${css.block}`}>
          <Image
            layout="responsive"
            className={`${css.image}`}
            placeholder="blur"
            src={props.src}
            alt={props.alt}
            height={props.height ? props.height : 100}
            width={props.width ? props.width : 100}
          />
        </div>
        <div className={`${css.container2}`}>
          <div className={`${css.description}`}>
            <p className={`${css.details}`}>{props.details}</p>
            <p className={`${css.card}`}>~{props.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
