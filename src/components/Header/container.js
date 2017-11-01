import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AppHeaderComponent from './component'

import * as signout from '../../store/signout'
import * as user from '../../store/user'

const AppHeaderContainer = props =>
  <AppHeaderComponent
    loading={props.loading}
    loggedIn={props.loggedIn}
    signout={props.signout}/>

const mapStateToProps = state => ({
  loading: signout.isLoading(state),
  loggedIn: user.isLoggedIn(state)
})

const mapDispatchToProps = {
  signout: signout.signout
}

AppHeaderContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer)
