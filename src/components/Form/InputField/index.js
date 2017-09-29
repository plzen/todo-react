import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const InputField = ({input, required, meta: { touched, error }, ...rest}) => ( //eslint-disable-line
  <Form.Field error={touched && error ? true : false} required={required}>
    <Input required={required} {...input} {...rest} />
  </Form.Field>
)
