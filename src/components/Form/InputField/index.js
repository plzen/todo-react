import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Label } from "semantic-ui-react";

export const InputField = ({
  input, required, meta: { touched, error }, ...rest
}) => (
  <Form.Field error={!!(touched && error)} required={required}>
    {touched &&
      error && (
        <Label basic color="red" pointing="below">
          {error}
        </Label>
      )}
    <Input required={required} {...input} {...rest} />
  </Form.Field>
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};
