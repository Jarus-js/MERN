import React, { useReducer } from "react";
//action creator
import { loginUser } from "../actions/authAction";

import { connect } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const loginReducer = (state, action) => {
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

const LoginModal = ({ loginUser, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    loginUser(newUser);
  };
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password } = state;
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
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

        <button type="submit">Login</button>
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

export default connect(mapStateToProps, { loginUser })(LoginModal);
