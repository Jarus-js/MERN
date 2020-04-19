const initialState = {
  errorMsg: null,
  errorStatus: null,
};
export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ERROR":
      return {
        errorMsg: action.payload.msg,
        errorStatus: action.payload.status,
      };
    case "CLEAR_ERROR":
      return {
        errorMsg: null,
        errorStatus: null,
      };

    default:
      return state;
  }
};
