import * as types from './actionTypes'
import { SubmissionError } from 'redux-form'

import { validateForm } from './validator'

import { isEmpty } from '../../utils'

export const signup = values => {

  return dispatch => new Promise((resolve, reject) => {
    dispatch(signupLoading())

    setTimeout(function(){

      const errors = validateForm(values)
      if (!isEmpty(errors)) {
        const submissionError = new SubmissionError(errors)
        reject(submissionError)
        dispatch(signupError())
      } else {
        resolve()
        dispatch(signupSuccess())
      }
    }, 1150);
  })
}

const signupLoading  = () => ({
  type: types.SIGNUP_LOADING
})

const signupSuccess  = () => ({
  type: types.SIGNUP_SUCCESS
})

const signupError  = () => ({
  type: types.SIGNUP_ERROR
})
