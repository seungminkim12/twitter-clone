import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {userObj.displayName ? userObj.displayName : userObj.email}'s Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
