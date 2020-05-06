const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  userAuthenticated: false,
  userLoading: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        userLoading: true,
      };
    case "USER_LOADED": //req.user
      return {
        ...state,
        userAuthenticated: true,
        user: action.payload, //currently login user
        userLoading: false,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload.data,
        userAuthenticated: true,
        userLoading: false,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        userAuthenticated: false,
        userLoading: false,
      };
    default:
      return state;
  }
};
