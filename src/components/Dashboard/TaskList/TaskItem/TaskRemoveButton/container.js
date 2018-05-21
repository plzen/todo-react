import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskRemoveButton from "./component";

import { tasksActions, tasksSelectors } from "../../../../../store/tasks";

class TaskRemoveButtonContainer extends Component {
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
      task: { key, projectKey },
      removeTask,
    } = this.props;

    removeTask(projectKey, key);
  }

  render() {
    const {
      task: { name },
      loading,
      error,
    } = this.props;
    const { modalVisible } = this.state;

    return (
      <TaskRemoveButton
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
    task: { key },
  } = props;

  return {
    loading: tasksSelectors.isRemoveLoading(state, key),
    error: tasksSelectors.getRemoveError(state, key),
  };
};

const mapDispatchToProps = {
  removeTask: tasksActions.removeTask,
};

TaskRemoveButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  removeTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskRemoveButtonContainer);
