import React from "react";
import PropTypes from "prop-types";

import TaskCommentsButton from "./component";

const TaskCommentsButtonContainer = ({ task }) => <TaskCommentsButton task={task} />;

TaskCommentsButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
};

export default TaskCommentsButtonContainer;
