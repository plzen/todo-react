import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

const initialState = {
  loading: false,
  user: firebaseService.auth().currentUser
}

const session = (state = initialState, action) => {
  switch(action.type) {
    case types.SIGNIN_LOADING:
      return { ...state, loading: true }
    case types.SIGNIN_SUCCESS:
      return { loading: false, user: action.user }
    case types.SIGNIN_ERROR:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default session
