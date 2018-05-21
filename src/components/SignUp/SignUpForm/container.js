import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import SignUpForm from "./component";

import { userActions, userSelectors } from "../../../store/user";

const SignUpFormContainer = props => <SignUpForm {...props} />;

const mapStateToProps = state => ({
  loading: userSelectors.isSigningUp(state),
});

const mapDispatchToProps = {
  signupUser: userActions.signupUser,
};

const signupForm = reduxForm({
  form: "signupForm",
})(SignUpFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(signupForm);
