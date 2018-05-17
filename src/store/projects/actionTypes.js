import { createEntityActionConstants } from "../shared/entity";

const ProjectsConstants = {
  ...createEntityActionConstants("PROJECTS"),
  PROJECTS_LIST_LOADING: "PROJECTS_LIST_LOADING",
  PROJECTS_LIST_SUCCESS: "PROJECTS_LIST_SUCCESS",
  PROJECTS_LIST_FAILURE: "PROJECTS_LIST_FAILURE",
  PROJECTS_LIST_TOGGLE: "PROJECTS_LIST_TOGGLE",
};

export default ProjectsConstants;
