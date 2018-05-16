import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";

import { InputField } from "../../Form/InputField";

const NewTaskFormComponent = ({
  handleSubmit,
  createTask,
  loading,
  reset,
  pristine,
}) => (
  <Form onSubmit={handleSubmit(createTask)}>
    <Field
      name="taskName"
      component={InputField}
      placeholder="Enter Task Name ..."
      disabled={loading}
    />

    {!pristine && (
      <Form.Group>
        <Form.Button color="blue" disabled={pristine || loading} loading={loading}>
          Add Task
        </Form.Button>

        <Form.Button disabled={pristine || loading} onClick={reset}>
          Cancel
        </Form.Button>
      </Form.Group>
    )}
  </Form>
);

NewTaskFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
};

export default NewTaskFormComponent;
