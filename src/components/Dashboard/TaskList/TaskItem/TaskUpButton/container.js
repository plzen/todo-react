import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskUpButton from "./component";

import { tasksActions, tasksSelectors } from "../../../../../store/tasks";

class TaskUpButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { disabled, task, moveUpTask } = this.props;
    if (!disabled) {
      moveUpTask(task.projectKey, task.key);
    }
  }

  render() {
    const { disabled, loading } = this.props;
    return <TaskUpButton disabled={disabled} loading={loading} onClick={this.onButtonClick} />;
  }
}

const mapStateToProps = (state, props) => {
  const { task } = props;
  return {
    loading: tasksSelectors.isMoveUpLoading(state, task.key),
  };
};

const mapDispatchToProps = {
  moveUpTask: tasksActions.moveUpTask,
};

TaskUpButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  moveUpTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpButtonContainer);
