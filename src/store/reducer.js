import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import signup from './signup'
import signin from './signin'
import user from './user'

export default combineReducers({
  signup,
  signin,
  user,
  form
})
