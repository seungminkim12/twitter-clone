import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{display="flex", justifyContent="center", marginTop: 50}}>
      <li>
        <Link to="/" style={{marginRight: 50}}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link to="/profile" style={{marginLeft:10, display="flex", flexDirection="column", alignItems="center", fontSize: 12}}>
          {userObj.displayName ? userObj.displayName : userObj.email}'s Profile
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
