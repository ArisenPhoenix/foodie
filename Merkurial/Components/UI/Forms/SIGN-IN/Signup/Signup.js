import Button from "../../../Buttons/Button";
import INPUT_LABEL from "../../../Basics/INPUT_LABEL/INPUT_LABEL";

const Signup = (props) => {
  const items = props.items;

  return (
    <>
      <Head>
        <Script
          src="https://kit.fontawesome.com/30d2b0e2da.js"
          crossorigin="anonymous"
        />
        <title>Signup</title>
      </Head>
      <form onSubmit={props.onSubmit}>
        return (
        <>
          <INPUT_LABEL
            label={{}}
            input={{}}
            onChange={props.onChange}
            required={props.required}
          />
        </>
        );
        <Button type="submit" text="Sign Up!" />
      </form>
    </>
  );
};

export default Signup;
