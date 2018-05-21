import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskItem from "./component";

import { tasksActions, tasksSelectors } from "../../../../store/tasks";

class TaskItemContainer extends Component {
  constructor(props) {
    super(props);
    this.handleToggleCompleted = this.handleToggleCompleted.bind(this);
  }

  handleToggleCompleted() {
    const { task, completeTask } = this.props;
    completeTask(task.projectKey, task.key, !task.completed);
  }

  render() {
    const { task, loading } = this.props;
    return (
      <TaskItem task={task} loading={loading} toggleCompletedTask={this.handleToggleCompleted} />
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    task: { key },
  } = props;

  return {
    loading: tasksSelectors.isCompleteLoading(state, key),
  };
};

const mapDispatchToProps = {
  completeTask: tasksActions.completeTask,
};

TaskItemContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  completeTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemContainer);
