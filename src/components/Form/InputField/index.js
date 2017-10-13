import React from 'react';
import { Form, Input, Message, Label } from 'semantic-ui-react';

export const InputField = ({input, required, meta: { touched, error }, ...rest}) => ( //eslint-disable-line
  <Form.Field error={touched && error ? true : false} required={required}>
    {touched && error && <Label basic color='red' pointing='below'>{error}</Label>}
    <Input required={required} {...input} {...rest} />
  </Form.Field>
)
