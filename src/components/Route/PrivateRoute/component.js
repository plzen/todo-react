import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRouteComponent = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    rest.loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signup',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

PrivateRouteComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

export default PrivateRouteComponent
