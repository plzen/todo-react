import React from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";
import moment from "moment";

import TaskEditButton from "./TaskEditButton";
import TaskRemoveButton from "./TaskRemoveButton";
import TaskUpButton from "./TaskUpButton";
import TaskDownButton from "./TaskDownButton";
import TaskDeadlineButton from "./TaskDeadlineButton";
import TaskCommentsButton from "./TaskCommentsButton";

import "./style.css";

const Deadline = ({ task }) => {
  const formatted = moment(task.deadline).format("DD-MM-YYYY HH:mm");
  const overdue = moment(task.deadline).isBefore(moment());
  return <div className={!overdue ? "deadline" : "deadline overdue"}>{formatted}</div>;
};

Deadline.propTypes = {
  task: PropTypes.shape({
    deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  }).isRequired,
};

const TaskItemComponent = ({
  task, loading, enabledUp, enabledDown, toggleCompletedTask,
}) => (
  <div className="dashboard-task-item">
    <div className="dashboard-task-priority-controls">
      <TaskUpButton task={task} disabled={!enabledUp} />
      <TaskDownButton task={task} disabled={!enabledDown} />
    </div>
    <Checkbox checked={task.completed} onChange={toggleCompletedTask} readOnly={loading} />
    <div className="data">
      <div className={task.completed ? "completed" : ""}>{task.name}</div>
      {task.deadline && <Deadline task={task} />}
    </div>
    <TaskCommentsButton task={task} />
    <TaskDeadlineButton task={task} />
    <TaskEditButton task={task} />
    <TaskRemoveButton task={task} />
  </div>
);

TaskItemComponent.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  toggleCompletedTask: PropTypes.func.isRequired,
  enabledUp: PropTypes.bool.isRequired,
  enabledDown: PropTypes.bool.isRequired,
};

export default TaskItemComponent;
