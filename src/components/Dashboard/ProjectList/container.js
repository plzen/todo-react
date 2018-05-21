import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectList from "./component";

import { projectsActions, projectsSelectors } from "../../../store/projects";
import { userSelectors } from "../../../store/user";

class ProjectListContainer extends Component {
  componentDidMount() {
    const {
      user: { uid },
    } = this.props;

    this.props.loadProjects(uid);
  }

  render() {
    const { projects, loading, editProject } = this.props;
    return <ProjectList projects={projects} loading={loading} editProject={editProject} />;
  }
}

const mapStateToProps = state => ({
  loading: projectsSelectors.isListLoading(state),
  projects: projectsSelectors.getEntities(state),
  editProject: projectsSelectors.getEditProject(state),
  user: userSelectors.getUser(state),
});

const mapDispatchToProps = {
  loadProjects: projectsActions.loadProjects,
};

ProjectListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  editProject: PropTypes.string.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);
