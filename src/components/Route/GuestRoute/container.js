import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GuestRoute from "./component";

import * as user from "../../../store/user";

const GuestRouteContainer = props => <GuestRoute {...props} loggedIn={props.loggedIn} />;

const mapStateToProps = state => ({
  loggedIn: user.isLoggedIn(state),
});

GuestRouteContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(GuestRouteContainer);
