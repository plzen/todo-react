import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";

import { InputField } from "../../../Form/InputField";

const EditTaskFormComponent = ({
  handleSubmit, editTask, loading, cancel,
}) => (
  <Form onSubmit={handleSubmit(editTask)}>
    <Field
      name="taskName"
      component={InputField}
      placeholder="Enter Task Name ..."
      disabled={loading}
    />
    <Form.Group>
      <Form.Button color="blue" disabled={loading} loading={loading}>
        Save
      </Form.Button>
      <Form.Button disabled={loading} onClick={cancel}>
        Cancel
      </Form.Button>
    </Form.Group>
  </Form>
);

EditTaskFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default EditTaskFormComponent;
