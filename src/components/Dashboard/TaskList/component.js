import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import TaskItem from "./TaskItem";
// import EditItem from "./EditItem";
import { Loading } from "../../common";

const TaskListComponent = ({ tasks, loading, error }) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <Container>{[...tasks].map(task => <TaskItem key={task.key} task={task} />)}</Container>;
};

TaskListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default TaskListComponent;
