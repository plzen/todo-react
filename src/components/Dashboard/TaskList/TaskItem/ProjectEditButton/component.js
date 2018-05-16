import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const ProjectEditButtonComponent = ({ onClick }) => (
  <Icon name="edit" size="large" onClick={onClick} />
);

ProjectEditButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ProjectEditButtonComponent;
