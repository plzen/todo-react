import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";

import PrivateRoute from "../Route/PrivateRoute";
import GuestRoute from "../Route/GuestRoute";

import Header from "../Header";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Dashboard from "../Dashboard";
import { Loading } from "../common";

import "./style.css";

const TodoAppComponent = ({ restoring }) => (
  <div>
    {restoring ? (
      <Loading inline={false} />
    ) : (
      <div className="app-container">
        <Header />
        <Switch>
          <GuestRoute exact path="/signup" component={SignUp} />
          <GuestRoute exact path="/signin" component={SignIn} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    )}
  </div>
);

TodoAppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
};

export default TodoAppComponent;
