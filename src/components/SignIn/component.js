import React from 'react'
import { Header } from 'semantic-ui-react'

import SignInForm from './SignInForm'

import './style.css'

const SignIn = () =>
  <div className="signin-container">
    <Header as="h3">Sign In</Header>
    <SignInForm />
  </div>

export default SignIn
