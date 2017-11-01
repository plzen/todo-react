import React from 'react'
import { Container, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './style.css'

const AppHeaderComponent = props =>
  <div className="header-wrapper">
    <Container>
      <div className="header-container">
        <span/>
        <span className="header-title">ToDo List</span>
        {props.loggedIn ? <Icon link name="sign out" size="big" loading={props.loading} onClick={props.signout}/> : <span/>}
      </div>
    </Container>
  </div>

AppHeaderComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired
}

export default AppHeaderComponent
