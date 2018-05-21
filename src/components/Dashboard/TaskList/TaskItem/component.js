import React from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

import TaskEditButton from "./TaskEditButton";
import TaskRemoveButton from "./TaskRemoveButton";

import "./style.css";

const TaskItemComponent = ({ task }) => (
  <div className="dashboard-task-item">
    <Checkbox label={task.name} className="checkbox" />
    <TaskEditButton task={task} />
    <TaskRemoveButton task={task} />
  </div>
);

TaskItemComponent.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItemComponent;
