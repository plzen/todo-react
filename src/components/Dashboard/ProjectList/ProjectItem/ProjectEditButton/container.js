import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectEditButton from "./component";

import { projectsActions } from "../../../../../store/projects";

class ProjectEditButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const {
      project: { key },
      toggleEditProject,
    } = this.props;
    toggleEditProject(key);
  }

  render() {
    return <ProjectEditButton onClick={this.onButtonClick} />;
  }
}

const mapDispatchToProps = {
  toggleEditProject: projectsActions.toggleEditProject,
};

ProjectEditButtonContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  toggleEditProject: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ProjectEditButtonContainer);
