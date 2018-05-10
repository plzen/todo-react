import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import ProjectItem from "./ProjectItem";
import { Loading } from "../../common";

const ProjectListComponent = ({ projects, loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      {[...projects].map(project => <ProjectItem key={project.key} project={project} />)}
    </Container>
  );
};

ProjectListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
};

export default ProjectListComponent;
