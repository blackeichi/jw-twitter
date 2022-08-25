import React from "react";
import { Link } from "react-router-dom";

const Navigations = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName ? userObj.displayName : "Profile"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigations;
