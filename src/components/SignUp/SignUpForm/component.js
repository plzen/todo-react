import React from "react";
import PropTypes from "prop-types";
import { Container, Form, Message } from "semantic-ui-react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";

import { InputField } from "../../Form/InputField";

const SignUpFormComponent = ({
  error, handleSubmit, signup, loading,
}) => (
  <Form onSubmit={handleSubmit(signup)}>
    {error && <Message negative>{error}</Message>}

    <Field name="email" component={InputField} placeholder="Email" disabled={loading} />

    <Field
      name="password"
      component={InputField}
      placeholder="Password"
      type="password"
      disabled={loading}
    />

    <Field
      name="confirm_password"
      component={InputField}
      placeholder="Confirm Password"
      type="password"
      disabled={loading}
    />

    <Form.Button color="blue" disabled={loading} loading={loading}>
        Sign Up
    </Form.Button>

    <Container>
        Already a member? <Link to="/signin">Sign In</Link>
    </Container>
  </Form>
);

SignUpFormComponent.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignUpFormComponent;
