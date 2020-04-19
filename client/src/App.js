import React, { useEffect } from "react";
//import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
//store
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import AddItem from "./components/AddItem";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
//auth action
import { loadUser } from "./actions/authAction";
import { setToken } from "./components/utils/setAuthToken";
//connect
import { connect } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = ({ auth }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <AppNavbar />
      {auth.userAuthenticated ? (
        <Switch>
          <Route exact path="/add-item" component={AddItem} />
          <Route exact path="/list" component={ShoppingList} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
