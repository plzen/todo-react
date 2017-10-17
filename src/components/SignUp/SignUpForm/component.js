import React from 'react'
import { Form, Message } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { InputField } from '../../Form/InputField'

import './style.css'

const SignUpFormComponent = props => {

  const { error, handleSubmit, signup, loading } = props

  return (
    <Form onSubmit={handleSubmit(signup)}>

      {error && <Message negative>{error}</Message>}

      <Field
        name='email'
        component={InputField}
        placeholder='Email'
        disabled={loading} />

      <Field
        name='password'
        component={InputField}
        placeholder='Password'
        type='password'
        disabled={loading} />

      <Field
        name='confirm_password'
        component={InputField}
        placeholder='Confirm Password'
        type='password'
        disabled={loading} />

      <Form.Button
        color='blue'
        disabled={loading}
        loading={loading}>
        Sign Up
      </Form.Button>

    </Form>
  )
}

export default SignUpFormComponent
