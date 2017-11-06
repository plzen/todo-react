import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectList from './component'

import * as projectList from '../../../store/projects/list'

class ProjectListContainer extends Component {

  componentDidMount() {
    this.props.loadProjects()
  }

  render() {
    return (
      <ProjectList
       projects={this.props.projects}/>
    )
  }
}

const mapStateToProps = state => ({
  loading: projectList.isLoading(state),
  projects: projectList.getProjects(state)
})

const mapDispatchToProps = {
  loadProjects: projectList.loadProjects,
}

ProjectListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)
