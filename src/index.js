import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { configureStore } from './store'
import { BrowserRouter, Route } from 'react-router-dom'

import TodoApp from './components/TodoApp'

import 'semantic-ui-css/semantic.min.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={TodoApp} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker()
