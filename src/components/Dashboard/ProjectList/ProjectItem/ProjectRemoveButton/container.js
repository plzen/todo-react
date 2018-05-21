import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectRemoveButton from "./component";

import { projectsActions, projectsSelectors } from "../../../../../store/projects";
import { userSelectors } from "../../../../../store/user";

class ProjectRemoveButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { modalVisible: false };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  handleOpen(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ modalVisible: true });
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e instanceof MouseEvent || e instanceof KeyboardEvent) {
      this.setState({ modalVisible: false });
    }
  }

  handleActions(e, props) {
    switch (props.id) {
      case "delete":
        this.remove();
        break;
      default:
        this.setState({ modalVisible: false });
    }
  }

  remove() {
    const {
      project: { key },
      user: { uid },
      removeProject,
    } = this.props;

    removeProject(uid, key);
  }

  render() {
    const {
      project: { name },
      loading,
      error,
    } = this.props;
    const { modalVisible } = this.state;

    return (
      <ProjectRemoveButton
        open={modalVisible}
        name={name}
        loading={loading}
        error={error}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        handleActions={this.handleActions}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    project: { key },
  } = props;

  return {
    loading: projectsSelectors.isRemoveLoading(state, key),
    error: projectsSelectors.getRemoveError(state, key),
    user: userSelectors.getUser(state),
  };
};

const mapDispatchToProps = {
  removeProject: projectsActions.removeProject,
};

ProjectRemoveButtonContainer.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  removeProject: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRemoveButtonContainer);
