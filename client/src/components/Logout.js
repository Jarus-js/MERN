import React from "react";
import { NavLink } from "reactstrap";
import { logOut } from "../actions/authAction";
import { connect } from "react-redux";
const Logout = ({ logOut }) => {
  return (
    <div>
      <NavLink onClick={logOut}>Logout</NavLink>
    </div>
  );
};

export default connect(null, { logOut })(Logout);
