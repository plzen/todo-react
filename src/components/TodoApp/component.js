import React from 'react'
import { Container, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import Header from '../Header'
import SignUp from '../SignUp'
import Dashboard from '../Dashboard'

import './style.css'

const TodoAppComponent = props =>
  <div>
    {props.restoring ?
      <Container className='app-loader-container'>
        <Loader active />
      </Container>
      :
      <div className="app-container">
        <Header />
        {props.loggedIn ? <Dashboard /> : <SignUp />}
      </div>
    }
  </div>

TodoAppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default TodoAppComponent
