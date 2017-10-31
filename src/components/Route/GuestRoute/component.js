import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const GuestRouteComponent = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !rest.loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

GuestRouteComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

export default GuestRouteComponent
