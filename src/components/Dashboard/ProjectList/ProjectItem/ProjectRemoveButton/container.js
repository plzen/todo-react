import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectRemoveButton from "./component";

import * as projectRemove from "../../../../../store/projects/remove";

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
      removeProject,
    } = this.props;

    removeProject(key);
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

const mapStateToProps = (state, props) => ({
  loading: projectRemove.isLoading(state, props),
  error: projectRemove.getError(state, props),
});

const mapDispatchToProps = {
  removeProject: projectRemove.removeProject,
};

ProjectRemoveButtonContainer.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  removeProject: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRemoveButtonContainer);
