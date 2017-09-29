import * as types from './actionTypes'

export const signup = () => {
  return dispatch => {
    dispatch(signupLoading())

    setTimeout(() => {
      dispatch(signupSuccess())
    }, 1000)
  }
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
