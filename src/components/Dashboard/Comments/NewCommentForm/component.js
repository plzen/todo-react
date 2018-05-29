import React from "react";
import PropTypes from "prop-types";
import { Form, Icon } from "semantic-ui-react";
import { Field } from "redux-form";

import { InputField } from "../../../Form/InputField";

import "./style.css";

const NewCommentFormComponent = ({
  handleSubmit,
  createComment,
  createFileComment,
  loading,
  reset,
  pristine,
}) => (
  <Form onSubmit={handleSubmit(createComment)}>
    <Form.Group className="form-message-group">
      <Field
        name="message"
        component={InputField}
        placeholder="Enter Your Comment ..."
        disabled={loading}
      />
      <label htmlFor="image">
        <Form.Input type="file" onChange={createFileComment} accept="image/*" id="image" />
        <Icon name="attach" size="large" link loading={loading} />
      </label>
    </Form.Group>
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
  createFileComment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default NewCommentFormComponent;
