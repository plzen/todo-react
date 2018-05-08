import React from "react";
import { Accordion, Grid, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./style.css";

const ProjectItemComponent = ({
  active, edit, remove, project, toggle,
}) => (
  <Accordion styled fluid className="dashboard-project-item">
    <Accordion.Title active={active} index={project.id} onClick={() => toggle(project.key)}>
      <Grid columns={4}>
        <Grid.Column>
          <Icon name="dropdown" />
          {project.name}
        </Grid.Column>
        {!active && (
          <Grid.Column floated="right" textAlign="right">
            <Icon name="edit" size="large" onClick={edit} />
            <Icon name="remove" size="large" onClick={remove} />
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
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ProjectItemComponent;
