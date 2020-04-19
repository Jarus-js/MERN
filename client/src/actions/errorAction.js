export const returnError = (msg, status) => {
  //yoh function le msg,status expect garxa so jaha call garxam teha yoh params pass garxam
  return {
    type: "GET_ERROR",
    payload: {
      //payload .sth
      msg: msg,
      status: status,
    },
  };
};
export const clearError = () => {
  return {
    type: "CLEAR_ERROR",
  };
};
