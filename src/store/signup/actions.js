import * as types from './actionTypes'

import firebaseService from '../../services/firebase'

import { SubmissionError } from 'redux-form'

import { validateForm } from './validator'

import { isEmpty } from '../../utils'
import { parseSignupErrors } from '../../utils/firebase'

export const signup = values => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(signupLoading())

    // Validate form locally
    const errors = validateForm(values)
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors)
      reject(submissionError)
      dispatch(signupError(submissionError))
    } else {
      firebaseService.auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(user => {
          resolve(user)
          dispatch(signupSuccess())
        })
        .catch(error => {
          const parsedError = parseSignupErrors(error)
          const submissionError = new SubmissionError(parsedError)
          reject(submissionError)
          dispatch(signupError(submissionError))
        })
    }
  })
}

const signupLoading = () => ({
  type: types.SIGNUP_LOADING
})

const signupSuccess = () => ({
  type: types.SIGNUP_SUCCESS
})

const signupError = error => ({
  type: types.SIGNUP_ERROR,
  error: error
})
