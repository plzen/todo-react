import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import signup from './signup'
import signin from './signin'
import signout from './signout'
import user from './user'
import projectsCreate from './projects/create'
import projectsList from './projects/list'

export default combineReducers({
  signup,
  signin,
  signout,
  user,
  projectsCreate,
  projectsList,
  form
})
