import React from 'react'
import { Container, Header } from 'semantic-ui-react'

import ProjectList from './ProjectList'
import NewProjectForm from './NewProjectForm'

import './style.css'

const Dashboard = () =>
  <Container>
    <Header as="h2" className="dashboard-title">Projects</Header>
    <ProjectList />
    <NewProjectForm/>
  </Container>

export default Dashboard
