import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import SignInForm from "./component";

import { signinUser } from "../../../store/signin";

const SignInFormContainer = props => <SignInForm {...props} />;

const mapStateToProps = state => ({
  loading: state.signin.loading,
});

const mapDispatchToProps = {
  signinUser,
};

const signinForm = reduxForm({
  form: "signinForm",
})(SignInFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(signinForm);
