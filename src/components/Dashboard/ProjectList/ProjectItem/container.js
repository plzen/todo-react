import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectItem from "./component";

import * as projectList from "../../../../store/projects/list";

class ProjectItemContainer extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { project, toggle } = this.props;
    toggle(project.key);
  }

  render() {
    const { project, activeProject } = this.props;
    const active = project.key === activeProject;
    return (
      <ProjectItem
        project={project}
        active={active}
        toggle={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = state => ({
  activeProject: projectList.getActiveProject(state),
});

const mapDispatchToProps = {
  toggle: projectList.toggleProject,
};

ProjectItemContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  activeProject: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemContainer);
