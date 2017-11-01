import * as types from './actionTypes'

const initialState = {
  loading: false
}

const signout = (state = initialState, action) => {
  switch(action.type) {
    case types.SIGNOUT_LOADING:
      return { loading: true }
    case types.SIGNOUT_SUCCESS:
      return { loading: false }
    case types.SIGNOUT_ERROR:
      return { loading: false }
    default:
      return state
  }
}

export default signout
