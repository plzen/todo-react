import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectEditButton from "./component";

import * as projectEdit from "../../../../../store/projects/edit";

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
      toggleProject,
    } = this.props;
    toggleProject(key);
  }

  render() {
    return <ProjectEditButton onClick={this.onButtonClick} />;
  }
}

const mapStateToProps = (state, props) => ({
  loading: projectEdit.isLoading(state, props),
  error: projectEdit.getError(state, props),
});

const mapDispatchToProps = {
  editProject: projectEdit.editProject,
  toggleProject: projectEdit.toggleProject,
};

ProjectEditButtonContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  toggleProject: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditButtonContainer);
