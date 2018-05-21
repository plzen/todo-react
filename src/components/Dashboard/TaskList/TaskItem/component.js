import React from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

import TaskEditButton from "./TaskEditButton";

import "./style.css";

const TaskItemComponent = ({ task }) => (
  <div className="dashboard-task-item">
    <div>
      <Checkbox label={task.name} />
      <TaskEditButton task={task} />
    </div>
  </div>
);

TaskItemComponent.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItemComponent;
