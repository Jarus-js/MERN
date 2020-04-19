import React, { useReducer } from "react";
//action creator
import { registerUser } from "../actions/authAction";
import { clearError } from "../actions/errorAction";

import { connect } from "react-redux";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const signUpReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const Register = ({ registerUser, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    registerUser(newUser);
  };
  const [state, dispatch] = useReducer(signUpReducer, initialState);
  const { name, email, password } = state;
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Name:</label>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                dispatch({
                  type: "INPUT_CHANGE",
                  field: "name",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                dispatch({
                  type: "INPUT_CHANGE",
                  field: "email",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password"> Password:</label>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                dispatch({
                  type: "INPUT_CHANGE",
                  field: "password",
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuthenticated: state.auth.userAuthenticated,
    error: state.error.errorMsg,
  };
};

export default connect(mapStateToProps, { registerUser, clearError })(Register);
