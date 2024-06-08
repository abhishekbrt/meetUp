// import "../styles/button.css";
import React from "react";
import { Link } from "react-router-dom";

function Button({ button_name, pageroute }) {
  return (
    <Link to={pageroute}>
      <button
        className=" bg-red-400 rounded-full px-5 mx-4 hover:bg-red-600 hover:text-white"
        type="button"
      >
        {button_name}
      </button>
    </Link>
  );
}

export default Button;
