import React from "react";
import css from "./LoadingScreen.module.css";


const LoadingScreen = () => {
  return (
    <div className={css.container}>
      <div className={css.loadingSpinner}></div>
    </div>
  );
};

export default LoadingScreen;
