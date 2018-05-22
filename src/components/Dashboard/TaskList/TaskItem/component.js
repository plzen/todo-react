import React from "react";
import { Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

import TaskEditButton from "./TaskEditButton";
import TaskRemoveButton from "./TaskRemoveButton";
import TaskUpButton from "./TaskUpButton";
import TaskDownButton from "./TaskDownButton";

import "./style.css";

const TaskItemComponent = ({
  task, loading, enabledUp, enabledDown, toggleCompletedTask,
}) => (
  <div className="dashboard-task-item">
    <div className="dashboard-task-priority-controls">
      <TaskUpButton task={task} disabled={!enabledUp} />
      <TaskDownButton task={task} disabled={!enabledDown} />
    </div>
    <Checkbox
      label={task.name}
      className="checkbox"
      checked={task.completed}
      onChange={toggleCompletedTask}
      readOnly={loading}
    />
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
