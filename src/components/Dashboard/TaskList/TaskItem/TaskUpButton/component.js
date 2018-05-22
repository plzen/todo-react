import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const TaskUpButtonComponent = ({ disabled, loading, onClick }) => (
  <Icon name="chevron up" size="small" disabled={disabled || loading} onClick={onClick} link />
);

TaskUpButtonComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TaskUpButtonComponent;
