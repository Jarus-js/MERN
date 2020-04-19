import axios from "axios";
import { setToken } from "../components/utils/setAuthToken"; //expects getState
import { returnError } from "./errorAction";
//history
import { history } from "../history";

export const getItems = () => (dispatch) => {
  dispatch(itemsLoading());
  axios
    .get("/api/items")
    .then(({ data }) => {
      console.log("GETresponse", data);
      dispatch({ type: "GET_ITEM", payload: data });
    })
    .catch((err) => {
      console.log("getItemsError", err);
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const addItems = (newItems) => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  axios
    .post("/api/items/add", newItems, setToken(token))
    .then(({ data }) => {
      dispatch({ type: "ADD_ITEM", payload: data });
      history.push("/list");
    })
    .catch((err) => {
      console.log("addItemsError", err.response);
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const deleteItems = (id) => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  axios
    .delete(`/api/items/remove/${id}`, setToken(token))
    .then(() => {
      dispatch({
        type: "DELETE_ITEM", //action creator lai component bata call garda yesle yoh kura return garxa
        payload: id, //component le action lai vanxa reducer lai gayera yoh id xai dlt garne ho vandeu vanera
      });
    })
    .catch((err) => {
      console.log("deleteItemsError", err);
      dispatch(returnError(err.response.data, err.response.status));
    });
};

export const itemsLoading = () => {
  return {
    type: "ITEMS_LOADING",
  };
};

//React component bata hamile jaile action creator call garxam rather than reducer
//When we call action than action bhitra reducer ko type hunxa jun reducer ma garera tyo type lai call garxa
