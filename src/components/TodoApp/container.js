import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodoApp from './component'

import * as signin from '../../store/signin'

class TodoAppContainer extends Component {
  render() {
    return (
      <TodoApp {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: signin.isLoggedIn(state)
})

export default connect(mapStateToProps)(TodoAppContainer)
