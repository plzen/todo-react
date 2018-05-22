import React from "react";
import { Container, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

import TaskItem from "./TaskItem";
import EditItem from "./EditItem";
import { Loading } from "../../common";

const TaskListComponent = ({
  tasks, loading, error, editTask, isAllCompleted,
}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Container>
      {isAllCompleted && (
        <Message positive>
          <p>Well Done! You’re successfully completed all the task.</p>
        </Message>
      )}
      {[...tasks].map((task, index) => {
        if (task.key === editTask) {
          return <EditItem key={task.key} task={task} />;
        }

        const first = index === 0;
        const last = index === tasks.length - 1;
        return <TaskItem key={task.key} task={task} first={first} last={last} />;
      })}
    </Container>
  );
};

TaskListComponent.propTypes = {
  editTask: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  isAllCompleted: PropTypes.bool.isRequired,
};

export default TaskListComponent;
