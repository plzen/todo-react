import React from "react";
import PropTypes from "prop-types";

import TaskCommentsButton from "./component";

const TaskCommentsButtonContainer = ({ task: { key } }) => <TaskCommentsButton taskKey={key} />;

TaskCommentsButtonContainer.propTypes = {
  task: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
};

export default TaskCommentsButtonContainer;
