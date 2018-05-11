import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppHeaderComponent from "./component";

import * as signout from "../../store/signout";
import * as user from "../../store/user";

const AppHeaderContainer = ({ loading, loggedIn, signoutUser }) => (
  <AppHeaderComponent loading={loading} loggedIn={loggedIn} signout={signoutUser} />
);

const mapStateToProps = state => ({
  loading: signout.isLoading(state),
  loggedIn: user.isLoggedIn(state),
});

const mapDispatchToProps = {
  signoutUser: signout.signoutUser,
};

AppHeaderContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
