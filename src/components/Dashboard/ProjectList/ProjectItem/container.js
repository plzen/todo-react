import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectItem from "./component";

import { projectsActions, projectsSelectors } from "../../../../store/projects";
import * as taskList from "../../../../store/tasks/list";

class ProjectItemContainer extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const {
      project, toggle, loadTasks, activeProject,
    } = this.props;
    toggle(project.key);

    if (activeProject === "" || activeProject !== project.key) {
      loadTasks(project.key);
    }
  }

  render() {
    const { project, activeProject } = this.props;
    const active = project.key === activeProject;
    return <ProjectItem project={project} active={active} toggle={this.handleToggle} />;
  }
}

const mapStateToProps = state => ({
  activeProject: projectsSelectors.getActiveProject(state),
});

const mapDispatchToProps = {
  toggle: projectsActions.toggleProject,
  loadTasks: taskList.loadTasks,
};

ProjectItemContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  activeProject: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemContainer);
