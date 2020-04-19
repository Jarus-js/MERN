import React from "react";
import { connect } from "react-redux";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

import { Link } from "react-router-dom";
//Component
import Logout from "./Logout";

const AppNavbar = ({ auth }) => {
  const { userAuthenticated, user } = auth;
  return (
    <div>
      <Navbar color="light" light expand="md" className="mb-5">
        <NavbarBrand href="/">MERN</NavbarBrand>

        <Nav className="ml-auto" navbar>
          {!userAuthenticated ? (
            <>
              <Link to="/register" className="mr-5">
                Register
              </Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              {/* <Link>
                <span className="navbar-text">
                  {user ? `Welcome ${user.name}` : "no user"}
                </span>
              </Link>*/}
              <Link to="/add-item" className="m-3">
                Add Item
              </Link>
              <Link to="/logout">
                <Logout />
              </Link>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AppNavbar);
