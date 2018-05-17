import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectList from "./component";

import { projectsActions, projectsSelectors } from "../../../store/projects";
import * as projectEdit from "../../../store/projects/edit";

class ProjectListContainer extends Component {
  componentDidMount() {
    this.props.loadProjects();
  }

  render() {
    const { projects, loading, activeProject } = this.props;
    return <ProjectList projects={projects} loading={loading} activeProject={activeProject} />;
  }
}

const mapStateToProps = state => ({
  loading: projectsSelectors.isListLoading(state),
  projects: projectsSelectors.getEntities(state),
  activeProject: projectEdit.getActiveProject(state),
});

const mapDispatchToProps = {
  loadProjects: projectsActions.loadProjects,
};

ProjectListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  activeProject: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
