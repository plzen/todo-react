import * as types from './actionTypes'
import firebaseService from '../../services/firebase'

export const monitorSession = () => {
  return (dispatch) => {
    firebaseService.auth()
      .onAuthStateChanged(user => {
        if (user) {
          dispatch(userSignedIn(user))
        } else {
          dispatch(userSignedOut())
        }
      })
  }
}

export const userSignedIn = user => ({
  type: types.USER_SIGNED_IN,
  user: user
})

export const userSignedOut = user => ({
  type: types.USER_SIGNED_OUT,
})
