import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

import SignUpForm from './SignUpForm'

import './style.css'

class SignUp extends Component {
  render() {
    return (
      <div className="signup-container">
        <Header as='h3' className="signup-container-title">Sign Up</Header>
        <SignUpForm />
      </div>
    )
  }
}

export default SignUp
