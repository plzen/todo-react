import * as types from './actionTypes'

const initialState = {
  loading: false,
  error: null
}

const projectCreate = (state = initialState, action) => {
  switch(action.type) {
    case types.PROJECT_CREATE_LOADING:
      return { loading: true, error: null }
    case types.PROJECT_CREATE_SUCCESS:
      return { loading: false, error: null }
    case types.PROJECT_CREATE_FAILURE:
      return { loading: false, error: action.error }
    default:
      return state
  }
}

export default projectCreate
