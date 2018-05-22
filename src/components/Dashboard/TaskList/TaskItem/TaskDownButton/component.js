import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const TaskDownButtonComponent = ({ disabled, loading, onClick }) => (
  <Icon name="chevron down" size="small" disabled={disabled || loading} onClick={onClick} link />
);

TaskDownButtonComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TaskDownButtonComponent;
