import React from "react";
import { Header } from "semantic-ui-react";

import SignUpForm from "./SignUpForm";

import "./style.css";

const SignUp = () => (
  <div className="signup-container">
    <Header as="h3">Sign Up</Header>
    <SignUpForm />
  </div>
);

export default SignUp;
