import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PrivateRoute from "./component";

import { userSelectors } from "../../../store/user";

const PrivateRouteContainer = props => <PrivateRoute {...props} loggedIn={props.loggedIn} />;

const mapStateToProps = state => ({
  loggedIn: userSelectors.isLoggedIn(state),
});

PrivateRouteContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PrivateRouteContainer);
