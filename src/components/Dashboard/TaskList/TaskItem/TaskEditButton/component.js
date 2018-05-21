import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const TaskEditButtonComponent = ({ onClick }) => (
  <Icon name="edit" size="large" onClick={onClick} link />
);

TaskEditButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TaskEditButtonComponent;
