import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import signup from './signup'
import signin from './signin'

export default combineReducers({
  signup,
  signin,
  form
})
