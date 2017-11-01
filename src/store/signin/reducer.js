import * as types from './actionTypes'

const initialState = {
  loading: false
}

const signin = (state = initialState, action) => {
  switch(action.type) {
    case types.SIGNIN_LOADING:
      return { loading: true }
    case types.SIGNIN_SUCCESS:
      return { loading: false }
    case types.SIGNIN_ERROR:
      return { loading: false }
    default:
      return state
  }
}

export default signin
