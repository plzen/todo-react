import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";

import { InputField } from "../../../Form/InputField";

const EditProjectFormComponent = ({
  handleSubmit, editProject, loading, cancel,
}) => (
  <Form onSubmit={handleSubmit(editProject)}>
    <Field
      name="projectName"
      component={InputField}
      placeholder="Enter Project Name ..."
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

EditProjectFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default EditProjectFormComponent;
