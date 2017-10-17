import React from 'react';
import Header from '../Header'
import SignUp from '../SignUp'
import Dashboard from '../Dashboard'

import './style.css'

const TodoAppComponent = props =>
  <div className="app-container">
    <Header />
    {props.loggedIn ? <Dashboard /> : <SignUp />}
  </div>

export default TodoAppComponent
