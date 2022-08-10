import { Fragment } from "react";

const GetWidth = () => {
  useEffect(() => {
    setDimensions(window);
    if (typeof window !== "undefined") {
      width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      height = window.innerHeight;
      setDimensions(width, height);
    }
  }, [height, width]);

  useEffect(() => {
    if (width >= "768") {
      setMoveOut("true");
    }
    if (width < "768") {
      setMoveOut("false");
    }
  }, []);

  return (
    <Fragment>
      <p>Must Copy and Paste the Above | This is In Helpers/GetWidth</p>
      <p>
        The Rule Of React useFunctions Is The Reason for Copying And Pasting
      </p>
    </Fragment>
  );
};
