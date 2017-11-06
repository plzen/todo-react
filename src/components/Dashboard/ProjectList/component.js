import React from 'react'
import { Accordion, Container, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './style.css'

const ProjectListComponent = props =>
  <Container>
    {[...props.projects].map(project =>
      <Accordion key={project.key} styled fluid className="dashboard-project-item">
        <Accordion.Title>
          <Icon name="dropdown" />
          {project.name}
        </Accordion.Title>
      </Accordion>
    )}
  </Container>

ProjectListComponent.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectListComponent
