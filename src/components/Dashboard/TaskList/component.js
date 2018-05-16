import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

// import ProjectItem from "./ProjectItem";
// import EditItem from "./EditItem";
import { Loading } from "../../common";

const TaskListComponent = ({ tasks, loading, error }) => {
  console.log(tasks);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <Container>{[...tasks].map(task => <p key={task.key}>{task.name}</p>)}</Container>;
};

TaskListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default TaskListComponent;
