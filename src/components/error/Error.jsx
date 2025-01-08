import React from "react";
import "./error.scss";
import { BiErrorCircle } from "react-icons/bi";

const Error = ({ message = "Something went wrong!" }) => {
  return (
    <div className="error-container">
      <BiErrorCircle className="error-icon" />
      <p>{message}</p>
    </div>
  );
};

export default Error;