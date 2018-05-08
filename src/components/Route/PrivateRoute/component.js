import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const InnerPrivateRouteComponent = (props) => {
  const { component: Component, loggedIn, location } = props;
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/signin",
        state: { from: location },
      }}
    />
  );
};

InnerPrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const PrivateRouteComponent = ({ component, ...rest }) => (
  <Route {...rest} render={() => <InnerPrivateRouteComponent component={component} {...rest} />} />
);

PrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRouteComponent;
