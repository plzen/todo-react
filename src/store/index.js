import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducer from './reducer'

const configureStore = () => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger)
  }
  return createStore(reducer, applyMiddleware(...middlewares))
}

export { configureStore }
