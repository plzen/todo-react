import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskList from "./component";

import { tasksSelectors } from "../../../store/tasks";

const TaskListContainer = ({ loading, tasks, error }) => (
  <TaskList tasks={tasks} loading={loading} error={error} />
);

const mapStateToProps = (state, props) => {
  const {
    project: { key },
  } = props;

  return {
    loading: tasksSelectors.isListLoading(state, key),
    tasks: tasksSelectors.getTasks(state, key),
    error: tasksSelectors.getListError(state, key),
  };
};

TaskListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

TaskListContainer.defaultProps = {
  tasks: [],
};

export default connect(mapStateToProps)(TaskListContainer);
