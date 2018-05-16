import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskList from "./component";

import * as taskList from "../../../store/tasks/list";

const TaskListContainer = ({ loading, tasks, error }) => (
  <TaskList tasks={tasks} loading={loading} error={error} />
);

const mapStateToProps = (state, props) => ({
  loading: taskList.isLoading(state, props),
  tasks: taskList.getTasks(state, props),
  error: taskList.getError(state, props),
});

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
