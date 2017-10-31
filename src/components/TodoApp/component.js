import React from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import PrivateRoute from '../Route/PrivateRoute'
import GuestRoute from '../Route/GuestRoute'

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
        <Switch>
          <GuestRoute exact path="/signup" component={SignUp} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    }
  </div>

TodoAppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default TodoAppComponent
