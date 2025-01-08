import React from "react";
import "./loading.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <AiOutlineLoading3Quarters className="loading-icon" />
      <p>{message}</p>
    </div>
  );
};

export default Loading;