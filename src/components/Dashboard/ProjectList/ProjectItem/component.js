import React from "react";
import { Accordion, Grid, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import ProjectEditButton from "./ProjectEditButton";
import ProjectRemoveButton from "./ProjectRemoveButton";

import "./style.css";

const ProjectItemComponent = ({
  active, project, toggle,
}) => (
  <Accordion styled fluid className="dashboard-project-item">
    <Accordion.Title active={active} index={project.id} onClick={toggle}>
      <Grid columns={4}>
        <Grid.Column>
          <Icon name="dropdown" />
          {project.name}
        </Grid.Column>
        {!active && (
          <Grid.Column floated="right" textAlign="right">
            <ProjectEditButton project={project} />
            <ProjectRemoveButton project={project} />
          </Grid.Column>
        )}
      </Grid>
    </Accordion.Title>
    <Accordion.Content active={active}>Content</Accordion.Content>
  </Accordion>
);

ProjectItemComponent.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ProjectItemComponent;
