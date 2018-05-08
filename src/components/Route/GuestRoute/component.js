import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const InnerGuestRouteComponent = (props) => {
  const { component: Component, loggedIn, location } = props;
  return !loggedIn ? (
    <Component {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
};

InnerGuestRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const GuestRouteComponent = ({ component, ...rest }) => (
  <Route {...rest} render={() => <InnerGuestRouteComponent component={component} {...rest} />} />
);

GuestRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default GuestRouteComponent;
