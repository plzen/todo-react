import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './components/TodoApp'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { configureStore } from './store'

import 'semantic-ui-css/semantic.min.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
