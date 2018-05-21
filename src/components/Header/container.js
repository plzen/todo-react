import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppHeaderComponent from "./component";

import { userActions, userSelectors } from "../../store/user";

const AppHeaderContainer = ({ loading, loggedIn, signoutUser }) => (
  <AppHeaderComponent loading={loading} loggedIn={loggedIn} signout={signoutUser} />
);

const mapStateToProps = state => ({
  loading: userSelectors.isSigningOut(state),
  loggedIn: userSelectors.isLoggedIn(state),
});

const mapDispatchToProps = {
  signoutUser: userActions.signoutUser,
};

AppHeaderContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  signoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
