import * as types from './actionTypes'

const initialState = {
  loading: false
}

const signup = (state = initialState, action) => {
  switch(action.type) {
    case types.SIGNUP_LOADING:
      return { loading: true }
    case types.SIGNUP_SUCCESS:
      return { loading: false }
    case types.SIGNUP_ERROR:
      return { loading: false }
    default:
      return state
  }
}

export default signup
