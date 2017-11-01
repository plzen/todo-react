import React from 'react'
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import { InputField } from '../../Form/InputField'

const NewProjectFormComponent = ({ error, handleSubmit, createProject, loading, reset, pristine }) =>

  <Form onSubmit={handleSubmit(createProject)}>

    <Field
      name='projectName'
      component={InputField}
      placeholder='Enter Project Name ...'
      disabled={loading} />

    {!pristine &&
      <Form.Group>
        <Form.Button
          color='blue'
          disabled={pristine || loading}
          loading={loading}>
          Create Project
        </Form.Button>

        <Form.Button
          disabled={pristine || loading}
          onClick={reset}>
          Cancel
        </Form.Button>

      </Form.Group>
    }

  </Form>

NewProjectFormComponent.propTypes = {
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired
}

export default NewProjectFormComponent
