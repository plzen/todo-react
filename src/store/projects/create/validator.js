import * as validator from '../../../validators'

export const validateForm = fields => {
  let errors = {}

  let { projectName } = fields

  if (!validator.required(projectName)) {
    errors.projectName = 'The field is required'
  }

  return errors
}
