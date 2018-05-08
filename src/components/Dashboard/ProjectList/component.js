import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import ProjectItem from "./ProjectItem";

const ProjectListComponent = ({ projects }) => (
  <Container>
    {[...projects].map(project => (
      <ProjectItem key={project.key} project={project} />
    ))}
  </Container>
);

ProjectListComponent.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectListComponent;
