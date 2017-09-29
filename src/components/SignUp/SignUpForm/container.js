import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import SignUpForm from './component'

import { signup } from '../../../store/signup'

class SignUpFormContainer extends Component {
  render() {
    return (
      <SignUpForm {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.signup.loading,
})

const mapDispatchToProps = {
  signup: signup,
}

const signupForm = reduxForm({
  form: 'signupForm',
})(SignUpFormContainer)

export default connect(mapStateToProps, mapDispatchToProps)(signupForm)
