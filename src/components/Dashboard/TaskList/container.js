import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskList from "./component";

import { tasksSelectors } from "../../../store/tasks";

const TaskListContainer = ({
  loading, tasks, error, editTask, isAllCompleted,
}) => (
  <TaskList
    tasks={tasks}
    loading={loading}
    error={error}
    editTask={editTask}
    isAllCompleted={isAllCompleted}
  />
);

const mapStateToProps = (state, props) => {
  const {
    project: { key },
  } = props;

  return {
    loading: tasksSelectors.isListLoading(state, key),
    tasks: tasksSelectors.getTasks(state, key),
    error: tasksSelectors.getListError(state, key),
    editTask: tasksSelectors.getEditTask(state),
    isAllCompleted: tasksSelectors.isAllCompleted(state, key),
  };
};

TaskListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  editTask: PropTypes.string.isRequired,
  isAllCompleted: PropTypes.bool.isRequired,
};

TaskListContainer.defaultProps = {
  tasks: [],
};

export default connect(mapStateToProps)(TaskListContainer);
