import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

import { SubmissionError } from 'redux-form'

import { validateForm } from './validator'

import { isEmpty } from '../../utils'
import { parseSigninErrors } from '../../utils/firebase'

export const signin = values => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(signinLoading())

    // Validate form locally
    const errors = validateForm(values)
    if (!isEmpty(errors)) {
      const submissionError = new SubmissionError(errors)
      reject(submissionError)
      dispatch(signinError(submissionError))
    } else {
      firebaseService.auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(user => {
          resolve(user)
          dispatch(signinSuccess(user))
        })
        .catch(error => {
          const parsedError = parseSigninErrors(error)
          const submissionError = new SubmissionError(parsedError)
          reject(submissionError)
          dispatch(signinError(submissionError))
        })
    }
  })
}

const signinLoading = () => ({
  type: types.SIGNIN_LOADING
})

const signinSuccess = user => ({
  type: types.SIGNIN_SUCCESS,
  user: user
})

const signinError = error => ({
  type: types.SIGNIN_ERROR,
  error: error
})
