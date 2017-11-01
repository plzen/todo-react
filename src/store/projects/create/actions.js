import * as types from './actionTypes'
import firebaseService from '../../../services/firebase'

import { SubmissionError, reset } from 'redux-form'

import { validateForm } from './validator'

import { isEmpty } from '../../../utils'
import { parseSigninErrors } from '../../../utils/firebase'

export const createProject = values => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(projectCreateLoading())

    // Validate form locally
    const errors = validateForm(values)
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors)
      reject(submissionError)
      dispatch(projectCreateFailure(submissionError))
    } else {
      let project = {
        name: values.projectName,
        createdAt: Date()
      }
      firebaseService.database().ref("projects")
        .push()
        .set(project)
        .then(() => {
          resolve()
          dispatch(projectCreateSuccess())
          dispatch(reset('newProjectForm'))
        })
        .catch(error => {
          const parsedError = parseSigninErrors(error)
          const submissionError = new SubmissionError(parsedError)
          reject(submissionError)
          dispatch(projectCreateFailure(submissionError))
        })
    }
  })
}

export const projectCreateLoading = () => ({
  type: types.PROJECT_CREATE_LOADING
})

export const projectCreateSuccess = () => ({
  type: types.PROJECT_CREATE_SUCCESS
})

export const projectCreateFailure = error => ({
  type: types.PROJECT_CREATE_FAILURE,
  error: error
})
