import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TodoApp from './component'

import * as user from '../../store/user'

class TodoAppContainer extends Component {

  componentDidMount() {
    this.props.monitorSession()
  }

  render() {
    return (
      <TodoApp
       restoring={this.props.restoring}
       loggedIn={this.props.loggedIn} />
    )
  }
}

const mapStateToProps = state => ({
  restoring: user.isRestoring(state),
  loggedIn: user.isLoggedIn(state)
})

const mapDispatchToProps = {
  monitorSession: user.monitorSession
}

TodoAppContainer.propTypes = {
  restoring: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  monitorSession: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer)
