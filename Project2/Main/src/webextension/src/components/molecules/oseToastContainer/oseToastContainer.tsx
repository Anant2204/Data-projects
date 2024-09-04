import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCustomStyles } from "./oseToastContainer.styles";
import { classNamesFunction } from "@fluentui/react";

export const OseToastContainerComponent = () => {
  const getClassNames = classNamesFunction<any, any>();
  let classes: any;
  classes = getClassNames(getCustomStyles());

  return (
    <ToastContainer
      toastStyle={{ backgroundColor: "blue" }}
      role="alert"
      toastClassName={`default-toast ${classes.defaultToast}`}
      position={toast.POSITION.TOP_RIGHT}
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const OseToastContainer = OseToastContainerComponent;
