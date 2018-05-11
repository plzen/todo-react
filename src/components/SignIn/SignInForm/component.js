import React from "react";
import PropTypes from "prop-types";
import { Container, Form, Message } from "semantic-ui-react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";

import { InputField } from "../../Form/InputField";

const SignInFormComponent = ({
  error, handleSubmit, signinUser, loading,
}) => (
  <Form onSubmit={handleSubmit(signinUser)}>
    {error && <Message negative>{error}</Message>}

    <Field name="email" component={InputField} placeholder="Email" disabled={loading} />

    <Field
      name="password"
      component={InputField}
      placeholder="Password"
      type="password"
      disabled={loading}
    />

    <Form.Button color="blue" disabled={loading} loading={loading}>
        Sign In
    </Form.Button>

    <Container>
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
    </Container>
  </Form>
);

SignInFormComponent.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignInFormComponent;
