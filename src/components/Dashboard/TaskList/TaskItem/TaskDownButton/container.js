import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskDownButton from "./component";

import { tasksActions, tasksSelectors } from "../../../../../store/tasks";

class TaskDownButtonContainer extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { disabled, task, moveDownTask } = this.props;
    if (!disabled) {
      moveDownTask(task.projectKey, task.key);
    }
  }

  render() {
    const { disabled, loading } = this.props;
    return <TaskDownButton disabled={disabled} loading={loading} onClick={this.onButtonClick} />;
  }
}

const mapStateToProps = (state, props) => {
  const { task } = props;
  return {
    loading: tasksSelectors.isMoveDownLoading(state, task.key),
  };
};

const mapDispatchToProps = {
  moveDownTask: tasksActions.moveDownTask,
};

TaskDownButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  moveDownTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDownButtonContainer);
