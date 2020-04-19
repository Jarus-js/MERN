import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";
import { errorReducer } from "./errorReducer";
import { authReducer } from "./authReducer";
export default combineReducers({
  //export default rootReducer i.e where all reducers are combined
  auth: authReducer,
  error: errorReducer,
  item: itemReducer, //state.access this
});
