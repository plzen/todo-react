import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";

import { InputField } from "../../../Form/InputField";

const NewCommentFormComponent = ({
  handleSubmit, createComment, loading, reset, pristine,
}) => (
  <Form onSubmit={handleSubmit(createComment)}>
    <Field
      name="message"
      component={InputField}
      placeholder="Enter Your Comment ..."
      disabled={loading}
    />
    <Form.Group>
      <Form.Button color="blue" disabled={pristine || loading} loading={loading}>
        Add Comment
      </Form.Button>

      <Form.Button disabled={pristine || loading} onClick={reset}>
        Cancel
      </Form.Button>
    </Form.Group>
  </Form>
);

NewCommentFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default NewCommentFormComponent;
