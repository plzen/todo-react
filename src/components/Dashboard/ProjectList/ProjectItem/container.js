import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectItem from "./component";

import * as projectList from "../../../../store/projects/list";

const edit = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const remove = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const ProjectItemContainer = ({ project, activeProject, toggle }) => {
  const active = project.key === activeProject;
  return (
    <ProjectItem project={project} active={active} edit={edit} remove={remove} toggle={toggle} />
  );
};

const mapStateToProps = state => ({
  activeProject: projectList.getActiveProject(state),
});

const mapDispatchToProps = {
  toggle: projectList.toggleProject,
};

ProjectItemContainer.propTypes = {
  project: PropTypes.object.isRequired,
  activeProject: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemContainer);
