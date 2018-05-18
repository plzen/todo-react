import React from "react";
import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";

import ProjectItem from "./ProjectItem";
import EditItem from "./EditItem";
import { Loading } from "../../common";

const ProjectListComponent = ({ projects, loading, editProject }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      {[...projects].map((project) => {
        if (project.key === editProject) {
          return <EditItem key={project.key} project={project} />;
        }
        return <ProjectItem key={project.key} project={project} />;
      })}
    </Container>
  );
};

ProjectListComponent.propTypes = {
  editProject: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
};

export default ProjectListComponent;
