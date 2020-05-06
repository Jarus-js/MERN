import axios from "axios";

//error action
import { returnError } from "./errorAction";
//history
import { history } from "../history";
//setAuthToken
import { setToken } from "../components/utils/setAuthToken";

export const loadUser = () => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  dispatch({ type: "USER_LOADING" }); //userLoading to true

  axios
    .get("/api/auth/user", setToken(token)) //yoh protected route ho yeslai access garna token chainxa so setToken which set token to header as 'x-auth-token'
    .then((response) => {
      console.log("currentLoginUserResponse", response);
      dispatch({ type: "USER_LOADED", payload: response.data });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
      console.log(err.response);
      //dispatch({ type: "AUTH_ERROR" });
    });
};

//Register User i.e jaha yoh function call garxam tesma actual user name,emai,pw
export const registerUser = ({ name, email, password }) => (dispatch) => {
  //Since we gonna be sending json to server add headers value of content-type
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  //JSON.strinfigy converts obj to text i.e only text are allowed in LS.
  const body = JSON.stringify({ name, email, password });
  axios
    .post("/api/auth/register", body, config)
    .then((response) => {
      console.log("registerResponse", response);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data.token,
      });
    })
    .catch((err) => {
      console.log("registerError", err.response);
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({ type: "REGISTER_FAIL" });
    });
};
//Login User
export const loginUser = ({ email, password }) => (dispatch) => {
  //Since we gonna be sending json to server add headers value of content-type
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  //JSON.strinfigy converts obj to text i.e only text are allowed in LS.
  const body = JSON.stringify({ email, password });
  axios
    .post("/api/auth/login", body, config)
    .then((response) => {
      console.log("loginResponse", response);
      dispatch({
        type: "LOGIN_SUCCESS",
        //payload: response.data,
        payload: {
          data: response.data,
          token: response.data.token,
        },
      });
      history.push("/add-item");
    })
    .catch((err) => {
      console.log("loginError", err.response);
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({ type: "LOGIN_FAIL" });
    });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
