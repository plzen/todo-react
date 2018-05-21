import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import SignInForm from "./component";

import { userActions, userSelectors } from "../../../store/user";

const SignInFormContainer = props => <SignInForm {...props} />;

const mapStateToProps = state => ({
  loading: userSelectors.isSigningIn(state),
});

const mapDispatchToProps = {
  signinUser: userActions.signinUser,
};

const signinForm = reduxForm({
  form: "signinForm",
})(SignInFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(signinForm);
