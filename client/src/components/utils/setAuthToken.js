//Get token if theres token adds to header else delete from header
/*export const tokenConfig = (getState) => {
  //Get toke from localStorage
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: { "Content-type": "application/json" },
  };
  //If token add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};*/

import axios from "axios";
export const setToken = (token) => {
  if (token) {
    console.log("tokenFromSetToken", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    console.log("noTokenFromSetToken");
    delete axios.defaults.headers.common["x-auth-token"];
  }
  /* const config = {
    headers: { "Content-type": "application/json" },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  } else {
    console.log("No token");
  }
  return config;*/
};
