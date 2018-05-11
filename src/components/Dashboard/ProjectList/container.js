import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectList from "./component";

import * as projectList from "../../../store/projects/list";
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
  loading: projectList.isLoading(state),
  projects: projectList.getProjects(state),
  activeProject: projectEdit.getActiveProject(state),
});

const mapDispatchToProps = {
  loadProjects: projectList.loadProjects,
};

ProjectListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  activeProject: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
